import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcrypt";
import { imageSize } from "image-size";
import { Model } from "mongoose";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { Admin, AdminDocument } from "../admins/admin.schema";
import { Media, MediaDocument } from "../media/media.schema";
import { R2Service } from "../media/r2.service";
import {
  ProjectCategory,
  ProjectCategoryDocument,
} from "../projects/categories/project-category.schema";
import { Project, ProjectDocument } from "../projects/project.schema";
import { Settings, SettingsDocument } from "../settings/settings.schema";
import {
  initialSettings,
  legacyGallery,
  projectCategories,
} from "./seed-data";

export interface SeedReport {
  admin: "created" | "existing";
  projectCategories: number;
  legacyMedia: number;
  legacyProjects: number;
  settings: number;
  r2Uploads: number;
  r2Existing: number;
  r2UploadFailures: number;
  brokenMediaRefs: number;
}

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(ProjectCategory.name)
    private readonly categoryModel: Model<ProjectCategoryDocument>,
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly r2Service: R2Service,
    private readonly configService: ConfigService,
  ) {}

  async run(): Promise<SeedReport> {
    const email = this.configService
      .getOrThrow<string>("SEED_ADMIN_EMAIL")
      .trim()
      .toLowerCase();
    let adminResult: "created" | "existing" = "existing";
    if (!(await this.adminModel.exists({ email }))) {
      const passwordHash = await bcrypt.hash(
        this.configService.getOrThrow<string>("SEED_ADMIN_PASSWORD"),
        12,
      );
      await this.adminModel.create({
        email,
        passwordHash,
        isActive: true,
      });
      adminResult = "created";
    }

    const categoryBySlug = new Map<string, string>();
    for (const category of projectCategories) {
      const record = await this.categoryModel
        .findOneAndUpdate(
          { slug: category.slug },
          { $set: category },
          { upsert: true, new: true, runValidators: true },
        )
        .exec();
      categoryBySlug.set(category.slug, record.id);
    }

    await this.settingsModel.updateOne(
      { key: "main" },
      { $setOnInsert: initialSettings },
      { upsert: true, runValidators: true },
    );

    const galleryDirectory = resolve(
      process.cwd(),
      "../frontend/public/images/gallary",
    );
    let r2Uploads = 0;
    let r2Existing = 0;
    let r2UploadFailures = 0;

    for (const item of legacyGallery) {
      const storageKey = `legacy/projects/gallery/img-${String(
        item.order,
      ).padStart(2, "0")}.webp`;
      const localPath = resolve(galleryDirectory, item.file);
      let fileBuffer: Buffer;
      let fileStat;
      try {
        [fileBuffer, fileStat] = await Promise.all([
          readFile(localPath),
          stat(localPath),
        ]);
      } catch {
        throw new Error(`Legacy gallery source file is missing: ${item.file}`);
      }

      let objectExists = await this.r2Service.exists(storageKey);
      if (!objectExists) {
        try {
          await this.r2Service.upload(storageKey, fileBuffer, "image/webp");
          r2Uploads += 1;
          objectExists = true;
        } catch (error) {
          r2UploadFailures += 1;
          throw new Error(
            `R2 upload failed for ${storageKey}: ${
              error instanceof Error ? error.message : "unknown error"
            }`,
          );
        }
      } else {
        r2Existing += 1;
      }
      if (!objectExists) {
        throw new Error(`R2 object verification failed: ${storageKey}`);
      }

      const dimensions = imageSize(fileBuffer);
      const media = await this.mediaModel
        .findOneAndUpdate(
          { storageKey },
          {
            $set: {
              publicUrl: this.r2Service.publicUrl(storageKey),
              originalFileName: item.file,
              mimeType: "image/webp",
              size: fileStat.size,
              width: dimensions.width,
              height: dimensions.height,
              altAr: item.titleAr,
              altEn: item.titleEn,
            },
          },
          { upsert: true, new: true, runValidators: true },
        )
        .exec();

      const categoryId = categoryBySlug.get(item.category);
      if (!categoryId) {
        throw new Error(`Seed category not found: ${item.category}`);
      }
      await this.projectModel.updateOne(
        { slug: item.slug },
        {
          $set: {
            titleAr: item.titleAr,
            titleEn: item.titleEn,
            coverMediaId: media._id,
            galleryMediaIds: [],
            categoryId,
            status: "published",
            sortOrder: item.order,
            detailEnabled: false,
            seo: {},
          },
        },
        { upsert: true, runValidators: true },
      );
    }

    const legacyKeys = legacyGallery.map(
      (item) =>
        `legacy/projects/gallery/img-${String(item.order).padStart(2, "0")}.webp`,
    );
    const legacySlugs = legacyGallery.map((item) => item.slug);
    const categorySlugs = projectCategories.map((category) => category.slug);
    const [
      categoryCount,
      mediaCount,
      projectCount,
      settingsCount,
      projects,
    ] = await Promise.all([
      this.categoryModel.countDocuments({ slug: { $in: categorySlugs } }),
      this.mediaModel.countDocuments({ storageKey: { $in: legacyKeys } }),
      this.projectModel.countDocuments({ slug: { $in: legacySlugs } }),
      this.settingsModel.countDocuments({ key: "main" }),
      this.projectModel
        .find({ slug: { $in: legacySlugs } })
        .select("coverMediaId")
        .lean()
        .exec(),
    ]);
    let brokenMediaRefs = 0;
    for (const project of projects) {
      if (
        !project.coverMediaId ||
        !(await this.mediaModel.exists({ _id: project.coverMediaId }))
      ) {
        brokenMediaRefs += 1;
      }
    }
    for (const key of legacyKeys) {
      if (!(await this.r2Service.exists(key))) brokenMediaRefs += 1;
    }

    if (
      categoryCount !== 5 ||
      mediaCount !== 15 ||
      projectCount !== 15 ||
      settingsCount !== 1 ||
      brokenMediaRefs !== 0
    ) {
      throw new Error(
        `Seed verification failed (categories=${categoryCount}, media=${mediaCount}, projects=${projectCount}, settings=${settingsCount}, brokenRefs=${brokenMediaRefs})`,
      );
    }

    return {
      admin: adminResult,
      projectCategories: categoryCount,
      legacyMedia: mediaCount,
      legacyProjects: projectCount,
      settings: settingsCount,
      r2Uploads,
      r2Existing,
      r2UploadFailures,
      brokenMediaRefs,
    };
  }
}
