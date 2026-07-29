import { MetadataRoute } from 'next'
import { seoConfig } from "@/config/seo"
import { getPublicPosts, getPublicProjects } from "@/lib/api/public-api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, projectsResult] = await Promise.allSettled([
    getPublicPosts({ page: 1, limit: 100 }),
    getPublicProjects(),
  ])
  const posts = postsResult.status === "fulfilled" ? postsResult.value.data : []
  const projects =
    projectsResult.status === "fulfilled"
      ? projectsResult.value.filter((project) => project.detailEnabled)
      : []
  const routes = ['', '/blog']

  const staticEntries = seoConfig.locales.flatMap((locale) => {
    return routes.map((route) => {
      const languages: Record<string, string> = {}
      seoConfig.locales.forEach((l) => {
        languages[l] = `${seoConfig.domain}/${l}${route}`
      })

      return {
        url: `${seoConfig.domain}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages,
        },
      }
    })
  })

  const postEntries = posts.flatMap((post) =>
    seoConfig.locales.map((locale) => ({
      url: `${seoConfig.domain}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${seoConfig.domain}/ar/blog/${post.slug}`,
          en: `${seoConfig.domain}/en/blog/${post.slug}`,
        },
      },
    })),
  )

  const projectEntries = projects.flatMap((project) =>
    seoConfig.locales.map((locale) => ({
      url: `${seoConfig.domain}/${locale}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${seoConfig.domain}/ar/projects/${project.slug}`,
          en: `${seoConfig.domain}/en/projects/${project.slug}`,
        },
      },
    })),
  )

  return [...staticEntries, ...postEntries, ...projectEntries]
}
