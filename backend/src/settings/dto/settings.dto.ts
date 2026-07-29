import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from "class-validator";

export class PhoneSettingDto {
  @IsString()
  @MinLength(1)
  display!: string;
  @IsString()
  @MinLength(1)
  raw!: string;
}

export class LocationValueDto {
  @IsString()
  city!: string;
  @IsString()
  country!: string;
}

export class LocationSettingDto {
  @ValidateNested()
  @Type(() => LocationValueDto)
  ar!: LocationValueDto;
  @ValidateNested()
  @Type(() => LocationValueDto)
  en!: LocationValueDto;
}

export class SocialSettingDto {
  @IsOptional()
  @IsUrl()
  linkedin?: string;
  @IsOptional()
  @IsUrl()
  instagram?: string;
  @IsOptional()
  @IsUrl()
  x?: string;
  @IsOptional()
  @IsUrl()
  youtube?: string;
}

export class StatSettingDto {
  @IsString()
  key!: string;
  @IsNumber()
  value!: number;
  @IsOptional()
  @IsString()
  suffixAr?: string;
  @IsOptional()
  @IsString()
  suffixEn?: string;
  @IsString()
  labelAr!: string;
  @IsString()
  labelEn!: string;
  @IsInt()
  sortOrder!: number;
}

export class UpdateSettingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneSettingDto)
  phones!: PhoneSettingDto[];
  @IsString()
  whatsappNumber!: string;
  @IsEmail()
  email!: string;
  @IsString()
  website!: string;
  @ValidateNested()
  @Type(() => LocationSettingDto)
  location!: LocationSettingDto;
  @ValidateNested()
  @Type(() => SocialSettingDto)
  social!: SocialSettingDto;
  @IsOptional()
  @IsMongoId()
  companyProfileMediaId?: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatSettingDto)
  stats!: StatSettingDto[];
}
