import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
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
} from "../../common/constants";

export class ProjectSeoDto {
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

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  titleAr!: string;
  @IsOptional()
  @IsString()
  titleEn?: string;
  @IsString()
  @Matches(SLUG_PATTERN)
  slug!: string;
  @IsOptional()
  @IsString()
  descriptionAr?: string;
  @IsOptional()
  @IsString()
  descriptionEn?: string;
  @IsMongoId()
  coverMediaId!: string;
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  galleryMediaIds?: string[];
  @IsMongoId()
  categoryId!: string;
  @IsOptional()
  @IsString()
  locationAr?: string;
  @IsOptional()
  @IsString()
  locationEn?: string;
  @IsOptional()
  @IsEnum(PUBLISH_STATUSES)
  status?: PublishStatus;
  @IsInt()
  sortOrder!: number;
  @IsOptional()
  @IsBoolean()
  detailEnabled?: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectSeoDto)
  seo?: ProjectSeoDto;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
