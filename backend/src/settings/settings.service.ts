import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { serializeEntity } from "../common/serialize";
import { Media, MediaDocument } from "../media/media.schema";
import { UpdateSettingsDto } from "./dto/settings.dto";
import { Settings, SettingsDocument } from "./settings.schema";

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
  ) {}

  async get() {
    const settings = await this.settingsModel
      .findOne({ key: "main" })
      .populate("companyProfileMediaId")
      .lean()
      .exec();
    if (!settings) throw new NotFoundException("Site settings not seeded");
    return serializeEntity(settings);
  }

  async update(dto: UpdateSettingsDto) {
    if (dto.companyProfileMediaId) {
      const media = await this.mediaModel
        .findById(dto.companyProfileMediaId)
        .lean()
        .exec();
      if (!media || media.mimeType !== "application/pdf") {
        throw new UnprocessableEntityException({
          code: "INVALID_PROFILE_MEDIA",
          message: "Company profile must reference an existing PDF",
        });
      }
    }
    const settings = await this.settingsModel
      .findOneAndUpdate(
        { key: "main" },
        { ...dto, key: "main" },
        { new: true, runValidators: true },
      )
      .populate("companyProfileMediaId")
      .exec();
    if (!settings) throw new NotFoundException("Site settings not seeded");
    return serializeEntity(settings);
  }
}
