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
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
} from "./dto/post-category.dto";
import { PostCategoriesService } from "./post-categories.service";

@Controller("admin/post-categories")
@UseGuards(AuthGuard)
export class PostCategoriesController {
  constructor(private readonly service: PostCategoriesService) {}

  @Get()
  async list() {
    return { data: await this.service.list() };
  }
  @Post()
  async create(@Body() dto: CreatePostCategoryDto) {
    return { data: await this.service.create(dto) };
  }
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdatePostCategoryDto) {
    return { data: await this.service.update(id, dto) };
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return { data: await this.service.remove(id) };
  }
}
