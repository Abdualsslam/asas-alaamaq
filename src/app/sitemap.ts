import { MetadataRoute } from 'next'
import { seoConfig } from "@/config/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes without the locale prefix
  const routes = ['']

  // Create an entry for each locale and each route
  return seoConfig.locales.flatMap((locale) => {
    return routes.map((route) => {
      // Build alternates for this route across all locales
      const languages: Record<string, string> = {}
      seoConfig.locales.forEach((l) => {
        languages[l] = `${seoConfig.domain}/${l}${route}`
      })

      return {
        url: `${seoConfig.domain}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages,
        },
      }
    })
  })
}
