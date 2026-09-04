"use client";

import { Check } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import type { Service } from "@/types/service";
import { cn } from "@/lib/cn";

export function StepService({ services }: { services: Service[] }) {
  const { draft, setService } = useAppointment();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Выбор услуги</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">Что вас беспокоит?</h2>
        <p className="text-[15px] text-ink-2">
          Выберите направление. Если не уверены — начните с диагностики,
          врач определит объём лечения на приёме.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const selected = draft.serviceSlug === service.slug;

          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => setService(service.slug)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col gap-1.5 rounded-card border p-5 text-left transition-colors",
                selected
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-paper hover:border-accent-line hover:bg-accent-soft/40",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[16px] font-medium text-ink">
                  {service.title}
                </span>
                {selected && (
                  <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                )}
              </span>
              <span className="text-[13px] leading-relaxed text-ink-2">
                {service.summary}
              </span>
              <span className="mt-1 text-[12px] text-ink-3 tabular">
                приём около {service.durationMinutes} минут
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
