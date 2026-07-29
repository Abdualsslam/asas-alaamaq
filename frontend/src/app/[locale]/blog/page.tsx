import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { seoConfig } from "@/config/seo";
import type { Locale } from "@/i18n";
import {
  adaptSiteSettings,
  fallbackSiteSettings,
} from "@/lib/adapters/site-settings";
import { localizePost } from "@/lib/content/localize";
import { getPublicPosts, getPublicSettings } from "@/lib/api/public-api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const title = isArabic ? "المدونة | أساس الأعماق" : "Blog | ASAS AL-AAMAQ";
  const description = isArabic
    ? "مقالات أساس الأعماق في هندسة الأرض واستقرار الحفريات."
    : "ASAS AL-AAMAQ articles on geotechnical engineering and excavation stability.";
  return {
    title,
    description,
    alternates: {
      canonical: `${seoConfig.domain}/${locale}/blog`,
      languages: {
        ar: `${seoConfig.domain}/ar/blog`,
        en: `${seoConfig.domain}/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${seoConfig.domain}/${locale}/blog`,
      siteName: isArabic ? seoConfig.siteName.ar : seoConfig.siteName.en,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { locale: localeParam } = await params;
  if (localeParam !== "ar" && localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query.page || "1", 10) || 1);
  const [postsResult, settingsResult] = await Promise.allSettled([
    getPublicPosts({ page, limit: 9, category: query.category }),
    getPublicSettings(),
  ]);
  const settings =
    settingsResult.status === "fulfilled"
      ? adaptSiteSettings(settingsResult.value)
      : fallbackSiteSettings;
  const isArabic = locale === "ar";

  return (
    <PublicPageShell settings={settings}>
      <section className="bg-charcoal px-4 pb-20 pt-40 text-white md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1280px]">
          <span className="mb-5 inline-flex rounded-full border border-equipment-orange/30 bg-equipment-orange/10 px-4 py-2 text-sm font-bold text-equipment-orange">
            {isArabic ? "معرفة هندسية" : "Engineering Knowledge"}
          </span>
          <h1 className="max-w-3xl text-4xl font-black text-white md:text-6xl">
            {isArabic ? "مدونة أساس الأعماق" : "ASAS AL-AAMAQ Blog"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            {isArabic
              ? "مقالات متخصصة في هندسة الأرض، سند الحفريات، وإدارة تحديات المواقع العميقة."
              : "Specialized articles on geotechnical engineering, shoring, and deep-site challenges."}
          </p>
        </div>
      </section>

      <section className="bg-sand-light px-4 py-20 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          {postsResult.status === "rejected" ? (
            <div className="rounded-2xl border border-border bg-white p-8 text-center">
              <h2 className="text-xl font-black">
                {isArabic
                  ? "المدونة غير متاحة مؤقتًا"
                  : "The blog is temporarily unavailable"}
              </h2>
              <p className="mt-2 text-concrete-gray">
                {isArabic
                  ? "يرجى المحاولة مرة أخرى لاحقًا."
                  : "Please try again later."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {postsResult.value.data.map((post) => {
                  const content = localizePost(post, locale);
                  return (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      lang={content.contentLocale}
                      dir={content.contentLocale === "ar" ? "rtl" : "ltr"}
                    >
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="block"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#e9e4dc]">
                          {content.cover ? (
                            <Image
                              src={content.cover.publicUrl}
                              alt={
                                (content.contentLocale === "ar"
                                  ? content.cover.altAr
                                  : content.cover.altEn) || content.title
                              }
                              fill
                              className="object-cover transition duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-earth-brown to-charcoal" />
                          )}
                        </div>
                        <div className="p-5">
                          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-concrete-gray">
                            {content.category ? (
                              <span className="rounded-full bg-earth-brown/10 px-3 py-1 font-bold text-earth-brown">
                                {content.category}
                              </span>
                            ) : null}
                            {post.publishedAt ? (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={14} />
                                {new Intl.DateTimeFormat(
                                  isArabic ? "ar-SA" : "en-US",
                                  { dateStyle: "medium" },
                                ).format(new Date(post.publishedAt))}
                              </span>
                            ) : null}
                          </div>
                          <h2 className="text-xl font-black leading-snug text-charcoal">
                            {content.title}
                          </h2>
                          <p className="mt-3 line-clamp-3 text-sm text-concrete-gray">
                            {content.excerpt}
                          </p>
                          {content.usedArabicFallback ? (
                            <span
                              className="mt-4 block text-xs text-earth-brown"
                              lang="en"
                              dir="ltr"
                            >
                              Available in Arabic
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
              {!postsResult.value.data.length ? (
                <p className="py-16 text-center text-concrete-gray">
                  {isArabic ? "لا توجد مقالات منشورة." : "No published posts."}
                </p>
              ) : null}
              {postsResult.value.meta.totalPages > 1 ? (
                <nav
                  className="mt-10 flex items-center justify-center gap-3"
                  aria-label={isArabic ? "ترقيم الصفحات" : "Pagination"}
                >
                  {page > 1 ? (
                    <Link
                      href={`/${locale}/blog?page=${page - 1}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold"
                    >
                      {isArabic ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
                      {isArabic ? "السابق" : "Previous"}
                    </Link>
                  ) : null}
                  <span className="text-sm text-concrete-gray">
                    {page} / {postsResult.value.meta.totalPages}
                  </span>
                  {page < postsResult.value.meta.totalPages ? (
                    <Link
                      href={`/${locale}/blog?page=${page + 1}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold"
                    >
                      {isArabic ? "التالي" : "Next"}
                      {isArabic ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>
    </PublicPageShell>
  );
}
