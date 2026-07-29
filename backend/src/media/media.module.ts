import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Post, PostSchema } from "../blog/posts/post.schema";
import { Project, ProjectSchema } from "../projects/project.schema";
import { Settings, SettingsSchema } from "../settings/settings.schema";
import { MediaController } from "./media.controller";
import { Media, MediaSchema } from "./media.schema";
import { MediaService } from "./media.service";
import { R2Service } from "./r2.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
      { name: Post.name, schema: PostSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService, R2Service],
  exports: [MediaService, R2Service, MongooseModule],
})
export class MediaModule {}
