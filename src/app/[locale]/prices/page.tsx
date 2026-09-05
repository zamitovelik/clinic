import type { Metadata } from "next";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { DemoNotice } from "@/components/shared/demo-notice";
import { PriceTable } from "@/components/shared/price-table";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { company } from "@/data/company";
import { prices, pricesAreDemo } from "@/data/prices";
import { getServices } from "@/services/api";
import {
  fill,
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
    title: dict.meta.pricesTitle,
    description: fill(dict.meta.pricesDescription, { company: company.name }),
    alternates: {
      canonical: localizedPath("/prices", locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath("/prices", item)]),
      ),
    },
  };
}

/**
 * Прайс-лист (раздел 13 ТЗ).
 *
 * Разделы прайса берутся из тех же услуг, что и остальной сайт, — заголовки
 * и ссылки не дублируются. Сверху оглавление: прайс длинный, и без него
 * человеку с телефона пришлось бы прокручивать всё подряд.
 */
export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const services = await getServices();

  // Показываем только те разделы, у которых есть и услуга, и строки прайса.
  const groups = prices
    .map((group) => ({
      ...group,
      service: services.find((item) => item.slug === group.serviceSlug),
    }))
    .filter((group) => group.service !== undefined && group.items.length > 0);

  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">{dict.pricesPage.eyebrow}</p>
          <h1 className="display text-[36px] sm:text-[50px]">
            {dict.pricesPage.title}
          </h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            {dict.pricesPage.description}
          </p>
        </div>
      </section>

      <div className="container-page flex flex-col gap-12 py-14 sm:py-20">
        {pricesAreDemo && (
          <DemoNotice className="max-w-3xl">
            {dict.prices.demoNotice}
          </DemoNotice>
        )}

        {/* Оглавление: якоря ведут к разделам ниже. */}
        <nav aria-label={dict.pricesPage.contents}>
          <ul className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <li key={group.serviceSlug}>
                <a
                  href={`#price-${group.serviceSlug}`}
                  className="inline-flex rounded-pill border border-line bg-paper px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                >
                  {pick(group.service!.title, locale)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <Reveal key={group.serviceSlug}>
              <section
                id={`price-${group.serviceSlug}`}
                className="flex scroll-mt-28 flex-col gap-5"
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="display text-[26px] sm:text-[32px]">
                    {pick(group.service!.title, locale)}
                  </h2>

                  <NextLink
                    href={localizedPath(`/services/${group.serviceSlug}`, locale)}
                    className="inline-flex items-center gap-1.5 py-1 text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    {dict.pricesPage.toService}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </NextLink>
                </div>

                <PriceTable items={group.items} locale={locale} />
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-6 rounded-card border border-line bg-milk p-7 sm:p-9">
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">
            {dict.pricesPage.note}
          </p>
          <Button asChild size="lg" className="self-start">
            <NextLink href={localizedPath("/appointment", locale)}>
              {dict.pricesPage.book}
            </NextLink>
          </Button>
        </Reveal>
      </div>

      <FaqSection locale={locale} tone="milk" />
      <CtaSection locale={locale} />
    </>
  );
}
