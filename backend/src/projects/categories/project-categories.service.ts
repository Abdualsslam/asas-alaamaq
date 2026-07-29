import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { rethrowMongoConflict } from "../../common/mongo-errors";
import { serializeEntity } from "../../common/serialize";
import { Project, ProjectDocument } from "../project.schema";
import {
  CreateProjectCategoryDto,
  UpdateProjectCategoryDto,
} from "./dto/project-category.dto";
import {
  ProjectCategory,
  ProjectCategoryDocument,
} from "./project-category.schema";

@Injectable()
export class ProjectCategoriesService {
  constructor(
    @InjectModel(ProjectCategory.name)
    private readonly categoryModel: Model<ProjectCategoryDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async list() {
    return serializeEntity(
      await this.categoryModel.find().sort({ sortOrder: 1 }).lean().exec(),
    );
  }

  async create(dto: CreateProjectCategoryDto) {
    try {
      return serializeEntity(await this.categoryModel.create(dto));
    } catch (error) {
      rethrowMongoConflict(error, "Project category slug already exists");
    }
  }

  async update(id: string, dto: UpdateProjectCategoryDto) {
    try {
      const category = await this.categoryModel
        .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
        .exec();
      if (!category) throw new NotFoundException("Project category not found");
      return serializeEntity(category);
    } catch (error) {
      rethrowMongoConflict(error, "Project category slug already exists");
    }
  }

  async remove(id: string) {
    if (await this.projectModel.exists({ categoryId: id })) {
      throw new ConflictException({
        code: "CATEGORY_IN_USE",
        message: "Cannot delete a category assigned to projects",
      });
    }
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) throw new NotFoundException("Project category not found");
    return { deleted: true };
  }
}
