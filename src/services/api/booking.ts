import { getScheduleByDoctor } from "@/data/schedule";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import type { BookingData } from "@/types/booking";
import { pick, type Locale } from "@/i18n/config";

/**
 * Данные для записи к врачу.
 *
 * Тексты отдаются уже на нужном языке: окно записи открывается на клиенте,
 * и возить туда оба перевода незачем.
 *
 * Занятые слоты намеренно не заполняются: пока их источник — демонстрационный
 * генератор, и повторять его результат в разметке каждой карточки нет смысла.
 * Окно записи восстановит их при открытии. Когда появится CRM, поле
 * `bookedSlots` будет приходить заполненным отсюда, и окно возьмёт его как
 * есть — менять ничего не придётся.
 */
export function getBookingData(
  doctorSlug: string,
  locale: Locale,
): BookingData | null {
  const doctor = doctors.find((item) => item.slug === doctorSlug);
  const schedule = getScheduleByDoctor(doctorSlug);
  if (!doctor || !schedule) return null;

  return {
    doctor: {
      slug: doctor.slug,
      name: doctor.name,
      specialty: pick(doctor.specialty, locale),
      photo: doctor.photo,
    },
    schedule: { ...schedule, workingDays: [...schedule.workingDays] },
    services: services
      .filter((service) => doctor.serviceSlugs.includes(service.slug))
      .map((service) => ({
        slug: service.slug,
        title: pick(service.title, locale),
      })),
  };
}

/** Данные для записи сразу к нескольким врачам — для списков и главной. */
export function getBookingDataFor(
  doctorSlugs: string[],
  locale: Locale,
): BookingData[] {
  return doctorSlugs
    .map((slug) => getBookingData(slug, locale))
    .filter((item): item is BookingData => item !== null);
}
