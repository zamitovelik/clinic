import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookingProvider } from "@/components/appointment/booking-provider";
import { BookingTrigger } from "@/components/appointment/booking-trigger";
import { ReviewCard } from "@/components/shared/review-card";
import { CertificatesGallery } from "@/components/doctors/certificates-gallery";
import { DoctorTimeline } from "@/components/doctors/doctor-timeline";
import { DoctorScheduleBlock } from "@/components/doctors/doctor-schedule";
import { CtaSection } from "@/components/home/cta-section";
import { DoctorStructuredData } from "@/components/shared/structured-data";
import { doctors } from "@/data/doctors";
import {
  getBookingData,
  getDoctor,
  getDoctorReviews,
  getDoctorSchedule,
  getDoctorScheduleDays,
  getServices,
} from "@/services/api";
import { pluralYears } from "@/lib/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Страница показывает ближайшее свободное время, поэтому её нельзя оставить
 * замороженной на дате сборки: пересобираем не реже раза в четверть часа.
 */
export const revalidate = 900;

/** Адреса всех врачей известны заранее — страницы собираются заранее. */
export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);

  if (!doctor) return { title: "Врач не найден" };

  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: `${doctor.name}, ${doctor.specialty.toLowerCase()}. Стаж ${pluralYears(doctor.experience)}. ${doctor.shortDescription} Запись онлайн в клинику Dentos Medical.`,
    openGraph: {
      title: `${doctor.name} — ${doctor.specialty}`,
      description: doctor.shortDescription,
      images: [doctor.photo],
    },
  };
}

export default async function DoctorPage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) notFound();

  const [reviews, schedule, scheduleDays, allServices] = await Promise.all([
    getDoctorReviews(slug),
    getDoctorSchedule(slug),
    getDoctorScheduleDays(slug),
    getServices(),
  ]);

  const doctorServices = allServices.filter((service) =>
    doctor.serviceSlugs.includes(service.slug),
  );

  const booking = getBookingData(doctor.slug);

  return (
    <BookingProvider bookings={booking ? [booking] : []}>
      <DoctorStructuredData doctor={doctor} />

      {/* Первый экран страницы врача: фотография слева, данные справа. */}
      <section className="border-b border-line bg-milk py-8 sm:py-12">
        <div className="container-page">
          <Link
            href="/doctors"
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Все врачи
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
            <div className="relative aspect-4/5 overflow-hidden rounded-card bg-mist">
              <Image
                src={doctor.photo}
                alt={`${doctor.name} — ${doctor.specialty}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 lg:py-4">
              <div className="flex flex-col gap-3">
                <p className="eyebrow">{doctor.specialty}</p>
                <h1 className="display text-[34px] sm:text-[46px]">{doctor.name}</h1>
                <p className="max-w-xl text-[16px] leading-relaxed text-ink-2">
                  {doctor.shortDescription}
                </p>
              </div>

              <dl className="grid gap-4 border-y border-line py-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <dt className="text-[13px] text-ink-3">Опыт работы</dt>
                  <dd className="text-[16px] text-ink tabular">
                    {pluralYears(doctor.experience)}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[13px] text-ink-3">Категория</dt>
                  <dd className="text-[16px] text-ink">{doctor.category}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map((item) => (
                  <Badge key={item} tone="accent">
                    {item}
                  </Badge>
                ))}
              </div>

              <BookingTrigger
                doctorSlug={doctor.slug}
                size="lg"
                className="self-start"
              >
                Записаться к врачу
              </BookingTrigger>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page flex flex-col gap-16 py-14 sm:gap-20 sm:py-20">
        <section className="flex flex-col gap-6">
          <h2 className="display text-[28px] sm:text-[34px]">О враче</h2>
          <div className="flex max-w-3xl flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            {doctor.biography.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <DoctorTimeline items={doctor.workExperience} />

        <section className="flex flex-col gap-6">
          <h2 className="display text-[28px] sm:text-[34px]">Образование</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {doctor.education.map((item) => (
              <li
                key={`${item.year}-${item.institution}`}
                className="flex gap-4 rounded-card border border-line bg-paper p-5"
              >
                <GraduationCap
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-ink-3 tabular">{item.year}</span>
                  <span className="text-[15px] font-medium text-ink">
                    {item.institution}
                  </span>
                  <span className="text-sm text-ink-2">{item.specialty}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <CertificatesGallery certificates={doctor.certificates} />

        {doctorServices.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="display text-[28px] sm:text-[34px]">Направления</h2>
            <ul className="flex flex-wrap gap-3">
              {doctorServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex rounded-pill border border-line bg-paper px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {schedule && (
          <DoctorScheduleBlock
            doctorSlug={doctor.slug}
            schedule={schedule}
            days={scheduleDays}
          />
        )}

        <section className="flex flex-col gap-6">
          <h2 className="display text-[28px] sm:text-[34px]">Отзывы о враче</h2>

          {reviews.length === 0 ? (
            <p className="text-[15px] text-ink-2">
              Отзывов об этом враче пока нет.
            </p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <CtaSection />
    </BookingProvider>
  );
}
