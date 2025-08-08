import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as crypto from "crypto";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed password

  @Prop({
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  })
  status: "active" | "inactive";
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
