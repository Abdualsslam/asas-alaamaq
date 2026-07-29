import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../auth/auth.guard";
import {
  CreateProjectCategoryDto,
  UpdateProjectCategoryDto,
} from "./dto/project-category.dto";
import { ProjectCategoriesService } from "./project-categories.service";

@Controller("admin/project-categories")
@UseGuards(AuthGuard)
export class ProjectCategoriesController {
  constructor(private readonly service: ProjectCategoriesService) {}

  @Get()
  async list() {
    return { data: await this.service.list() };
  }
  @Post()
  async create(@Body() dto: CreateProjectCategoryDto) {
    return { data: await this.service.create(dto) };
  }
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateProjectCategoryDto,
  ) {
    return { data: await this.service.update(id, dto) };
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return { data: await this.service.remove(id) };
  }
}
