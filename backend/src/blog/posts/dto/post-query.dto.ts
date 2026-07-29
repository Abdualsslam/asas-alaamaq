import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { PUBLISH_STATUSES, PublishStatus } from "../../../common/constants";

export class AdminPostQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(PUBLISH_STATUSES)
  status?: PublishStatus;
}

export class PublicPostQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  category?: string;
}
