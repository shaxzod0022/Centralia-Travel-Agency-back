import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Document } from "mongoose";

export type CountryDocument = Country & Document;

@Schema({
  collection: "countries",
  timestamps: true,
})
export class Country {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  continent: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: Object,
    required: true,
  })
  translations: {
    en: {
      name: string;
      description?: string;
      capital?: string;
    };
    uz: {
      name: string;
      description?: string;
      capital?: string;
    };
    ru: {
      name: string;
      description?: string;
      capital?: string;
    };
    [key: string]: {
      name: string;
      description?: string;
      capital?: string;
    };
  };

  @Prop()
  flagUrl?: string;

  @Prop()
  currency?: string;

  @Prop()
  timezone?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.index({ code: 1 });
CountrySchema.index({ slug: 1 });
CountrySchema.index({ isActive: 1 });
CountrySchema.index({ continent: 1 });
