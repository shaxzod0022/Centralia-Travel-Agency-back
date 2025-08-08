import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Tour, TourDocument } from "./tour.schema"; // Tour schema pathiga qarab o'zgartiring
import { TourDto } from "./dto/tour.dto";

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>
  ) {}

  async create(dto: TourDto): Promise<Tour> {
    // Tekshirish: slug allaqachon bormi?
    const exist = await this.tourModel.findOne({ slug: dto.slug });
    if (exist) {
      throw new BadRequestException("Tour with this slug already exists");
    }

    function slugify(text: string) {
      return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+g/, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }

    const createdTour = new this.tourModel({
      ...dto,
      slug: slugify(dto.title.en),
    });
    return createdTour.save();
  }

  async getAll(): Promise<Tour[]> {
    const tours = await this.tourModel.find().exec();
    if (!tours || tours.length === 0) {
      throw new NotFoundException("No tours found");
    }
    return tours;
  }

  async getById(id: string): Promise<Tour> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid tour ID");
    }

    const tour = await this.tourModel.findById(id).exec();
    if (!tour) {
      throw new NotFoundException("Tour not found");
    }
    return tour;
  }

  async update(id: string, dto: Partial<TourDto>): Promise<Tour> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid tour ID");
    }

    // Agar slug o'zgartirilsa, tekshirish
    if (dto.slug) {
      const exist = await this.tourModel.findOne({
        slug: dto.slug,
        _id: { $ne: id },
      });
      if (exist) {
        throw new BadRequestException("Tour with this slug already exists");
      }
    }

    const updatedTour = await this.tourModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedTour) {
      throw new NotFoundException("Tour not found");
    }
    return updatedTour;
  }

  async delete(id: string): Promise<Tour> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid tour ID");
    }

    const deletedTour = await this.tourModel.findByIdAndDelete(id).exec();
    if (!deletedTour) {
      throw new NotFoundException("Tour not found");
    }
    return deletedTour;
  }

  // Misol uchun: mamlakat bo'yicha tur paketlarini olish
  async getByCountry(countryId: string): Promise<Tour[]> {
    if (!Types.ObjectId.isValid(countryId)) {
      throw new BadRequestException("Invalid country ID");
    }

    const tours = await this.tourModel.find({ countryRef: countryId }).exec();
    if (!tours || tours.length === 0) {
      throw new NotFoundException("No tours found for this country");
    }
    return tours;
  }
}
