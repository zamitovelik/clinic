"use client";

import { AlertCircle, Loader2, Pencil } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";
import { formatDate, weekdayFull } from "@/i18n/format";
import { isoDayOfWeek, instantFromTashkent } from "@/lib/time";
import type { BookingDoctor, BookingService } from "@/types/booking";
import type { Dictionary } from "@/i18n";

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
  const { dict } = useI18n();

  const service = services.find((item) => item.slug === draft.serviceSlug);
  const doctor = doctors.find((item) => item.slug === draft.doctorSlug);

  const rows = [
    { label: dict.stepConfirm.service, value: service?.title ?? "—", step: 1 },
    {
      label: dict.stepConfirm.doctor,
      value: draft.anyDoctor
        ? dict.stepDoctor.any
        : (doctor?.name ?? "—"),
      step: 2,
    },
    {
      label: dict.stepConfirm.date,
      value: draft.date
        ? `${formatDate(draft.date, dict)}, ${weekdayFull(
            isoDayOfWeek(instantFromTashkent(draft.date, 720)),
            dict,
          ).toLowerCase()}`
        : "—",
      step: 3,
    },
    { label: dict.stepConfirm.time, value: draft.time ?? "—", step: 3 },
    { label: dict.stepConfirm.patient, value: draft.patientName || "—", step: 4 },
    { label: dict.stepConfirm.phone, value: draft.patientPhone || "—", step: 4 },
  ];

  const canEdit = (step: number) =>
    editableSteps === undefined || editableSteps.includes(step);

  /** Код ошибки от слоя данных превращается в текст здесь. */
  const errorText =
    error && error in dict.validation
      ? dict.validation[error as keyof Dictionary["validation"]]
      : error
        ? dict.validation.failed
        : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">
          {dict.stepConfirm.title}
        </h2>
        <p className="text-[15px] text-ink-2">
          {editableSteps === undefined
            ? dict.stepConfirm.hintAll
            : dict.stepConfirm.hintLimited}
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
                aria-label={`${dict.stepConfirm.edit}: ${row.label.toLowerCase()}`}
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
          <p className="mb-1 text-[13px] text-ink-3">{dict.stepConfirm.comment}</p>
          <p className="text-[15px] text-ink">{draft.comment}</p>
        </div>
      )}

      {errorText && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-card bg-danger-soft px-4 py-3 text-[14px] text-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {errorText}
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
        {dict.stepConfirm.submit}
      </Button>

      <p className="text-[13px] leading-relaxed text-ink-3">
        {dict.stepConfirm.consent}
      </p>
    </div>
  );
}
