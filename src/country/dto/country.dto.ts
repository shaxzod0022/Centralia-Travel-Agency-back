import { IsString, IsNotEmpty, IsIn, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class TranslationsDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ru: string;

  @IsString()
  @IsNotEmpty()
  zh: string;

  @IsString()
  @IsNotEmpty()
  it: string;
}

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationsDto)
  title: TranslationsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationsDto)
  description: TranslationsDto;

  @IsString()
  @IsNotEmpty()
  heroImageUrl: string;

  @IsString()
  @IsIn(['available', 'coming_soon'])
  status: 'available' | 'coming_soon';
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
