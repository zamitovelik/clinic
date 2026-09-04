import type { MetadataRoute } from "next";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { localizedPath, locales } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentosmedical.uz";

/**
 * Карта сайта.
 *
 * Каждая страница попадает в неё на обоих языках, и у каждой записи указаны
 * ссылки на языковые версии: без этого поисковые системы считают русскую
 * и узбекскую страницы дублями друг друга.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/prices", priority: 0.8 },
    { path: "/doctors", priority: 0.9 },
    { path: "/appointment", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contacts", priority: 0.7 },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
    })),
    ...doctors.map((doctor) => ({
      path: `/doctors/${doctor.slug}`,
      priority: 0.8,
    })),
  ];

  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(path, locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [
            item,
            `${siteUrl}${localizedPath(path, item)}`,
          ]),
        ),
      },
    })),
  );
}
