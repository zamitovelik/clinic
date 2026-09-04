"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppointment } from "@/stores/appointment-store";
import type { Doctor } from "@/types/doctor";
import type { Service } from "@/types/service";
import { formatDate } from "@/lib/format";
import { company } from "@/data/company";

/** Экран успешной записи (раздел 26 ТЗ). */
export function SuccessScreen({
  services,
  doctors,
}: {
  services: Service[];
  doctors: Doctor[];
}) {
  const { result, reset } = useAppointment();
  if (!result) return null;

  const service = services.find((item) => item.slug === result.serviceSlug);
  const doctor = doctors.find((item) => item.slug === result.doctorSlug);

  const rows = [
    { label: "Врач", value: doctor?.name ?? "Подберём специалиста" },
    { label: "Услуга", value: service?.title ?? "—" },
    { label: "Дата", value: formatDate(result.date) },
    { label: "Время", value: result.time },
  ];

  return (
    <div className="flex flex-col items-center gap-7 py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Check className="h-8 w-8" strokeWidth={1.6} aria-hidden />
      </span>

      <div className="flex flex-col gap-3">
        <h2 className="display text-[32px] sm:text-[40px]">Вы записаны</h2>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
          Мы свяжемся с вами для подтверждения записи по номеру{" "}
          <span className="whitespace-nowrap text-ink tabular">
            {result.patientPhone}
          </span>
          .
        </p>
      </div>

      <dl className="w-full max-w-md overflow-hidden rounded-card border border-line bg-paper text-left">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-4 border-b border-line px-5 py-3.5 last:border-b-0"
          >
            <dt className="w-20 shrink-0 text-[13px] text-ink-3">{row.label}</dt>
            <dd className="text-[15px] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">На главную</Link>
        </Button>
        <Button size="lg" variant="outline" onClick={reset}>
          Записаться ещё раз
        </Button>
      </div>

      <p className="text-[13px] text-ink-3">
        Нужно перенести или отменить приём? Позвоните нам:{" "}
        <a
          href={`tel:${company.phoneRaw}`}
          className="text-accent tabular hover:underline"
        >
          {company.phone}
        </a>
      </p>
    </div>
  );
}
