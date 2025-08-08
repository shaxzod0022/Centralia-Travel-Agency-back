import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CountryDocument = HydratedDocument<Country>;

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true, unique: true })
  code: string; // uz, kz, kg, tj

  @Prop({
    type: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      zh: { type: String, required: true },
      es: { type: String, required: true },
    },
    required: true,
  })
  title: {
    en: string;
    ru: string;
    zh: string;
    es: string;
  };

  @Prop({
    type: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      zh: { type: String, required: true },
      es: { type: String, required: true },
    },
    required: true,
  })
  description: {
    en: string;
    ru: string;
    zh: string;
    es: string;
  };

  @Prop({ required: true })
  heroImageUrl: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ enum: ["available", "coming_soon"], default: "coming_soon" })
  status: "available" | "coming_soon";
}

export const CountrySchema = SchemaFactory.createForClass(Country);
