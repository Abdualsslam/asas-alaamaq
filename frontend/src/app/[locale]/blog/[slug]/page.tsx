import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { seoConfig } from "@/config/seo";
import type { Locale } from "@/i18n";
import {
  adaptSiteSettings,
  fallbackSiteSettings,
} from "@/lib/adapters/site-settings";
import { ApiError } from "@/lib/api/api-error";
import {
  getPublicPostBySlug,
  getPublicSettings,
} from "@/lib/api/public-api";
import { localizePost } from "@/lib/content/localize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (localeParam !== "ar" && localeParam !== "en") return {};
  try {
    const post = await getPublicPostBySlug(slug);
    const content = localizePost(post, localeParam as Locale);
    const url = `${seoConfig.domain}/${localeParam}/blog/${post.slug}`;
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      alternates: {
        canonical: url,
        languages: {
          ar: `${seoConfig.domain}/ar/blog/${post.slug}`,
          en: `${seoConfig.domain}/en/blog/${post.slug}`,
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
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (localeParam !== "ar" && localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const [postResult, settingsResult] = await Promise.allSettled([
    getPublicPostBySlug(slug),
    getPublicSettings(),
  ]);
  const settings =
    settingsResult.status === "fulfilled"
      ? adaptSiteSettings(settingsResult.value)
      : fallbackSiteSettings;

  if (postResult.status === "rejected") {
    if (
      postResult.reason instanceof ApiError &&
      postResult.reason.status === 404
    ) {
      notFound();
    }
    return (
      <PublicPageShell settings={settings}>
        <section className="grid min-h-[70vh] place-items-center bg-charcoal px-4 pt-32 text-center text-white">
          <div>
            <h1 className="text-3xl font-black text-white">
              {locale === "ar"
                ? "المقال غير متاح مؤقتًا"
                : "This article is temporarily unavailable"}
            </h1>
            <Link
              href={`/${locale}/blog`}
              className="mt-6 inline-flex rounded-xl bg-equipment-orange px-5 py-3 font-bold"
            >
              {locale === "ar" ? "العودة للمدونة" : "Back to blog"}
            </Link>
          </div>
        </section>
      </PublicPageShell>
    );
  }

  const post = postResult.value;
  const content = localizePost(post, locale);
  const canonical = `${seoConfig.domain}/${locale}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: canonical,
    inLanguage: content.contentLocale,
    image: content.cover?.publicUrl,
    publisher: {
      "@type": "Organization",
      "@id": `${seoConfig.domain}/#organization`,
      name:
        locale === "ar" ? seoConfig.siteName.ar : seoConfig.siteName.en,
      url: seoConfig.domain,
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
          <div className="mx-auto max-w-4xl">
            <Link
              href={`/${locale}/blog`}
              className="mb-6 inline-flex text-sm font-bold text-equipment-orange"
            >
              {locale === "ar" ? "المدونة" : "Blog"}
            </Link>
            {content.category ? (
              <span className="mb-5 block w-fit rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                {content.category}
              </span>
            ) : null}
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/65">
              {content.excerpt}
            </p>
            {post.publishedAt ? (
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/45">
                <CalendarDays size={16} />
                {new Intl.DateTimeFormat(
                  locale === "ar" ? "ar-SA" : "en-US",
                  { dateStyle: "long" },
                ).format(new Date(post.publishedAt))}
              </div>
            ) : null}
            {content.usedArabicFallback ? (
              <p className="mt-5 text-sm text-equipment-orange" lang="en" dir="ltr">
                English content is not available; the Arabic original is shown.
              </p>
            ) : null}
          </div>
        </header>
        {content.cover ? (
          <div className="mx-auto -mt-1 max-w-5xl px-4">
            <div className="relative aspect-[16/8] overflow-hidden rounded-b-3xl bg-[#e9e4dc]">
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
                sizes="(max-width: 1100px) 100vw, 1000px"
              />
            </div>
          </div>
        ) : null}
        <div className="bg-sand-light px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-10">
              <div className="text-[17px] leading-9 text-charcoal [&_a]:font-bold [&_a]:text-earth-brown [&_blockquote]:my-6 [&_blockquote]:border-r-4 [&_blockquote]:border-earth-brown [&_blockquote]:bg-sand-light [&_blockquote]:p-5 [&_code]:rounded [&_code]:bg-charcoal/5 [&_code]:px-1.5 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-black [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-black [&_img]:my-7 [&_img]:rounded-2xl [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pr-6 [&_p]:mb-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-charcoal [&_pre]:p-5 [&_pre]:text-white [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pr-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PublicPageShell>
  );
}
