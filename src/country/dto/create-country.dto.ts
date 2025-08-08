import {
  IsString,
  IsBoolean,
  IsOptional,
  IsObject,
  ValidateNested,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";

class CountryTranslationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  capital?: string;
}

class CountryTranslationsDto {
  @ValidateNested()
  @Type(() => CountryTranslationDto)
  en: CountryTranslationDto;

  @ValidateNested()
  @Type(() => CountryTranslationDto)
  uz: CountryTranslationDto;

  @ValidateNested()
  @Type(() => CountryTranslationDto)
  ru: CountryTranslationDto;

  [key: string]: CountryTranslationDto;
}

export class CreateCountryDto {
  @IsString()
  code: string;

  @IsString()
  slug: string;

  @IsString()
  continent: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => CountryTranslationsDto)
  translations: CountryTranslationsDto;

  @IsOptional()
  @IsUrl()
  flagUrl?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
