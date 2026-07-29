import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { BlogModule } from "./blog/blog.module";
import { validateAppEnvironment } from "./config/env.validation";
import { MediaModule } from "./media/media.module";
import { ProjectsModule } from "./projects/projects.module";
import { PublicModule } from "./public/public.module";
import { SettingsModule } from "./settings/settings.module";

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
    AuthModule,
    BlogModule,
    ProjectsModule,
    MediaModule,
    SettingsModule,
    PublicModule,
  ],
})
export class AppModule {}
