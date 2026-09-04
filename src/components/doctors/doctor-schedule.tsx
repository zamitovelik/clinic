import { CalendarDays } from "lucide-react";
import {
  BookingTrigger,
  SlotTrigger,
} from "@/components/appointment/booking-trigger";
import { minutesToLabel } from "@/lib/time";
import { getDictionary, type Locale } from "@/i18n";
import { formatDate, weekdayFull, weekdayShort } from "@/i18n/format";
import type { DoctorSchedule as Schedule, ScheduleDay } from "@/types/schedule";
import { cn } from "@/lib/cn";

/**
 * График приёма врача (раздел 11 ТЗ).
 *
 * Две части: постоянные часы работы по дням недели и ближайшие дни с реальным
 * количеством свободного времени. Логика расчёта слотов лежит в `lib/schedule`,
 * компонент только показывает готовые данные.
 */
export function DoctorScheduleBlock({
  doctorSlug,
  schedule,
  days,
  locale,
}: {
  doctorSlug: string;
  schedule: Schedule;
  days: ScheduleDay[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const byWeekday = new Map(
    schedule.workingDays.map((day) => [day.dayOfWeek, day]),
  );

  // Показываем только дни, когда врач принимает и есть свободное время.
  const upcoming = days
    .filter((day) => day.isWorking && day.freeCount > 0)
    .slice(0, 6);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="display text-[28px] sm:text-[34px]">{dict.schedule.title}</h2>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-paper p-6">
          <h3 className="mb-4 text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
            {dict.schedule.workingHours}
          </h3>

          <ul className="flex flex-col">
            {[1, 2, 3, 4, 5, 6, 7].map((dayOfWeek) => {
              const workingDay = byWeekday.get(dayOfWeek);

              return (
                <li
                  key={dayOfWeek}
                  className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                >
                  <span className="text-sm text-ink-2">
                    {weekdayFull(dayOfWeek, dict)}
                  </span>
                  <span
                    className={cn(
                      "text-sm tabular",
                      workingDay ? "text-ink" : "text-ink-3",
                    )}
                  >
                    {workingDay
                      ? `${minutesToLabel(workingDay.startsAt)} — ${minutesToLabel(workingDay.endsAt)}`
                      : dict.schedule.notWorking}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-milk p-6">
          <h3 className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
            {dict.schedule.nearestFree}
          </h3>

          {upcoming.length === 0 ? (
            <p className="text-sm text-ink-2">{dict.schedule.noFree}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {upcoming.map((day) => {
                const free = day.slots.filter((slot) => slot.state === "free");

                return (
                  <li
                    key={day.date}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg bg-paper px-3.5 py-2.5"
                  >
                    <span className="flex min-w-[110px] items-baseline gap-1.5 text-sm">
                      <span className="font-medium text-ink">
                        {formatDate(day.date, dict)}
                      </span>
                      <span className="text-ink-3">
                        {weekdayShort(day.dayOfWeek, dict)}
                      </span>
                    </span>

                    <span className="flex flex-wrap gap-1.5">
                      {free.slice(0, 4).map((slot) => (
                        <SlotTrigger
                          key={slot.minutes}
                          doctorSlug={doctorSlug}
                          date={day.date}
                          time={slot.label}
                        />
                      ))}
                      {free.length > 4 && (
                        <span className="px-1 py-0.5 text-[13px] text-ink-3 tabular">
                          +{free.length - 4}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <BookingTrigger
            doctorSlug={doctorSlug}
            size="md"
            className="mt-auto self-start"
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            {dict.schedule.allDates}
          </BookingTrigger>
        </div>
      </div>
    </section>
  );
}
