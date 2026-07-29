import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { PUBLISH_STATUSES, PublishStatus } from "../../common/constants";

export class AdminProjectQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(PUBLISH_STATUSES)
  status?: PublishStatus;
}

export class PublicProjectQueryDto {
  @IsOptional()
  @IsString()
  category?: string;
}
