import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectCategoryDocument = HydratedDocument<ProjectCategory>;

@Schema({
  collection: "project_categories",
  timestamps: true,
  versionKey: false,
})
export class ProjectCategory {
  @Prop({ required: true, trim: true })
  nameAr!: string;
  @Prop({ required: true, trim: true })
  nameEn!: string;
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;
  @Prop({ required: true, index: true })
  sortOrder!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const ProjectCategorySchema =
  SchemaFactory.createForClass(ProjectCategory);
