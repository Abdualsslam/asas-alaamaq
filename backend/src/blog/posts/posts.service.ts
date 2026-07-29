import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { rethrowMongoConflict } from "../../common/mongo-errors";
import { serializeEntity } from "../../common/serialize";
import { Media, MediaDocument } from "../../media/media.schema";
import {
  PostCategory,
  PostCategoryDocument,
} from "../categories/post-category.schema";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { AdminPostQueryDto, PublicPostQueryDto } from "./dto/post-query.dto";
import { Post, PostDocument } from "./post.schema";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(PostCategory.name)
    private readonly categoryModel: Model<PostCategoryDocument>,
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
  ) {}

  private assertPublishable(data: {
    status?: string;
    excerptAr?: string;
    contentAr?: string;
  }) {
    if (data.status !== "published") return;
    const errors: Array<{ field: string; message: string }> = [];
    if (!data.excerptAr?.trim()) {
      errors.push({
        field: "excerptAr",
        message: "Arabic excerpt is required before publishing",
      });
    }
    if (!data.contentAr?.trim()) {
      errors.push({
        field: "contentAr",
        message: "Arabic content is required before publishing",
      });
    }
    if (errors.length) {
      throw new UnprocessableEntityException({
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        errors,
      });
    }
  }

  private async assertReferences(dto: {
    categoryId?: string;
    coverMediaId?: string;
  }) {
    if (
      dto.categoryId &&
      !(await this.categoryModel.exists({ _id: dto.categoryId }))
    ) {
      throw new UnprocessableEntityException({
        code: "INVALID_REFERENCE",
        message: "Selected post category does not exist",
      });
    }
    if (
      dto.coverMediaId &&
      !(await this.mediaModel.exists({ _id: dto.coverMediaId }))
    ) {
      throw new UnprocessableEntityException({
        code: "INVALID_REFERENCE",
        message: "Selected cover media does not exist",
      });
    }
  }

  async adminList(query: AdminPostQueryDto) {
    const filter: FilterQuery<PostDocument> = query.status
      ? { status: query.status }
      : {};
    const [data, total] = await Promise.all([
      this.postModel
        .find(filter)
        .populate("categoryId")
        .populate("coverMediaId")
        .sort({ updatedAt: -1 })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .lean()
        .exec(),
      this.postModel.countDocuments(filter).exec(),
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

  async getAdmin(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate("categoryId")
      .populate("coverMediaId")
      .lean()
      .exec();
    if (!post) throw new NotFoundException("Post not found");
    return serializeEntity(post);
  }

  async create(dto: CreatePostDto) {
    this.assertPublishable(dto);
    await this.assertReferences(dto);
    try {
      const post = await this.postModel.create({
        ...dto,
        excerptAr: dto.excerptAr ?? "",
        contentAr: dto.contentAr ?? "",
        status: dto.status ?? "draft",
        publishedAt: dto.status === "published" ? new Date() : undefined,
      });
      return serializeEntity(post);
    } catch (error) {
      rethrowMongoConflict(error, "Post slug already exists");
    }
  }

  async update(id: string, dto: UpdatePostDto) {
    const existing = await this.postModel.findById(id).exec();
    if (!existing) throw new NotFoundException("Post not found");
    await this.assertReferences(dto);
    const merged = {
      status: dto.status ?? existing.status,
      excerptAr: dto.excerptAr ?? existing.excerptAr,
      contentAr: dto.contentAr ?? existing.contentAr,
    };
    this.assertPublishable(merged);
    if (
      merged.status === "published" &&
      existing.status !== "published" &&
      !existing.publishedAt
    ) {
      existing.publishedAt = new Date();
    }
    Object.assign(existing, dto);
    try {
      await existing.save();
      return serializeEntity(existing);
    } catch (error) {
      rethrowMongoConflict(error, "Post slug already exists");
    }
  }

  async remove(id: string) {
    const post = await this.postModel.findByIdAndDelete(id).exec();
    if (!post) throw new NotFoundException("Post not found");
    return { deleted: true };
  }

  async publicList(query: PublicPostQueryDto) {
    const filter: FilterQuery<PostDocument> = { status: "published" };
    if (query.category) {
      const category = await this.categoryModel
        .findOne({ slug: query.category })
        .lean()
        .exec();
      if (!category) {
        return {
          data: [],
          meta: {
            page: query.page,
            limit: query.limit,
            total: 0,
            totalPages: 0,
          },
        };
      }
      filter.categoryId = category._id;
    }
    const [data, total] = await Promise.all([
      this.postModel
        .find(filter)
        .populate("categoryId")
        .populate("coverMediaId")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .lean()
        .exec(),
      this.postModel.countDocuments(filter).exec(),
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

  async publicDetail(slug: string) {
    const post = await this.postModel
      .findOne({ slug, status: "published" })
      .populate("categoryId")
      .populate("coverMediaId")
      .lean()
      .exec();
    if (!post) throw new NotFoundException("Published post not found");
    return serializeEntity(post);
  }
}
