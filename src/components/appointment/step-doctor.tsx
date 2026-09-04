"use client";

import Image from "next/image";
import { Check, Users } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import { useI18n } from "@/i18n/context";
import { pick } from "@/i18n";
import { pluralYears } from "@/i18n/format";
import type { Doctor } from "@/types/doctor";
import { cn } from "@/lib/cn";

export function StepDoctor({ doctors }: { doctors: Doctor[] }) {
  const { draft, setDoctor } = useAppointment();
  const { dict, locale } = useI18n();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">{dict.stepDoctor.legend}</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">
          {dict.stepDoctor.title}
        </h2>
        <p className="text-[15px] text-ink-2">{dict.stepDoctor.subtitle}</p>
      </div>

      {/* «Любой подходящий врач» стоит первым: этот вариант выбирают чаще,
          когда конкретного специалиста ещё не знают. */}
      <button
        type="button"
        onClick={() => setDoctor(null, true)}
        aria-pressed={draft.anyDoctor}
        className={cn(
          "flex items-center gap-4 rounded-card border p-5 text-left transition-colors",
          draft.anyDoctor
            ? "border-accent bg-accent-soft"
            : "border-line bg-paper hover:border-accent-line hover:bg-accent-soft/40",
        )}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Users className="h-5 w-5" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[16px] font-medium text-ink">
            {dict.stepDoctor.any}
          </span>
          <span className="text-[13px] text-ink-2">{dict.stepDoctor.anyHint}</span>
        </span>
        {draft.anyDoctor && (
          <Check className="ml-auto h-5 w-5 shrink-0 text-accent" aria-hidden />
        )}
      </button>

      <div className="grid gap-3 sm:grid-cols-2">
        {doctors.map((doctor) => {
          const selected = draft.doctorSlug === doctor.slug && !draft.anyDoctor;

          return (
            <button
              key={doctor.slug}
              type="button"
              onClick={() => setDoctor(doctor.slug)}
              aria-pressed={selected}
              className={cn(
                "flex items-center gap-4 rounded-card border p-4 text-left transition-colors",
                selected
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-paper hover:border-accent-line hover:bg-accent-soft/40",
              )}
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-card bg-mist">
                <Image
                  src={doctor.photo}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>

              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-[15px] font-medium text-ink">
                  {doctor.name}
                </span>
                <span className="text-[13px] text-accent">
                  {pick(doctor.specialty, locale)}
                </span>
                <span className="text-[12px] text-ink-3 tabular">
                  {dict.stepDoctor.experience} {pluralYears(doctor.experience, dict)}
                </span>
              </span>

              {selected && (
                <Check className="ml-auto h-5 w-5 shrink-0 text-accent" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {doctors.length === 0 && (
        <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
          {dict.stepDoctor.empty}
        </p>
      )}
    </fieldset>
  );
}
