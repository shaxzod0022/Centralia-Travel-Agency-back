import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { CountryService } from "./country.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard"; // Sizning admin token guardingiz nomi shu bo'lsin
import { CreateCountryDto, UpdateCountryDto } from "./dto/country.dto";
import { ParseMongoIdPipe } from "./dto/pipe";

@Controller("countries")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // Public - hamma ko'ra oladi
  @Get()
  async findAll() {
    return this.countryService.findAll();
  }

  // Public - hamma ko'ra oladi
  @Get(":id")
  async findOne(@Param("id", ParseMongoIdPipe) id: string) {
    return this.countryService.findOne(id);
  }

  // Quyidagi route'lar faqat admin tokeni borlar uchun:

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id", ParseMongoIdPipe) id: string,
    @Body() dto: UpdateCountryDto
  ) {
    return this.countryService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseMongoIdPipe) id: string) {
    await this.countryService.delete(id);
    return { message: "Country deleted successfully" };
  }
}
