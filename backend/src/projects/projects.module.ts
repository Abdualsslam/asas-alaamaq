import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Media, MediaSchema } from "../media/media.schema";
import { ProjectCategoriesController } from "./categories/project-categories.controller";
import { ProjectCategoriesService } from "./categories/project-categories.service";
import {
  ProjectCategory,
  ProjectCategorySchema,
} from "./categories/project-category.schema";
import { Project, ProjectSchema } from "./project.schema";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectCategory.name, schema: ProjectCategorySchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  controllers: [ProjectsController, ProjectCategoriesController],
  providers: [ProjectsService, ProjectCategoriesService],
  exports: [ProjectsService, ProjectCategoriesService, MongooseModule],
})
export class ProjectsModule {}
