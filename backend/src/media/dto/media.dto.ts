import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dto/pagination.dto";

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  altAr?: string;
  @IsOptional()
  @IsString()
  altEn?: string;
}

export class MediaQueryDto extends PaginationDto {}
