import { company } from "@/data/company";
import type { Doctor } from "@/types/doctor";
import { localizedPath, pick, type Locale } from "@/i18n";

/**
 * Разметка schema.org (раздел 24 ТЗ).
 *
 * Поисковые системы по ней показывают адрес, телефон и часы работы прямо
 * в выдаче. Указываем только то, что действительно известно о клинике —
 * рейтинги и отзывы в разметку не выносим, пока они демонстрационные.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentosmedical.uz";

const DAY_NAMES = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Данные формируются на сервере из наших же файлов, пользовательского
      // ввода здесь нет.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ClinicStructuredData({ locale }: { locale: Locale }) {
  const openingHours = company.workingHours
    .filter((day) => day.hours !== null)
    .map((day) => {
      const [opens, closes] = (day.hours as string).split(" — ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES[day.dayOfWeek - 1],
        opens,
        closes,
      };
    });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Dentist",
        name: company.name,
        url: `${siteUrl}${localizedPath("/", locale)}`,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: pick(company.address, locale),
          addressLocality: pick(company.city, locale),
          addressCountry: "UZ",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: company.coordinates.latitude,
          longitude: company.coordinates.longitude,
        },
        openingHoursSpecification: openingHours,
        sameAs: [company.instagramUrl],
      }}
    />
  );
}

export function DoctorStructuredData({
  doctor,
  locale,
}: {
  doctor: Doctor;
  locale: Locale;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Physician",
        name: doctor.name,
        url: `${siteUrl}${localizedPath(`/doctors/${doctor.slug}`, locale)}`,
        image: `${siteUrl}${doctor.photo}`,
        medicalSpecialty: "Dentistry",
        jobTitle: pick(doctor.specialty, locale),
        worksFor: { "@type": "Dentist", name: company.name },
        address: {
          "@type": "PostalAddress",
          streetAddress: pick(company.address, locale),
          addressLocality: pick(company.city, locale),
          addressCountry: "UZ",
        },
      }}
    />
  );
}
