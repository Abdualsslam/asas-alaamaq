import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { imageSize } from "image-size";
import { Model } from "mongoose";
import { extname } from "node:path";
import { randomUUID } from "node:crypto";
import { Post, PostDocument } from "../blog/posts/post.schema";
import { serializeEntity } from "../common/serialize";
import { Project, ProjectDocument } from "../projects/project.schema";
import { Settings, SettingsDocument } from "../settings/settings.schema";
import { MediaQueryDto, UpdateMediaDto } from "./dto/media.dto";
import { Media, MediaDocument } from "./media.schema";
import { validateMediaFile } from "./media-validation";
import { R2Service } from "./r2.service";

const extensionByMime: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "application/pdf": ".pdf",
};

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
    private readonly r2Service: R2Service,
  ) {}

  async list(query: MediaQueryDto) {
    const [data, total] = await Promise.all([
      this.mediaModel
        .find()
        .sort({ createdAt: -1 })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .lean()
        .exec(),
      this.mediaModel.countDocuments().exec(),
    ]);
    return {
      data: serializeEntity(data),
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async upload(file?: Express.Multer.File) {
    const validationError = validateMediaFile(file);
    if (validationError || !file) {
      throw new BadRequestException({
        code: "INVALID_MEDIA",
        message: validationError,
      });
    }

    const now = new Date();
    const extension =
      extensionByMime[file.mimetype] ||
      extname(file.originalname).toLowerCase();
    const storageKey = `media/${now.getUTCFullYear()}/${String(
      now.getUTCMonth() + 1,
    ).padStart(2, "0")}/${randomUUID()}${extension}`;

    await this.r2Service.upload(storageKey, file.buffer, file.mimetype);
    try {
      let dimensions: { width?: number; height?: number } = {};
      if (file.mimetype.startsWith("image/")) {
        try {
          const result = imageSize(file.buffer);
          dimensions = { width: result.width, height: result.height };
        } catch {
          dimensions = {};
        }
      }
      const media = await this.mediaModel.create({
        storageKey,
        publicUrl: this.r2Service.publicUrl(storageKey),
        originalFileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        ...dimensions,
      });
      return serializeEntity(media);
    } catch (error) {
      try {
        await this.r2Service.delete(storageKey);
      } catch (cleanupError) {
        this.logger.error(
          `Failed to clean R2 object after database write failure: ${storageKey}`,
          cleanupError instanceof Error ? cleanupError.stack : undefined,
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateMediaDto) {
    const media = await this.mediaModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!media) throw new NotFoundException("Media not found");
    return serializeEntity(media);
  }

  async remove(id: string) {
    const media = await this.mediaModel.findById(id).exec();
    if (!media) throw new NotFoundException("Media not found");
    const [postReference, projectReference, settingsReference] =
      await Promise.all([
        this.postModel.exists({ coverMediaId: id }),
        this.projectModel.exists({
          $or: [{ coverMediaId: id }, { galleryMediaIds: id }],
        }),
        this.settingsModel.exists({ companyProfileMediaId: id }),
      ]);
    if (postReference || projectReference || settingsReference) {
      throw new ConflictException({
        code: "MEDIA_IN_USE",
        message:
          "This media file is referenced by content and cannot be deleted",
      });
    }
    await this.r2Service.delete(media.storageKey);
    await this.mediaModel.deleteOne({ _id: id }).exec();
    return { deleted: true };
  }
}
