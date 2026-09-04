import { company } from "@/data/company";
import type { Doctor } from "@/types/doctor";

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

export function ClinicStructuredData() {
  const openingHours = company.workingHours
    .filter((day) => day.hours !== "Выходной")
    .map((day) => {
      const [opens, closes] = day.hours.split(" — ");
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
        url: siteUrl,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: company.city,
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

export function DoctorStructuredData({ doctor }: { doctor: Doctor }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Physician",
        name: doctor.name,
        url: `${siteUrl}/doctors/${doctor.slug}`,
        image: `${siteUrl}${doctor.photo}`,
        medicalSpecialty: "Dentistry",
        jobTitle: doctor.specialty,
        worksFor: { "@type": "Dentist", name: company.name },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: company.city,
          addressCountry: "UZ",
        },
      }}
    />
  );
}
