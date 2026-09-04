"use client";

import Image from "next/image";
import { Check, Users } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import type { Doctor } from "@/types/doctor";
import { pluralYears } from "@/lib/format";
import { cn } from "@/lib/cn";

export function StepDoctor({ doctors }: { doctors: Doctor[] }) {
  const { draft, setDoctor } = useAppointment();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Выбор врача</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">К какому врачу?</h2>
        <p className="text-[15px] text-ink-2">
          Показаны специалисты, которые ведут выбранное направление.
        </p>
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
            Любой подходящий врач
          </span>
          <span className="text-[13px] text-ink-2">
            Подберём специалиста под выбранное время
          </span>
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
                <span className="text-[13px] text-accent">{doctor.specialty}</span>
                <span className="text-[12px] text-ink-3 tabular">
                  стаж {pluralYears(doctor.experience)}
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
          По этому направлению пока нет закреплённого врача. Выберите «любой
          подходящий врач» — мы подберём специалиста и перезвоним.
        </p>
      )}
    </fieldset>
  );
}
