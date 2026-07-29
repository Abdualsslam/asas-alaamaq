import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UpdateSettingsDto } from "./dto/settings.dto";
import { SettingsService } from "./settings.service";

@Controller("admin/settings")
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  async get() {
    return { data: await this.service.get() };
  }
  @Patch()
  async update(@Body() dto: UpdateSettingsDto) {
    return { data: await this.service.update(dto) };
  }
}
