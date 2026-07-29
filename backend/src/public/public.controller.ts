import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostCategoriesService } from "../blog/categories/post-categories.service";
import { PublicPostQueryDto } from "../blog/posts/dto/post-query.dto";
import { PostsService } from "../blog/posts/posts.service";
import { ProjectCategoriesService } from "../projects/categories/project-categories.service";
import { PublicProjectQueryDto } from "../projects/dto/project-query.dto";
import { ProjectsService } from "../projects/projects.service";
import { SettingsService } from "../settings/settings.service";

@Controller("public")
export class PublicController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postCategoriesService: PostCategoriesService,
    private readonly projectsService: ProjectsService,
    private readonly projectCategoriesService: ProjectCategoriesService,
    private readonly settingsService: SettingsService,
  ) {}

  @Get("posts")
  posts(@Query() query: PublicPostQueryDto) {
    return this.postsService.publicList(query);
  }

  @Get("posts/:slug")
  async post(@Param("slug") slug: string) {
    return { data: await this.postsService.publicDetail(slug) };
  }

  @Get("post-categories")
  async postCategories() {
    return { data: await this.postCategoriesService.list() };
  }

  @Get("projects")
  async projects(@Query() query: PublicProjectQueryDto) {
    return { data: await this.projectsService.publicList(query) };
  }

  @Get("projects/:slug")
  async project(@Param("slug") slug: string) {
    return { data: await this.projectsService.publicDetail(slug) };
  }

  @Get("project-categories")
  async projectCategories() {
    return { data: await this.projectCategoriesService.list() };
  }

  @Get("settings")
  async settings() {
    return { data: await this.settingsService.get() };
  }
}
