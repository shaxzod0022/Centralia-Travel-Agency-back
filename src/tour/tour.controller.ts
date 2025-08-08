import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Patch,
} from "@nestjs/common";
import { TourService } from "./tour.service";
import { TourDto } from "./dto/tour.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard"; // agar JWT bilan himoyalasangiz

@Controller("tours")
export class TourController {
  constructor(private readonly tourService: TourService) {}

  // Hammani olish
  @Get()
  async getAll() {
    return this.tourService.getAll();
  }

  // Id bo‘yicha olish
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.tourService.getById(id);
  }

  // Mamlakat bo‘yicha olish
  @Get("country/:countryId")
  async getByCountry(@Param("countryId") countryId: string) {
    return this.tourService.getByCountry(countryId);
  }

  // Quyidagilarni faqat admin tokeni bilan himoyalash kerak:

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: TourDto) {
    return this.tourService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: Partial<TourDto>) {
    return this.tourService.update(id, dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    await this.tourService.delete(id);
  }
}
