import type { Metadata } from "next";
import { DoctorCard } from "@/components/shared/doctor-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { BookingProvider } from "@/components/appointment/booking-provider";
import { getBookingDataFor, getDoctors } from "@/services/api";
import { getDictionary, localizedPath, locales, type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.doctorsTitle,
    description: dict.meta.doctorsDescription,
    alternates: {
      canonical: localizedPath("/doctors", locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath("/doctors", item)]),
      ),
    },
  };
}

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const doctors = await getDoctors();
  const bookings = getBookingDataFor(
    doctors.map((doctor) => doctor.slug),
    locale,
  );

  return (
    <BookingProvider bookings={bookings}>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">{dict.doctorsPage.eyebrow}</p>
          <h1 className="display text-[36px] sm:text-[50px]">
            {dict.doctorsPage.title}
          </h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            {dict.doctorsPage.description}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 50} className="h-full">
              <DoctorCard doctor={doctor} locale={locale} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection locale={locale} />
    </BookingProvider>
  );
}
