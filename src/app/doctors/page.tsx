import type { Metadata } from "next";
import { DoctorCard } from "@/components/shared/doctor-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { BookingProvider } from "@/components/appointment/booking-provider";
import { getBookingDataFor, getDoctors } from "@/services/api";

export const metadata: Metadata = {
  title: "Врачи",
  description:
    "Специалисты клиники Dentos Medical в Ташкенте: терапевты, хирург-имплантолог, ортодонт, ортопед, детский стоматолог и гигиенист. Онлайн-запись к врачу.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  const bookings = getBookingDataFor(doctors.map((doctor) => doctor.slug));

  return (
    <BookingProvider bookings={bookings}>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">Специалисты</p>
          <h1 className="display text-[36px] sm:text-[50px]">
            Врачи, которым доверяют
          </h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            У каждого специалиста своя страница: биография, образование,
            сертификаты, отзывы и график приёма. Записаться можно к конкретному
            врачу — или выбрать любого подходящего при записи.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 50} className="h-full">
              <DoctorCard doctor={doctor} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </BookingProvider>
  );
}
