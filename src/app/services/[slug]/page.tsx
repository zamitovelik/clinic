import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/shared/doctor-card";
import { CtaSection } from "@/components/home/cta-section";
import { services } from "@/data/services";
import { BookingProvider } from "@/components/appointment/booking-provider";
import {
  getBookingDataFor,
  getDoctorsByService,
  getService,
  getServices,
} from "@/services/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) return { title: "Услуга не найдена" };

  return {
    title: service.title,
    description: `${service.title} в стоматологии Dentos Medical, Ташкент. ${service.summary} Онлайн-запись к врачу.`,
    openGraph: {
      title: `${service.title} — Dentos Medical`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
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

  const bookings = getBookingDataFor(doctors.map((doctor) => doctor.slug));

  return (
    <BookingProvider bookings={bookings}>
      <section className="border-b border-line bg-milk py-8 sm:py-12">
        <div className="container-page">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Все услуги
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
            <div className="flex flex-col gap-6">
              <h1 className="display text-[36px] sm:text-[50px]">{service.title}</h1>
              <p className="max-w-xl text-[16px] leading-relaxed text-ink-2">
                {service.summary}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-2">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" aria-hidden />
                  Приём около {service.durationMinutes} минут
                </span>
                {service.priceFrom && (
                  <span className="text-ink">Стоимость {service.priceFrom}</span>
                )}
              </div>

              <Button asChild size="lg" className="self-start">
                <Link href={`/appointment?service=${service.slug}`}>
                  Записаться на приём
                </Link>
              </Button>
            </div>

            {service.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-card bg-mist">
                <Image
                  src={service.image}
                  alt={service.title}
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
            <h2 className="display text-[28px] sm:text-[34px]">Об услуге</h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">
              {service.description}
            </p>
          </section>

          <aside className="flex flex-col gap-4 rounded-card border border-line bg-milk p-6">
            <h2 className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
              Что входит
            </h2>
            <ul className="flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="display text-[28px] sm:text-[34px]">Как проходит лечение</h2>

          {/* Нумерация здесь не украшение: этапы идут строго друг за другом. */}
          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {service.stages.map((stage, index) => (
              <li key={stage.title} className="flex flex-col gap-3 bg-paper p-6">
                <span className="text-[13px] text-accent tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-semibold text-ink">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{stage.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {doctors.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="display text-[28px] sm:text-[34px]">
              Врачи по этому направлению
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} className="h-full" />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="display text-[28px] sm:text-[34px]">Смотрите также</h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="inline-flex rounded-pill border border-line bg-paper px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <CtaSection />
    </BookingProvider>
  );
}
