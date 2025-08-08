import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.schema';
import { CreateCountryDto, UpdateCountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<CountryDocument>,
  ) {}

  async findAll(): Promise<Country[]> {
    const countries = await this.countryModel.find().exec();
    if (!countries || countries.length === 0) {
      throw new NotFoundException('No countries found.');
    }
    return countries;
  }

  async findOne(id: string): Promise<Country> {
    const country = await this.countryModel.findById(id).exec();
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found.`);
    }
    return country;
  }

  async create(dto: CreateCountryDto): Promise<Country> {
    // Check if code already exists
    const existing = await this.countryModel.findOne({ code: dto.code }).exec();
    if (existing) {
      throw new BadRequestException(`Country with code "${dto.code}" already exists.`);
    }

    const newCountry = new this.countryModel(dto);
    return newCountry.save();
  }

  async update(id: string, dto: UpdateCountryDto): Promise<Country> {
    const updated = await this.countryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Country with id ${id} not found.`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.countryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Country with id ${id} not found.`);
    }
  }
}
