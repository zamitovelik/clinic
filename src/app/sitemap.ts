import type { MetadataRoute } from "next";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentosmedical.uz";

/** Карта сайта: страницы врачей и услуг попадают в неё автоматически. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/doctors", priority: 0.9 },
    { path: "/appointment", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contacts", priority: 0.7 },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...doctors.map((doctor) => ({
      url: `${siteUrl}/doctors/${doctor.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
