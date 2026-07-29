import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({
  collection: "admins",
  timestamps: true,
  versionKey: false,
})
export class Admin {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, select: false })
  passwordHash!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop()
  lastLoginAt?: Date;

  createdAt!: Date;
  updatedAt!: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
