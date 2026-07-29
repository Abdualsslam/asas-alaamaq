import type { Locale } from "@/i18n";
import { populated, type ProjectRecord } from "@/lib/api/types";

export interface GalleryProject {
  id: number;
  projectId: string;
  src: string;
  label: string;
  category: string;
  categorySlug: string;
  sortOrder: number;
  slug: string;
  detailEnabled: boolean;
}

export function adaptProjectsToGallery(
  projects: ProjectRecord[],
  locale: Locale,
): GalleryProject[] {
  return [...projects]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .flatMap((project) => {
      const cover = populated(project.coverMediaId);
      const category = populated(project.categoryId);
      if (!cover || !category) return [];
      return [
        {
          id: project.sortOrder,
          projectId: project.id,
          src: cover.publicUrl,
          label:
            locale === "en"
              ? project.titleEn?.trim() || project.titleAr
              : project.titleAr,
          category:
            locale === "en"
              ? category.nameEn?.trim() || category.nameAr
              : category.nameAr,
          categorySlug: category.slug,
          sortOrder: project.sortOrder,
          slug: project.slug,
          detailEnabled: project.detailEnabled,
        },
      ];
    });
}
