import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TourDocument = Tour & Document;

@Schema({ timestamps: true })
export class Tour {
  @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
  countryRef: Types.ObjectId;

  @Prop({
    type: Object,
    required: true,
    // Strukturani validator yordamida tekshirish tavsiya qilinadi
  })
  title: { en: string; es: string; zh: string };

  @Prop({ type: Object, required: true })
  description: { en: string; es: string; zh: string };

  @Prop({ type: Object, required: true })
  country: { en: string; es: string; zh: string };

  @Prop({ type: String, required: true })
  startLocation: string;

  @Prop({ type: String, required: true })
  endLocation: string;

  @Prop({ type: Object, required: true })
  season: { en: string; es: string; zh: string };

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  tourDays: number;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: Object, required: true })
  includedInPrice: { en: string; es: string; zh: string };

  @Prop({ type: Object, required: true })
  whatToTake: { en: string; es: string; zh: string };

  @Prop({ type: Object, required: true })
  moreInfo: { en: string; es: string; zh: string };

  @Prop({ type: String, required: true, unique: true })
  slug: string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
