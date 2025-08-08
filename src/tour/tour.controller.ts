import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TourService } from './tour.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  // Hamma uchun ochiq - Tourlarni olish
  @Get()
  async findAll() {
    return this.tourService.findAll();
  }

  // Quyidagi metodlar faqat admin tokeni bilan ishlaydi
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTourDto) {
    return this.tourService.create(createTourDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTourDto) {
    return this.tourService.update(id, updateTourDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tourService.remove(id);
  }
}
