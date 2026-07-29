import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { rethrowMongoConflict } from "../../common/mongo-errors";
import { serializeEntity } from "../../common/serialize";
import { Post, PostDocument } from "../posts/post.schema";
import {
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
} from "./dto/post-category.dto";
import {
  PostCategory,
  PostCategoryDocument,
} from "./post-category.schema";

@Injectable()
export class PostCategoriesService {
  constructor(
    @InjectModel(PostCategory.name)
    private readonly categoryModel: Model<PostCategoryDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async list() {
    return serializeEntity(
      await this.categoryModel.find().sort({ nameAr: 1 }).lean().exec(),
    );
  }

  async create(dto: CreatePostCategoryDto) {
    try {
      return serializeEntity(await this.categoryModel.create(dto));
    } catch (error) {
      rethrowMongoConflict(error, "Post category slug already exists");
    }
  }

  async update(id: string, dto: UpdatePostCategoryDto) {
    try {
      const category = await this.categoryModel
        .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
        .exec();
      if (!category) throw new NotFoundException("Post category not found");
      return serializeEntity(category);
    } catch (error) {
      rethrowMongoConflict(error, "Post category slug already exists");
    }
  }

  async remove(id: string) {
    if (await this.postModel.exists({ categoryId: id })) {
      throw new ConflictException({
        code: "CATEGORY_IN_USE",
        message: "Cannot delete a category assigned to posts",
      });
    }
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) throw new NotFoundException("Post category not found");
    return { deleted: true };
  }
}
