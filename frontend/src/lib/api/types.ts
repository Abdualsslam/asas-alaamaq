export type PublishStatus = "draft" | "published";

export interface ApiEnvelope<T> {
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface AdminRecord {
  id: string;
  email: string;
  lastLoginAt?: string;
}

export interface MediaRecord {
  id: string;
  storageKey: string;
  publicUrl: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altAr?: string;
  altEn?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCategory {
  id: string;
  nameAr: string;
  nameEn?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type EntityReference<T extends { id: string }> = string | T;

export interface SeoFields {
  metaTitleAr?: string;
  metaTitleEn?: string;
  metaDescriptionAr?: string;
  metaDescriptionEn?: string;
}

export interface PostRecord {
  id: string;
  titleAr: string;
  titleEn?: string;
  slug: string;
  excerptAr: string;
  excerptEn?: string;
  contentAr: string;
  contentEn?: string;
  coverMediaId?: EntityReference<MediaRecord>;
  categoryId?: EntityReference<PostCategory>;
  status: PublishStatus;
  publishedAt?: string;
  seo: SeoFields;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRecord {
  id: string;
  titleAr: string;
  titleEn?: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  coverMediaId: EntityReference<MediaRecord>;
  galleryMediaIds: Array<EntityReference<MediaRecord>>;
  categoryId: EntityReference<ProjectCategory>;
  locationAr?: string;
  locationEn?: string;
  status: PublishStatus;
  sortOrder: number;
  detailEnabled: boolean;
  seo: SeoFields;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneSetting {
  display: string;
  raw: string;
}

export interface LocalizedLocation {
  ar: { city: string; country: string };
  en: { city: string; country: string };
}

export interface SocialSetting {
  linkedin?: string;
  instagram?: string;
  x?: string;
  youtube?: string;
}

export interface StatSetting {
  key: string;
  value: number;
  suffixAr?: string;
  suffixEn?: string;
  labelAr: string;
  labelEn: string;
  sortOrder: number;
}

export interface SettingsRecord {
  id: string;
  key: "main";
  phones: PhoneSetting[];
  whatsappNumber: string;
  email: string;
  website: string;
  location: LocalizedLocation;
  social: SocialSetting;
  companyProfileMediaId?: EntityReference<MediaRecord>;
  stats: StatSetting[];
  createdAt: string;
  updatedAt: string;
}

export interface PostPayload {
  titleAr: string;
  titleEn?: string;
  slug: string;
  excerptAr?: string;
  excerptEn?: string;
  contentAr?: string;
  contentEn?: string;
  coverMediaId?: string;
  categoryId?: string;
  status?: PublishStatus;
  seo?: SeoFields;
}

export interface ProjectPayload {
  titleAr: string;
  titleEn?: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  coverMediaId: string;
  galleryMediaIds?: string[];
  categoryId: string;
  locationAr?: string;
  locationEn?: string;
  status?: PublishStatus;
  sortOrder: number;
  detailEnabled?: boolean;
  seo?: SeoFields;
}

export interface CategoryPayload {
  nameAr: string;
  nameEn?: string;
  slug: string;
}

export interface ProjectCategoryPayload extends CategoryPayload {
  nameEn: string;
  sortOrder: number;
}

export type SettingsPayload = Pick<
  SettingsRecord,
  | "phones"
  | "whatsappNumber"
  | "email"
  | "website"
  | "location"
  | "social"
  | "stats"
> & {
  companyProfileMediaId?: string;
};

export function populated<T extends { id: string }>(
  reference: EntityReference<T> | undefined,
): T | undefined {
  return reference && typeof reference !== "string" ? reference : undefined;
}
