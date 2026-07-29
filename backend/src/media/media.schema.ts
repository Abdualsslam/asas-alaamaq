import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MediaDocument = HydratedDocument<Media>;

@Schema({
  collection: "media",
  timestamps: true,
  versionKey: false,
})
export class Media {
  @Prop({ required: true, unique: true, trim: true })
  storageKey!: string;
  @Prop({ required: true, trim: true })
  publicUrl!: string;
  @Prop({ required: true })
  originalFileName!: string;
  @Prop({ required: true })
  mimeType!: string;
  @Prop({ required: true })
  size!: number;
  @Prop()
  width?: number;
  @Prop()
  height?: number;
  @Prop()
  altAr?: string;
  @Prop()
  altEn?: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
MediaSchema.index({ storageKey: 1 }, { unique: true });
MediaSchema.index({ createdAt: -1 });
