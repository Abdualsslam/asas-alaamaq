import { PartialType } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { SLUG_PATTERN } from "../../../common/constants";

export class CreateProjectCategoryDto {
  @IsString()
  @MinLength(1)
  nameAr!: string;
  @IsString()
  @MinLength(1)
  nameEn!: string;
  @IsString()
  @Matches(SLUG_PATTERN)
  slug!: string;
  @IsInt()
  sortOrder!: number;
}

export class UpdateProjectCategoryDto extends PartialType(
  CreateProjectCategoryDto,
) {}
