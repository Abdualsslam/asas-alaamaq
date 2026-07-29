import { Module } from "@nestjs/common";
import { BlogModule } from "../blog/blog.module";
import { ProjectsModule } from "../projects/projects.module";
import { SettingsModule } from "../settings/settings.module";
import { PublicController } from "./public.controller";

@Module({
  imports: [BlogModule, ProjectsModule, SettingsModule],
  controllers: [PublicController],
})
export class PublicModule {}
