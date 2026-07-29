import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { seoConfig } from "@/config/seo";
import type { Locale } from "@/i18n";
import {
  adaptSiteSettings,
  fallbackSiteSettings,
} from "@/lib/adapters/site-settings";
import { ApiError } from "@/lib/api/api-error";
import {
  getPublicProjectBySlug,
  getPublicSettings,
} from "@/lib/api/public-api";
import { localizeProject } from "@/lib/content/localize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (localeParam !== "ar" && localeParam !== "en") return {};
  try {
    const project = await getPublicProjectBySlug(slug);
    const content = localizeProject(project, localeParam as Locale);
    const url = `${seoConfig.domain}/${localeParam}/projects/${project.slug}`;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: {
        canonical: url,
        languages: {
          ar: `${seoConfig.domain}/ar/projects/${project.slug}`,
          en: `${seoConfig.domain}/en/projects/${project.slug}`,
        },
      },
      openGraph: {
        type: "article",
        title: content.metaTitle,
        description: content.metaDescription,
        url,
        siteName:
          localeParam === "ar"
            ? seoConfig.siteName.ar
            : seoConfig.siteName.en,
        images: content.cover ? [content.cover.publicUrl] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: content.metaTitle,
        description: content.metaDescription,
        images: content.cover ? [content.cover.publicUrl] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (localeParam !== "ar" && localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const [projectResult, settingsResult] = await Promise.allSettled([
    getPublicProjectBySlug(slug),
    getPublicSettings(),
  ]);
  const settings =
    settingsResult.status === "fulfilled"
      ? adaptSiteSettings(settingsResult.value)
      : fallbackSiteSettings;

  if (projectResult.status === "rejected") {
    if (
      projectResult.reason instanceof ApiError &&
      projectResult.reason.status === 404
    ) {
      notFound();
    }
    return (
      <PublicPageShell settings={settings}>
        <section className="grid min-h-[70vh] place-items-center bg-charcoal px-4 pt-32 text-center text-white">
          <div>
            <h1 className="text-3xl font-black text-white">
              {locale === "ar"
                ? "المشروع غير متاح مؤقتًا"
                : "This project is temporarily unavailable"}
            </h1>
            <Link
              href={`/${locale}#projects`}
              className="mt-6 inline-flex rounded-xl bg-equipment-orange px-5 py-3 font-bold"
            >
              {locale === "ar" ? "العودة للمشاريع" : "Back to projects"}
            </Link>
          </div>
        </section>
      </PublicPageShell>
    );
  }

  const project = projectResult.value;
  const content = localizeProject(project, locale);
  const canonical = `${seoConfig.domain}/${locale}/projects/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.metaDescription,
    url: canonical,
    inLanguage: content.contentLocale,
    primaryImageOfPage: content.cover
      ? {
          "@type": "ImageObject",
          contentUrl: content.cover.publicUrl,
        }
      : undefined,
    about: {
      "@type": "Organization",
      "@id": `${seoConfig.domain}/#organization`,
      name:
        locale === "ar" ? seoConfig.siteName.ar : seoConfig.siteName.en,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ar" ? "الرئيسية" : "Home",
          item: `${seoConfig.domain}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.title,
          item: canonical,
        },
      ],
    },
  };

  return (
    <PublicPageShell settings={settings}>
      <article
        lang={content.contentLocale}
        dir={content.contentLocale === "ar" ? "rtl" : "ltr"}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <header className="bg-charcoal px-4 pb-16 pt-40 text-white md:pb-20 md:pt-48">
          <div className="mx-auto max-w-5xl">
            <Link
              href={`/${locale}#projects`}
              className="mb-6 inline-flex text-sm font-bold text-equipment-orange"
            >
              {locale === "ar" ? "معرض المشاريع" : "Project Gallery"}
            </Link>
            {content.category ? (
              <span className="mb-5 block w-fit rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                {content.category}
              </span>
            ) : null}
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              {content.title}
            </h1>
            {content.description ? (
              <p className="mt-6 max-w-3xl text-lg text-white/65">
                {content.description}
              </p>
            ) : null}
            {content.location ? (
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/50">
                <MapPin size={16} />
                {content.location}
              </span>
            ) : null}
            {content.usedArabicFallback ? (
              <p className="mt-5 text-sm text-equipment-orange" lang="en" dir="ltr">
                English content is not available; the Arabic original is shown.
              </p>
            ) : null}
          </div>
        </header>

        <section className="bg-sand-light px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            {content.cover ? (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl bg-[#e9e4dc]">
                <Image
                  src={content.cover.publicUrl}
                  alt={
                    (content.contentLocale === "ar"
                      ? content.cover.altAr
                      : content.cover.altEn) || content.title
                  }
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1150px"
                />
              </div>
            ) : null}
            {content.gallery.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.gallery.map((media) => (
                  <div
                    key={media.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e4dc]"
                  >
                    <Image
                      src={media.publicUrl}
                      alt={
                        (content.contentLocale === "ar"
                          ? media.altAr
                          : media.altEn) || content.title
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </article>
    </PublicPageShell>
  );
}
