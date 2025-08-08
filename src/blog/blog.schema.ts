import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
class LocalizedString {
  @Prop({ required: true }) en: string;
  @Prop({ required: true }) ru: string;
  @Prop({ required: true }) zh: string;
  @Prop({ required: true }) es: string;
}

@Schema()
class Author {
  @Prop({ type: Types.ObjectId, required: true, ref: "Admin" }) // yoki muallif modeli nomi
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: LocalizedString, required: true })
  title: LocalizedString;

  @Prop({ type: LocalizedString, required: true })
  summary: LocalizedString;

  @Prop({ type: LocalizedString, required: true })
  content: LocalizedString;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ type: Author, required: true })
  author: Author;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  ratingAvg: number;

  @Prop({ default: 0 })
  ratingCount: number;

  @Prop()
  publishedAt: Date;

  @Prop({ required: true, enum: ["draft", "published"], default: "draft" })
  status: "draft" | "published";
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
