import type { Metadata } from "next";
import Image from "next/image";
import { Advantages } from "@/components/home/advantages";
import { GallerySection } from "@/components/home/gallery-section";
import { CtaSection } from "@/components/home/cta-section";
import { gallery } from "@/data/gallery";
import { company } from "@/data/company";
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
    title: dict.meta.aboutTitle,
    description: fill(dict.meta.aboutDescription, {
      company: company.name,
      address: pick(company.addressFull, locale),
    }),
    alternates: {
      canonical: localizedPath("/about", locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath("/about", item)]),
      ),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const photos = gallery.map((item) => ({
    id: item.id,
    src: item.src,
    caption: pick(item.caption, locale),
  }));

  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{dict.aboutPage.eyebrow}</p>
            <h1 className="display text-[36px] sm:text-[50px]">
              {dict.aboutPage.title}
            </h1>
            <p className="text-[16px] leading-relaxed text-ink-2">
              {fill(dict.aboutPage.lead, { company: company.name })}
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-mist">
            <Image
              src="/images/about-clinic.svg"
              alt={dict.aboutPreview.photoAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          <h2 className="display text-[30px] sm:text-[38px]">
            {dict.aboutPage.approachTitle}
          </h2>

          <div className="flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            <p>{dict.aboutPage.approach1}</p>
            <p>{dict.aboutPage.approach2}</p>
            <p>{dict.aboutPage.approach3}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-milk py-14 sm:py-20">
        <div className="container-page">
          <h2 className="display mb-10 text-[30px] sm:text-[38px]">
            {dict.aboutPage.valuesTitle}
          </h2>

          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {dict.aboutPage.values.map((value, index) => (
              <li key={value.title} className="flex flex-col gap-3 bg-paper p-7">
                <span className="text-[13px] text-accent tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[18px] font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-2">{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Advantages locale={locale} />
      <GallerySection items={photos} />
      <CtaSection locale={locale} />
    </>
  );
}
