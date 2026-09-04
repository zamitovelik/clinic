"use client";

import { AlertCircle, Loader2, Pencil } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import { Button } from "@/components/ui/button";
import type { BookingDoctor, BookingService } from "@/types/booking";
import { formatDate, weekdayFull } from "@/lib/format";
import { isoDayOfWeek } from "@/lib/time";
import { instantFromTashkent } from "@/lib/time";

/** Экран подтверждения: всё, что выбрал пациент, одним списком (раздел 12 ТЗ). */
export function StepConfirm({
  services,
  doctors,
  editableSteps,
}: {
  /** Достаточно названий: карточка подтверждения показывает только их. */
  services: BookingService[];
  doctors: Pick<BookingDoctor, "slug" | "name">[];
  /**
   * Какие строки можно править прямо отсюда. При записи к конкретному врачу
   * шагов выбора услуги и врача в мастере нет, поэтому карандаш рядом с ними
   * никуда бы не вёл.
   */
  editableSteps?: number[];
}) {
  const { draft, submit, submitting, error, goTo } = useAppointment();

  const service = services.find((item) => item.slug === draft.serviceSlug);
  const doctor = doctors.find((item) => item.slug === draft.doctorSlug);

  const rows = [
    { label: "Услуга", value: service?.title ?? "—", step: 1 },
    {
      label: "Врач",
      value: draft.anyDoctor ? "Любой подходящий врач" : (doctor?.name ?? "—"),
      step: 2,
    },
    {
      label: "Дата",
      value: draft.date
        ? `${formatDate(draft.date)}, ${weekdayFull(isoDayOfWeek(instantFromTashkent(draft.date, 720))).toLowerCase()}`
        : "—",
      step: 3,
    },
    { label: "Время", value: draft.time ?? "—", step: 4 },
    { label: "Пациент", value: draft.patientName || "—", step: 5 },
    { label: "Телефон", value: draft.patientPhone || "—", step: 5 },
  ];

  const canEdit = (step: number) =>
    editableSteps === undefined || editableSteps.includes(step);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">Проверьте запись</h2>
        <p className="text-[15px] text-ink-2">
          {editableSteps === undefined
            ? "Любой пункт можно изменить — нажмите на карандаш рядом с ним."
            : "Дату, время и ваши данные можно изменить — нажмите на карандаш рядом с пунктом."}
        </p>
      </div>

      <dl className="overflow-hidden rounded-card border border-line bg-paper">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
          >
            <dt className="w-24 shrink-0 text-[13px] text-ink-3">{row.label}</dt>
            <dd className="min-w-0 flex-1 text-[15px] break-words text-ink">
              {row.value}
            </dd>
            {canEdit(row.step) && (
              <button
                type="button"
                onClick={() => goTo(row.step)}
                aria-label={`Изменить: ${row.label.toLowerCase()}`}
                className="shrink-0 rounded-pill p-2 text-ink-3 transition-colors hover:bg-milk hover:text-accent"
              >
                <Pencil className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        ))}
      </dl>

      {draft.comment && (
        <div className="rounded-card border border-line bg-milk p-5">
          <p className="mb-1 text-[13px] text-ink-3">Комментарий</p>
          <p className="text-[15px] text-ink">{draft.comment}</p>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-card bg-danger-soft px-4 py-3 text-[14px] text-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <Button
        type="button"
        size="lg"
        onClick={submit}
        disabled={submitting}
        className="self-start"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Подтвердить запись
      </Button>

      <p className="text-[13px] leading-relaxed text-ink-3">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        для записи на приём.
      </p>
    </div>
  );
}
