import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({ timestamps: true })
export class Tour {
  @Prop({ type: Types.ObjectId, ref: "Country", required: true })
  countryRef: Types.ObjectId; // bog‘lanish uchun

  @Prop({ type: Map, of: String, required: true })
  title: { en: string; es: string; zh: string };

  @Prop({ type: Map, of: String, required: true })
  description: { en: string; es: string; zh: string };

  @Prop({ type: Map, of: String, required: true })
  country: { en: string; es: string; zh: string };

  @Prop({ required: true })
  startLocation: string;

  @Prop({ required: true })
  endLocation: string;

  @Prop({ type: Map, of: String, required: true })
  season: { en: string; es: string; zh: string }; // tour mavsumi

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  tourDays: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  includedInPrice: string[]; // narxga nimalar kiradi

  @Prop({ type: [String], default: [] })
  whatToTake: string[]; // nimalar olib chiqish kerak

  @Prop({ type: Map, of: String })
  moreInfo: { en: string; es: string; zh: string }; // tour haqida ko‘proq ma’lumot (ko‘p tilli)

  @Prop({ required: true })
  slug: string;
}

export type TourDocument = HydratedDocument<Tour>;
export const TourSchema = SchemaFactory.createForClass(Tour);
