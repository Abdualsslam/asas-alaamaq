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
import { AuthGuard } from "../auth/auth.guard";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import { AdminProjectQueryDto } from "./dto/project-query.dto";
import { ProjectsService } from "./projects.service";

@Controller("admin/projects")
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  list(@Query() query: AdminProjectQueryDto) {
    return this.service.adminList(query);
  }
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return { data: await this.service.create(dto) };
  }
  @Get(":id")
  async get(@Param("id") id: string) {
    return { data: await this.service.getAdmin(id) };
  }
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProjectDto) {
    return { data: await this.service.update(id, dto) };
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return { data: await this.service.remove(id) };
  }
}
