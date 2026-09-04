"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppointment } from "@/stores/appointment-store";
import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";
import { formatMonth, weekdayShort } from "@/i18n/format";
import type { ScheduleDay } from "@/types/schedule";
import {
  daysInMonth,
  firstWeekdayOfMonth,
  monthKeyOf,
  shiftMonth,
} from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Календарь выбора даты (раздел 12 ТЗ).
 *
 * Показывает месяц целиком, но выбрать можно только дни внутри горизонта
 * записи, в которые врач принимает и есть свободное время. Остальные дни
 * видны, но недоступны — так пациент понимает, что расписание существует,
 * а не что календарь сломан.
 */
export function StepDate({ days }: { days: ScheduleDay[] }) {
  const { draft, setDate } = useAppointment();
  const { dict } = useI18n();

  const byDate = useMemo(
    () => new Map(days.map((day) => [day.date, day])),
    [days],
  );

  const firstDate = days[0]?.date;
  const lastDate = days[days.length - 1]?.date;

  const [month, setMonth] = useState(() =>
    monthKeyOf(draft.date ?? firstDate ?? ""),
  );

  if (!firstDate || !lastDate) {
    return (
      <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
        {dict.stepDate.noSchedule}
      </p>
    );
  }

  const canGoBack = month > monthKeyOf(firstDate);
  const canGoForward = month < monthKeyOf(lastDate);

  const total = daysInMonth(month);
  const leading = firstWeekdayOfMonth(month) - 1;

  const cells: (string | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from(
      { length: total },
      (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`,
    ),
  ];

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">{dict.stepDate.legend}</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">
          {dict.stepDate.title}
        </h2>
        <p className="text-[15px] text-ink-2">
          {fill(dict.stepDate.subtitle, { days: days.length })}
        </p>
      </div>

      <div className="rounded-card border border-line bg-paper p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setMonth(shiftMonth(month, -1))}
            disabled={!canGoBack}
            aria-label={dict.stepDate.prevMonth}
            className="rounded-pill p-2 text-ink-2 transition-colors hover:bg-milk hover:text-ink disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <p aria-live="polite" className="text-[16px] font-medium text-ink">
            {formatMonth(month, dict)}
          </p>

          <button
            type="button"
            onClick={() => setMonth(shiftMonth(month, 1))}
            disabled={!canGoForward}
            aria-label={dict.stepDate.nextMonth}
            className="rounded-pill p-2 text-ink-2 transition-colors hover:bg-milk hover:text-ink disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((isoDay) => (
            <div
              key={isoDay}
              className="pb-2 text-center text-[12px] font-medium text-ink-3"
            >
              {weekdayShort(isoDay, dict)}
            </div>
          ))}

          {cells.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} aria-hidden />;

            const day = byDate.get(date);
            const available = Boolean(day?.isWorking && day.freeCount > 0);
            const selected = draft.date === date;
            const dayNumber = Number(date.slice(8));

            return (
              <button
                key={date}
                type="button"
                disabled={!available}
                onClick={() => setDate(date)}
                aria-pressed={selected}
                aria-label={
                  available
                    ? fill(dict.stepDate.dayFree, {
                        day: dayNumber,
                        count: day?.freeCount ?? 0,
                      })
                    : fill(dict.stepDate.dayBusy, { day: dayNumber })
                }
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg text-[14px] transition-colors tabular",
                  selected && "bg-accent text-white",
                  !selected &&
                    available &&
                    "bg-milk text-ink hover:bg-accent-soft hover:text-accent",
                  !available && "text-ink-3/50",
                )}
              >
                {dayNumber}
                {/* Точка под числом показывает, что в этот день есть время —
                    её видно быстрее, чем цифру количества слотов. */}
                <span
                  aria-hidden
                  className={cn(
                    "h-1 w-1 rounded-full",
                    available
                      ? selected
                        ? "bg-white"
                        : "bg-accent"
                      : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-3">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {dict.stepDate.legendFree}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          {dict.stepDate.legendNone}
        </span>
      </p>
    </fieldset>
  );
}
