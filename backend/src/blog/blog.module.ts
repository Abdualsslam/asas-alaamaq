import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Media, MediaSchema } from "../media/media.schema";
import { PostCategoriesController } from "./categories/post-categories.controller";
import { PostCategoriesService } from "./categories/post-categories.service";
import {
  PostCategory,
  PostCategorySchema,
} from "./categories/post-category.schema";
import { Post, PostSchema } from "./posts/post.schema";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: PostCategory.name, schema: PostCategorySchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  controllers: [PostsController, PostCategoriesController],
  providers: [PostsService, PostCategoriesService],
  exports: [PostsService, PostCategoriesService, MongooseModule],
})
export class BlogModule {}
