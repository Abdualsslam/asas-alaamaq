import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { AppModule } from "./app.module";
import { ApiExceptionFilter } from "./common/filters/api-exception.filter";
import { validationExceptionFactory } from "./common/validation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.useGlobalFilters(new ApiExceptionFilter());

  const origins = config
    .getOrThrow<string>("FRONTEND_URL")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  });

  if (config.get<string>("NODE_ENV") !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("ASAS AL-AAMAQ CMS API")
      .setDescription("Minimal CMS API")
      .setVersion("1.0")
      .addCookieAuth(config.get<string>("COOKIE_NAME") ?? "asas_admin_session")
      .build();
    SwaggerModule.setup(
      "api/docs",
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  }

  await app.listen(config.get<number>("PORT") ?? 4000);
}

void bootstrap();
