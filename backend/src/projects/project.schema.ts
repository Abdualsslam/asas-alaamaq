import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { PublishStatus } from "../common/constants";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ _id: false })
export class ProjectSeo {
  @Prop()
  metaTitleAr?: string;
  @Prop()
  metaTitleEn?: string;
  @Prop()
  metaDescriptionAr?: string;
  @Prop()
  metaDescriptionEn?: string;
}
const ProjectSeoSchema = SchemaFactory.createForClass(ProjectSeo);

@Schema({
  collection: "projects",
  timestamps: true,
  versionKey: false,
})
export class Project {
  @Prop({ required: true, trim: true })
  titleAr!: string;
  @Prop({ trim: true })
  titleEn?: string;
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;
  @Prop()
  descriptionAr?: string;
  @Prop()
  descriptionEn?: string;

  @Prop({ type: Types.ObjectId, ref: "Media", required: true })
  coverMediaId!: Types.ObjectId;
  @Prop({ type: [{ type: Types.ObjectId, ref: "Media" }], default: [] })
  galleryMediaIds!: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: "ProjectCategory", required: true })
  categoryId!: Types.ObjectId;

  @Prop()
  locationAr?: string;
  @Prop()
  locationEn?: string;
  @Prop({ enum: ["draft", "published"], default: "draft", index: true })
  status!: PublishStatus;
  @Prop({ required: true, default: 0 })
  sortOrder!: number;
  @Prop({ default: false })
  detailEnabled!: boolean;
  @Prop({ type: ProjectSeoSchema, default: {} })
  seo!: ProjectSeo;

  createdAt!: Date;
  updatedAt!: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ status: 1, sortOrder: 1 });
ProjectSchema.index({ categoryId: 1 });
