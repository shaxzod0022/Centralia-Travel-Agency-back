import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import type { CountriesService } from "./countries.service";
import type { CreateCountryDto } from "./dto/create-country.dto";
import type { UpdateCountryDto } from "./dto/update-country.dto";
import type { QueryCountryDto } from "./dto/query-country.dto";

@Controller("countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll(queryDto: QueryCountryDto) {
    return this.countriesService.findAll(queryDto);
  }

  @Get("continent/:continent")
  getByContinent(
    @Param("continent") continent: string,
    @Query("lang") lang: string = "en"
  ) {
    return this.countriesService.getCountriesByContinent(continent, lang);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string, @Query("lang") lang: string = "en") {
    return this.countriesService.findBySlug(slug, lang);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("lang") lang: string = "en") {
    return this.countriesService.findOne(id, lang);
  }

  @Patch(":id")
  update(@Param("id") id: string, updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.countriesService.remove(id);
  }
}
