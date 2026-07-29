import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SettingsDocument = HydratedDocument<Settings>;

@Schema({ _id: false })
export class PhoneSetting {
  @Prop({ required: true })
  display!: string;
  @Prop({ required: true })
  raw!: string;
}

@Schema({ _id: false })
export class LocationValue {
  @Prop({ required: true })
  city!: string;
  @Prop({ required: true })
  country!: string;
}

@Schema({ _id: false })
export class LocationSetting {
  @Prop({ type: SchemaFactory.createForClass(LocationValue), required: true })
  ar!: LocationValue;
  @Prop({ type: SchemaFactory.createForClass(LocationValue), required: true })
  en!: LocationValue;
}

@Schema({ _id: false })
export class SocialSetting {
  @Prop()
  linkedin?: string;
  @Prop()
  instagram?: string;
  @Prop()
  x?: string;
  @Prop()
  youtube?: string;
}

@Schema({ _id: false })
export class StatSetting {
  @Prop({ required: true })
  key!: string;
  @Prop({ required: true })
  value!: number;
  @Prop()
  suffixAr?: string;
  @Prop()
  suffixEn?: string;
  @Prop({ required: true })
  labelAr!: string;
  @Prop({ required: true })
  labelEn!: string;
  @Prop({ required: true })
  sortOrder!: number;
}

@Schema({
  collection: "settings",
  timestamps: true,
  versionKey: false,
})
export class Settings {
  @Prop({ required: true, unique: true, enum: ["main"] })
  key!: "main";
  @Prop({ type: [SchemaFactory.createForClass(PhoneSetting)], required: true })
  phones!: PhoneSetting[];
  @Prop({ required: true })
  whatsappNumber!: string;
  @Prop({ required: true })
  email!: string;
  @Prop({ required: true })
  website!: string;
  @Prop({ type: SchemaFactory.createForClass(LocationSetting), required: true })
  location!: LocationSetting;
  @Prop({ type: SchemaFactory.createForClass(SocialSetting), default: {} })
  social!: SocialSetting;
  @Prop({ type: Types.ObjectId, ref: "Media" })
  companyProfileMediaId?: Types.ObjectId;
  @Prop({ type: [SchemaFactory.createForClass(StatSetting)], required: true })
  stats!: StatSetting[];

  createdAt!: Date;
  updatedAt!: Date;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
SettingsSchema.index({ key: 1 }, { unique: true });
