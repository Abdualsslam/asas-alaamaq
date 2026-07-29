import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { PDF_MAX_BYTES } from "../common/constants";
import { MediaQueryDto, UpdateMediaDto } from "./dto/media.dto";
import { MediaService } from "./media.service";

@Controller("admin/media")
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Get()
  list(@Query() query: MediaQueryDto) {
    return this.service.list(query);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: PDF_MAX_BYTES },
    }),
  )
  async upload(@UploadedFile() file?: Express.Multer.File) {
    return { data: await this.service.upload(file) };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateMediaDto) {
    return { data: await this.service.update(id, dto) };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return { data: await this.service.remove(id) };
  }
}
