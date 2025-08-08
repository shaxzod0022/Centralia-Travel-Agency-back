import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";

class TranslationProps {
  @IsString()
  en: string;
  @IsString()
  es: string;
  @IsString()
  zh: string;
  @IsString()
  ru: string;
}

export class TourDto {
  @IsMongoId()
  countryRef: string;

  @IsObject()
  title: TranslationProps;

  @IsObject()
  description: TranslationProps;

  @IsObject()
  country: TranslationProps;

  @IsString()
  startLocation: string;

  @IsString()
  endLocation: string;

  @IsObject()
  season: TranslationProps;

  @IsNumber()
  price: number;

  @IsNumber()
  tourDays: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsObject()
  includedInPrice: TranslationProps;

  @IsObject()
  whatToTake: TranslationProps;

  @IsObject()
  moreInfo: TranslationProps;

  @IsString()
  slug: string;
}
