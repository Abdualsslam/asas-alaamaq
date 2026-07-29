import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Media, MediaSchema } from "../media/media.schema";
import { SettingsController } from "./settings.controller";
import { Settings, SettingsSchema } from "./settings.schema";
import { SettingsService } from "./settings.service";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService, MongooseModule],
})
export class SettingsModule {}
