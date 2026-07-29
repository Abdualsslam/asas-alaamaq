import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostCategoryDocument = HydratedDocument<PostCategory>;

@Schema({
  collection: "post_categories",
  timestamps: true,
  versionKey: false,
})
export class PostCategory {
  @Prop({ required: true, trim: true })
  nameAr!: string;

  @Prop({ trim: true })
  nameEn?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const PostCategorySchema = SchemaFactory.createForClass(PostCategory);
