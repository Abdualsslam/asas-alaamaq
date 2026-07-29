import type { Locale } from "@/i18n";
import { populated, type PostRecord, type ProjectRecord } from "@/lib/api/types";

export function localizePost(post: PostRecord, locale: Locale) {
  const useEnglish =
    locale === "en" &&
    Boolean(post.titleEn?.trim()) &&
    Boolean(post.contentEn?.trim());
  const contentLocale: Locale = useEnglish ? "en" : "ar";
  const category = populated(post.categoryId);
  const cover = populated(post.coverMediaId);

  return {
    contentLocale,
    usedArabicFallback: locale === "en" && !useEnglish,
    title: useEnglish ? post.titleEn!.trim() : post.titleAr,
    excerpt: useEnglish
      ? post.excerptEn?.trim() || post.excerptAr
      : post.excerptAr,
    content: useEnglish ? post.contentEn!.trim() : post.contentAr,
    category: category
      ? useEnglish
        ? category.nameEn?.trim() || category.nameAr
        : category.nameAr
      : undefined,
    cover,
    metaTitle: useEnglish
      ? post.seo?.metaTitleEn?.trim() || post.titleEn!.trim()
      : post.seo?.metaTitleAr?.trim() || post.titleAr,
    metaDescription: useEnglish
      ? post.seo?.metaDescriptionEn?.trim() ||
        post.excerptEn?.trim() ||
        post.excerptAr
      : post.seo?.metaDescriptionAr?.trim() || post.excerptAr,
  };
}

export function localizeProject(project: ProjectRecord, locale: Locale) {
  const useEnglish = locale === "en" && Boolean(project.titleEn?.trim());
  const category = populated(project.categoryId);
  return {
    contentLocale: useEnglish ? ("en" as const) : ("ar" as const),
    usedArabicFallback: locale === "en" && !useEnglish,
    title: useEnglish ? project.titleEn!.trim() : project.titleAr,
    description: useEnglish
      ? project.descriptionEn?.trim() || project.descriptionAr || ""
      : project.descriptionAr || "",
    location: useEnglish
      ? project.locationEn?.trim() || project.locationAr
      : project.locationAr,
    category: category
      ? useEnglish
        ? category.nameEn?.trim() || category.nameAr
        : category.nameAr
      : undefined,
    cover: populated(project.coverMediaId),
    gallery: project.galleryMediaIds
      .map((item) => populated(item))
      .filter((item) => item !== undefined),
    metaTitle: useEnglish
      ? project.seo?.metaTitleEn?.trim() || project.titleEn!.trim()
      : project.seo?.metaTitleAr?.trim() || project.titleAr,
    metaDescription: useEnglish
      ? project.seo?.metaDescriptionEn?.trim() ||
        project.descriptionEn?.trim() ||
        project.descriptionAr ||
        ""
      : project.seo?.metaDescriptionAr?.trim() || project.descriptionAr || "",
  };
}
