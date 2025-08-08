import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedStringDto {
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
  es: string;
}

class AuthorDto {
  @IsMongoId()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  summary: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  content: LocalizedStringDto;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  @IsOptional()
  views?: number;

  @IsNumber()
  @IsOptional()
  ratingAvg?: number;

  @IsNumber()
  @IsOptional()
  ratingCount?: number;

  @IsDateString()
  @IsOptional()
  publishedAt?: string;

  @IsEnum(['draft', 'published'])
  status: 'draft' | 'published';
}
