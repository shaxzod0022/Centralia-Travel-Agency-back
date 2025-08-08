import { IsOptional, IsString, IsBoolean, IsIn } from "class-validator";
import { Transform } from "class-transformer";

export class QueryCountryDto {
  @IsOptional()
  @IsString()
  @IsIn([
    "en",
    "uz",
    "ru",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ar",
    "zh",
    "ja",
    "ko",
    "hi",
    "tr",
    "th",
  ])
  lang?: string = "en";

  @IsOptional()
  @IsString()
  continent?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
