"use client";

import { useId, useState } from "react";
import { useAppointment } from "@/stores/appointment-store";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";
import {
  ERROR_LIMITS,
  formatPhone,
  phoneDigits,
  validatePatient,
  type PatientErrorCode,
  type PatientErrors,
} from "@/lib/validation";
import { cn } from "@/lib/cn";

/** Шаг с данными пациента и проверкой полей (разделы 12 и 26 ТЗ). */
export function StepPatient() {
  const { draft, setPatient, goTo } = useAppointment();
  const { dict } = useI18n();
  const [errors, setErrors] = useState<PatientErrors>({});
  const nameId = useId();
  const phoneId = useId();
  const commentId = useId();

  /** Код ошибки превращается в текст только здесь, на нужном языке. */
  function message(code: PatientErrorCode): string {
    const limit = ERROR_LIMITS[code];
    const template = dict.validation[code];
    return limit === undefined ? template : fill(template, { max: limit });
  }

  /** Сбрасывает ошибку поля, как только человек начал его исправлять. */
  function update(patch: Partial<typeof draft>, field: keyof PatientErrors) {
    setPatient(patch);
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();

    const found = validatePatient({
      patientName: draft.patientName,
      patientPhone: draft.patientPhone,
      comment: draft.comment,
    });

    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setErrors({});
    goTo(6);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">
          {dict.stepPatient.title}
        </h2>
        <p className="text-[15px] text-ink-2">{dict.stepPatient.subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field
          id={nameId}
          label={dict.stepPatient.name}
          required
          error={errors.patientName && message(errors.patientName)}
          hint={dict.stepPatient.nameHint}
        >
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            value={draft.patientName}
            onChange={(event) =>
              update({ patientName: event.target.value }, "patientName")
            }
            aria-invalid={Boolean(errors.patientName)}
            aria-describedby={errors.patientName ? `${nameId}-error` : undefined}
            className={cn(
              "h-12 w-full rounded-lg border bg-paper px-4 text-[15px] text-ink",
              errors.patientName ? "border-danger" : "border-line",
            )}
          />
        </Field>

        <Field
          id={phoneId}
          label={dict.stepPatient.phone}
          required
          error={errors.patientPhone && message(errors.patientPhone)}
          hint={dict.stepPatient.phoneHint}
        >
          <input
            id={phoneId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.patientPhone}
            placeholder="+998 90 123 45 67"
            // Номер форматируется по мере ввода: так видно, сколько цифр
            // осталось, и меньше опечаток.
            onChange={(event) => {
              const digits = phoneDigits(event.target.value).slice(0, 12);
              update({ patientPhone: formatPhone(digits) }, "patientPhone");
            }}
            aria-invalid={Boolean(errors.patientPhone)}
            aria-describedby={errors.patientPhone ? `${phoneId}-error` : undefined}
            className={cn(
              "h-12 w-full rounded-lg border bg-paper px-4 text-[15px] text-ink tabular",
              errors.patientPhone ? "border-danger" : "border-line",
            )}
          />
        </Field>

        <Field
          id={commentId}
          label={dict.stepPatient.comment}
          error={errors.comment && message(errors.comment)}
          hint={dict.stepPatient.commentHint}
        >
          <textarea
            id={commentId}
            rows={4}
            value={draft.comment}
            onChange={(event) => update({ comment: event.target.value }, "comment")}
            aria-invalid={Boolean(errors.comment)}
            aria-describedby={errors.comment ? `${commentId}-error` : undefined}
            className={cn(
              "w-full resize-y rounded-lg border bg-paper px-4 py-3 text-[15px] text-ink",
              errors.comment ? "border-danger" : "border-line",
            )}
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="self-start">
        {dict.stepPatient.submit}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="text-[13px] text-ink-3">{hint}</p>
      )}
    </div>
  );
}
