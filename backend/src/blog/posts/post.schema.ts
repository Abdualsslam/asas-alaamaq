import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { PublishStatus } from "../../common/constants";

export type PostDocument = HydratedDocument<Post>;

@Schema({ _id: false })
export class PostSeo {
  @Prop()
  metaTitleAr?: string;
  @Prop()
  metaTitleEn?: string;
  @Prop()
  metaDescriptionAr?: string;
  @Prop()
  metaDescriptionEn?: string;
}

const PostSeoSchema = SchemaFactory.createForClass(PostSeo);

@Schema({
  collection: "posts",
  timestamps: true,
  versionKey: false,
})
export class Post {
  @Prop({ required: true, trim: true })
  titleAr!: string;
  @Prop({ trim: true })
  titleEn?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ default: "" })
  excerptAr!: string;
  @Prop()
  excerptEn?: string;

  @Prop({ default: "" })
  contentAr!: string;
  @Prop()
  contentEn?: string;

  @Prop({ type: Types.ObjectId, ref: "Media" })
  coverMediaId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "PostCategory" })
  categoryId?: Types.ObjectId;

  @Prop({ enum: ["draft", "published"], default: "draft", index: true })
  status!: PublishStatus;

  @Prop()
  publishedAt?: Date;

  @Prop({ type: PostSeoSchema, default: {} })
  seo!: PostSeo;

  createdAt!: Date;
  updatedAt!: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ status: 1, publishedAt: -1 });
PostSchema.index({ categoryId: 1 });
PostSchema.index({ createdAt: -1 });
