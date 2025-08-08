import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tour, TourDocument } from "./tour.schema";
import { TourDto } from "./tour.dto/tour.dto";

@Injectable()
export class TourService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  async getAll() {
    return this.tourModel.find({});
  }

  async create(dto: TourDto) {
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
    return this.tourModel.create({ ...dto, slug: slugify(dto.title.en) });
  }
}
