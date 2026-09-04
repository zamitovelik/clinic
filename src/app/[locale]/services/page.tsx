import type { Metadata } from "next";
import { ServiceCard } from "@/components/shared/service-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { getServiceCategories, getServices } from "@/services/api";
import {
  getDictionary,
  localizedPath,
  locales,
  pick,
  type Locale,
} from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDescription,
    alternates: {
      canonical: localizedPath("/services", locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath("/services", item)]),
      ),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const [services, categories] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">{dict.servicesPage.eyebrow}</p>
          <h1 className="display text-[36px] sm:text-[50px]">
            {dict.servicesPage.title}
          </h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            {dict.servicesPage.description}
          </p>
        </div>
      </section>

      <div className="container-page flex flex-col gap-14 py-14 sm:gap-20 sm:py-20">
        {categories.map((category) => {
          const items = services.filter(
            (service) => service.categorySlug === category.slug,
          );
          if (items.length === 0) return null;

          return (
            <section key={category.slug} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-b border-line pb-5">
                <h2 className="display text-[28px] sm:text-[34px]">
                  {pick(category.title, locale)}
                </h2>
                <p className="text-[15px] text-ink-2">
                  {pick(category.summary, locale)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, index) => (
                  <Reveal key={service.slug} delay={index * 50} className="h-full">
                    <ServiceCard
                      service={service}
                      locale={locale}
                      className="h-full"
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaSection locale={locale} />
    </>
  );
}
