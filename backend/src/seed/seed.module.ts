import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "../admins/admin.schema";
import { validateAppEnvironment } from "../config/env.validation";
import { Media, MediaSchema } from "../media/media.schema";
import { R2Service } from "../media/r2.service";
import {
  ProjectCategory,
  ProjectCategorySchema,
} from "../projects/categories/project-category.schema";
import { Project, ProjectSchema } from "../projects/project.schema";
import { Settings, SettingsSchema } from "../settings/settings.schema";
import { SeedService } from "./seed.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateAppEnvironment,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGODB_URI"),
        autoIndex: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: ProjectCategory.name, schema: ProjectCategorySchema },
      { name: Settings.name, schema: SettingsSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [SeedService, R2Service],
})
export class SeedModule {}
