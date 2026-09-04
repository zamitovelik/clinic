"use client";

import { Check } from "lucide-react";
import { STEPS, useAppointment } from "@/stores/appointment-store";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

/**
 * Индикатор шагов. Пройденные шаги кликабельны — вернуться и поменять
 * услугу или врача нужно уметь без прохождения мастера заново.
 */
export function Stepper() {
  const { step, maxReachableStep, goTo } = useAppointment();
  const { dict } = useI18n();

  return (
    <nav aria-label={dict.booking.stepsNav}>
      {/* На узком экране подписи скрыты, а отступы ужаты, чтобы все шесть
          шагов помещались в одну строку и индикатор не разъезжался. */}
      <ol className="flex items-center gap-0.5 sm:gap-1">
        {STEPS.map((item, index) => {
          const done = item.id < step;
          const current = item.id === step;
          const reachable = item.id <= maxReachableStep;

          return (
            <li key={item.id} className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => reachable && goTo(item.id)}
                disabled={!reachable}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-pill px-1 py-1.5 text-[13px] transition-colors sm:px-2.5",
                  current && "bg-accent-soft text-accent",
                  !current && done && "text-ink-2 hover:bg-milk",
                  !current && !done && "text-ink-3",
                  reachable && !current && "cursor-pointer",
                  !reachable && "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] tabular",
                    current && "border-accent bg-accent text-white",
                    done && !current && "border-accent-line bg-accent-soft text-accent",
                    !current && !done && "border-line text-ink-3",
                  )}
                >
                  {done ? <Check className="h-3 w-3" aria-hidden /> : item.id}
                </span>
                <span className="hidden sm:inline">{dict.steps[item.key]}</span>
              </button>

              {index < STEPS.length - 1 && (
                <span aria-hidden className="h-px w-2 shrink-0 bg-line sm:w-5" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
