import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/shared/doctor-card";
import { CtaSection } from "@/components/home/cta-section";
import { BookingProvider } from "@/components/appointment/booking-provider";
import { services } from "@/data/services";
import {
  getBookingDataFor,
  getDoctorsByService,
  getService,
  getServices,
} from "@/services/api";
import {
  fill,
  getDictionary,
  localizedPath,
  locales,
  pick,
  type Locale,
} from "@/i18n";

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const dict = getDictionary(locale);
  const service = await getService(slug);

  if (!service) return { title: dict.meta.serviceNotFound };

  const title = pick(service.title, locale);
  const path = `/services/${service.slug}`;

  return {
    title,
    description: fill(dict.meta.serviceDescription, {
      title,
      summary: pick(service.summary, locale),
    }),
    alternates: {
      canonical: localizedPath(path, locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath(path, item)]),
      ),
    },
    openGraph: {
      title: `${title} — Dentos Medical`,
      description: pick(service.summary, locale),
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const dict = getDictionary(locale);
  const service = await getService(slug);
  if (!service) notFound();

  const [doctors, allServices] = await Promise.all([
    getDoctorsByService(slug),
    getServices(),
  ]);

  const related = allServices
    .filter(
      (item) =>
        item.categorySlug === service.categorySlug && item.slug !== service.slug,
    )
    .slice(0, 3);

  const bookings = getBookingDataFor(
    doctors.map((doctor) => doctor.slug),
    locale,
  );

  const title = pick(service.title, locale);

  return (
    <BookingProvider bookings={bookings}>
      <section className="border-b border-line bg-milk py-8 sm:py-12">
        <div className="container-page">
          <NextLink
            href={localizedPath("/services", locale)}
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {dict.servicePage.allServices}
          </NextLink>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
            <div className="flex flex-col gap-6">
              <h1 className="display text-[36px] sm:text-[50px]">{title}</h1>
              <p className="max-w-xl text-[16px] leading-relaxed text-ink-2">
                {pick(service.summary, locale)}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-2">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" aria-hidden />
                  {fill(dict.servicePage.duration, {
                    minutes: service.durationMinutes,
                  })}
                </span>
                {service.priceFrom && (
                  <span className="text-ink">
                    {dict.servicePage.price} {service.priceFrom}
                  </span>
                )}
              </div>

              <Button asChild size="lg" className="self-start">
                <NextLink
                  href={localizedPath(
                    `/appointment?service=${service.slug}`,
                    locale,
                  )}
                >
                  {dict.servicePage.book}
                </NextLink>
              </Button>
            </div>

            {service.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-card bg-mist">
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container-page flex flex-col gap-16 py-14 sm:gap-20 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
          <section className="flex flex-col gap-5">
            <h2 className="display text-[28px] sm:text-[34px]">
              {dict.servicePage.about}
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">
              {pick(service.description, locale)}
            </p>
          </section>

          <aside className="flex flex-col gap-4 rounded-card border border-line bg-milk p-6">
            <h2 className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
              {dict.servicePage.includes}
            </h2>
            <ul className="flex flex-col gap-3">
              {pick(service.includes, locale).map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="display text-[28px] sm:text-[34px]">
            {dict.servicePage.stages}
          </h2>

          {/* Нумерация здесь не украшение: этапы идут строго друг за другом. */}
          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {service.stages.map((stage, index) => (
              <li
                key={pick(stage.title, locale)}
                className="flex flex-col gap-3 bg-paper p-6"
              >
                <span className="text-[13px] text-accent tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-semibold text-ink">
                  {pick(stage.title, locale)}
                </h3>
                <p className="text-sm leading-relaxed text-ink-2">
                  {pick(stage.text, locale)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {doctors.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="display text-[28px] sm:text-[34px]">
              {dict.servicePage.doctors}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.slug}
                  doctor={doctor}
                  locale={locale}
                  className="h-full"
                />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="display text-[28px] sm:text-[34px]">
              {dict.servicePage.related}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <NextLink
                    href={localizedPath(`/services/${item.slug}`, locale)}
                    className="inline-flex rounded-pill border border-line bg-paper px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                  >
                    {pick(item.title, locale)}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <CtaSection locale={locale} />
    </BookingProvider>
  );
}
