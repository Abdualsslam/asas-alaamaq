import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { rethrowMongoConflict } from "../common/mongo-errors";
import { serializeEntity } from "../common/serialize";
import { Media, MediaDocument } from "../media/media.schema";
import {
  ProjectCategory,
  ProjectCategoryDocument,
} from "./categories/project-category.schema";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import {
  AdminProjectQueryDto,
  PublicProjectQueryDto,
} from "./dto/project-query.dto";
import { Project, ProjectDocument } from "./project.schema";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(ProjectCategory.name)
    private readonly categoryModel: Model<ProjectCategoryDocument>,
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
  ) {}

  private async assertReferences(dto: {
    categoryId?: string;
    coverMediaId?: string;
    galleryMediaIds?: string[];
  }) {
    if (
      dto.categoryId &&
      !(await this.categoryModel.exists({ _id: dto.categoryId }))
    ) {
      throw new UnprocessableEntityException({
        code: "INVALID_REFERENCE",
        message: "Selected project category does not exist",
      });
    }
    const mediaIds = [
      ...(dto.coverMediaId ? [dto.coverMediaId] : []),
      ...(dto.galleryMediaIds ?? []),
    ];
    if (mediaIds.length > 0) {
      const count = await this.mediaModel.countDocuments({
        _id: { $in: [...new Set(mediaIds)] },
      });
      if (count !== new Set(mediaIds).size) {
        throw new UnprocessableEntityException({
          code: "INVALID_REFERENCE",
          message: "One or more selected media records do not exist",
        });
      }
    }
  }

  async adminList(query: AdminProjectQueryDto) {
    const filter: FilterQuery<ProjectDocument> = query.status
      ? { status: query.status }
      : {};
    const [data, total] = await Promise.all([
      this.projectModel
        .find(filter)
        .populate("categoryId")
        .populate("coverMediaId")
        .sort({ sortOrder: 1, updatedAt: -1 })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .lean()
        .exec(),
      this.projectModel.countDocuments(filter).exec(),
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
    const project = await this.projectModel
      .findById(id)
      .populate("categoryId")
      .populate("coverMediaId")
      .populate("galleryMediaIds")
      .lean()
      .exec();
    if (!project) throw new NotFoundException("Project not found");
    return serializeEntity(project);
  }

  async create(dto: CreateProjectDto) {
    await this.assertReferences(dto);
    try {
      const project = await this.projectModel.create({
        ...dto,
        galleryMediaIds: dto.galleryMediaIds ?? [],
        status: dto.status ?? "draft",
        detailEnabled: dto.detailEnabled ?? false,
      });
      return serializeEntity(project);
    } catch (error) {
      rethrowMongoConflict(error, "Project slug already exists");
    }
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.assertReferences(dto);
    try {
      const project = await this.projectModel
        .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
        .exec();
      if (!project) throw new NotFoundException("Project not found");
      return serializeEntity(project);
    } catch (error) {
      rethrowMongoConflict(error, "Project slug already exists");
    }
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) throw new NotFoundException("Project not found");
    return { deleted: true };
  }

  async publicList(query: PublicProjectQueryDto) {
    const filter: FilterQuery<ProjectDocument> = { status: "published" };
    if (query.category) {
      const category = await this.categoryModel
        .findOne({ slug: query.category })
        .lean()
        .exec();
      if (!category) return [];
      filter.categoryId = category._id;
    }
    return serializeEntity(
      await this.projectModel
        .find(filter)
        .populate("categoryId")
        .populate("coverMediaId")
        .sort({ sortOrder: 1 })
        .lean()
        .exec(),
    );
  }

  async publicDetail(slug: string) {
    const project = await this.projectModel
      .findOne({
        slug,
        status: "published",
        detailEnabled: true,
      })
      .populate("categoryId")
      .populate("coverMediaId")
      .populate("galleryMediaIds")
      .lean()
      .exec();
    if (!project) throw new NotFoundException("Published project not found");
    return serializeEntity(project);
  }
}
