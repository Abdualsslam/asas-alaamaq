import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../auth/auth.guard";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { AdminPostQueryDto } from "./dto/post-query.dto";
import { PostsService } from "./posts.service";

@Controller("admin/posts")
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  list(@Query() query: AdminPostQueryDto) {
    return this.service.adminList(query);
  }
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return { data: await this.service.create(dto) };
  }
  @Get(":id")
  async get(@Param("id") id: string) {
    return { data: await this.service.getAdmin(id) };
  }
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdatePostDto) {
    return { data: await this.service.update(id, dto) };
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return { data: await this.service.remove(id) };
  }
}
