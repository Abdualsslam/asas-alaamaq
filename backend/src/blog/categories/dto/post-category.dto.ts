import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MinLength } from "class-validator";
import { SLUG_PATTERN } from "../../../common/constants";

export class CreatePostCategoryDto {
  @IsString()
  @MinLength(1, { message: "Arabic category name is required" })
  nameAr!: string;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsString()
  @Matches(SLUG_PATTERN, {
    message: "Slug must be lowercase URL-safe text separated by hyphens",
  })
  slug!: string;
}

export class UpdatePostCategoryDto extends PartialType(CreatePostCategoryDto) {}
