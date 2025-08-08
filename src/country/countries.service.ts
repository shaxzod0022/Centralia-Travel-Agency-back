import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import type { Model } from "mongoose";
import type { Country, CountryDocument } from "./schemas/country.schema";
import type { CreateCountryDto } from "./dto/create-country.dto";
import type { UpdateCountryDto } from "./dto/update-country.dto";
import type { QueryCountryDto } from "./dto/query-country.dto";

@Injectable()
export class CountriesService {
  constructor(private countryModel: Model<CountryDocument>) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const existingCountry = await this.countryModel.findOne({
      $or: [{ code: createCountryDto.code }, { slug: createCountryDto.slug }],
    });

    if (existingCountry) {
      throw new ConflictException(
        "Country with this code or slug already exists"
      );
    }

    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async findAll(queryDto: QueryCountryDto) {
    const {
      lang,
      continent,
      isActive,
      page = 1,
      limit = 10,
      search,
    } = queryDto;

    const filter: any = {};

    if (continent) {
      filter.continent = continent;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (search) {
      filter[`translations.${lang}.name`] = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const projection: Record<string, 1 | 0> = {
      code: 1,
      slug: 1,
      continent: 1,
      isActive: 1,
      flagUrl: 1,
      currency: 1,
      timezone: 1,
      [`translations.${lang}`]: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const [countries, total] = await Promise.all([
      this.countryModel
        .find(filter, projection)
        .skip(skip)
        .limit(limit)
        .sort({ [`translations.${lang}.name`]: 1 })
        .exec(),
      this.countryModel.countDocuments(filter),
    ]);

    return {
      data: countries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, lang = "en"): Promise<Country> {
    const projection: Record<string, 1 | 0> = {
      code: 1,
      slug: 1,
      continent: 1,
      isActive: 1,
      flagUrl: 1,
      currency: 1,
      timezone: 1,
      [`translations.${lang}`]: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const country = await this.countryModel.findById(id, projection).exec();

    if (!country) {
      throw new NotFoundException("Country not found");
    }

    return country;
  }

  async findBySlug(slug: string, lang = "en"): Promise<Country> {
    const projection: Record<string, 1 | 0> = {
      code: 1,
      slug: 1,
      continent: 1,
      isActive: 1,
      flagUrl: 1,
      currency: 1,
      timezone: 1,
      [`translations.${lang}`]: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const country = await this.countryModel
      .findOne({ slug }, projection)
      .exec();

    if (!country) {
      throw new NotFoundException("Country not found");
    }

    return country;
  }

  async update(
    id: string,
    updateCountryDto: UpdateCountryDto
  ): Promise<Country> {
    const updatedCountry = await this.countryModel
      .findByIdAndUpdate(
        id,
        { ...updateCountryDto, updatedAt: new Date() },
        { new: true }
      )
      .exec();

    if (!updatedCountry) {
      throw new NotFoundException("Country not found");
    }

    return updatedCountry;
  }

  async remove(id: string): Promise<void> {
    const result = await this.countryModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException("Country not found");
    }
  }

  async getCountriesByContinent(continent: string, lang = "en") {
    const projection: Record<string, 1 | 0> = {
      code: 1,
      slug: 1,
      [`translations.${lang}.name`]: 1,
      flagUrl: 1,
    };

    return this.countryModel
      .find({ continent, isActive: true }, projection)
      .sort({ [`translations.${lang}.name`]: 1 })
      .exec();
  }
}
