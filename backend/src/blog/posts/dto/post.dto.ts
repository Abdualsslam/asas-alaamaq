import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  PUBLISH_STATUSES,
  PublishStatus,
  SLUG_PATTERN,
} from "../../../common/constants";

export class PostSeoDto {
  @IsOptional()
  @IsString()
  metaTitleAr?: string;
  @IsOptional()
  @IsString()
  metaTitleEn?: string;
  @IsOptional()
  @IsString()
  metaDescriptionAr?: string;
  @IsOptional()
  @IsString()
  metaDescriptionEn?: string;
}

export class CreatePostDto {
  @IsString()
  @MinLength(1, { message: "Arabic title is required" })
  titleAr!: string;

  @IsOptional()
  @IsString()
  titleEn?: string;

  @IsString()
  @Matches(SLUG_PATTERN, {
    message: "Slug must be lowercase URL-safe text separated by hyphens",
  })
  slug!: string;

  @IsOptional()
  @IsString()
  excerptAr?: string;
  @IsOptional()
  @IsString()
  excerptEn?: string;
  @IsOptional()
  @IsString()
  contentAr?: string;
  @IsOptional()
  @IsString()
  contentEn?: string;

  @IsOptional()
  @IsMongoId()
  coverMediaId?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsEnum(PUBLISH_STATUSES)
  status?: PublishStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostSeoDto)
  seo?: PostSeoDto;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
