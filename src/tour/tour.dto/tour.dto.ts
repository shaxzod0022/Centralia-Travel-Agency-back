import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";

export class TourDto {
  @IsMongoId()
  countryRef: string;

  @IsObject()
  title: { en: string; es: string; zh: string };

  @IsObject()
  description: { en: string; es: string; zh: string };

  @IsObject()
  country: { en: string; es: string; zh: string };

  @IsString()
  startLocation: string;

  @IsString()
  endLocation: string;

  @IsObject()
  season: { en: string; es: string; zh: string };

  @IsNumber()
  price: number;

  @IsNumber()
  tourDays: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsObject()
  includedInPrice: { en: string; es: string; zh: string };

  @IsObject()
  whatToTake: { en: string; es: string; zh: string };

  @IsObject()
  moreInfo: { en: string; es: string; zh: string };

  @IsString()
  slug: string;
}
