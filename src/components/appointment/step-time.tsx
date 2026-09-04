"use client";

import { useAppointment } from "@/stores/appointment-store";
import type { ScheduleDay } from "@/types/schedule";
import { formatDate, weekdayFull } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Сетка времени (раздел 12 ТЗ). Занятое и прошедшее время показано неактивным. */
export function StepTime({ days }: { days: ScheduleDay[] }) {
  const { draft, setTime } = useAppointment();
  const day = days.find((item) => item.date === draft.date);

  if (!day) {
    return (
      <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
        Сначала выберите дату.
      </p>
    );
  }

  const morning = day.slots.filter((slot) => slot.minutes < 12 * 60);
  const afternoon = day.slots.filter(
    (slot) => slot.minutes >= 12 * 60 && slot.minutes < 17 * 60,
  );
  const evening = day.slots.filter((slot) => slot.minutes >= 17 * 60);

  const groups = [
    { title: "Утро", slots: morning },
    { title: "День", slots: afternoon },
    { title: "Вечер", slots: evening },
  ].filter((group) => group.slots.length > 0);

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Выбор времени</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">Во сколько?</h2>
        <p className="text-[15px] text-ink-2">
          {weekdayFull(day.dayOfWeek)}, {formatDate(day.date)} — свободно{" "}
          <span className="tabular">{day.freeCount}</span> из{" "}
          <span className="tabular">{day.slots.length}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
              {group.title}
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
              {group.slots.map((slot) => {
                const selected = draft.time === slot.label;
                const disabled = slot.state !== "free";

                return (
                  <button
                    key={slot.minutes}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTime(slot.label)}
                    aria-pressed={selected}
                    className={cn(
                      "h-11 rounded-lg border text-[14px] transition-colors tabular",
                      selected && "border-accent bg-accent text-white",
                      !selected &&
                        !disabled &&
                        "border-line bg-paper text-ink hover:border-accent-line hover:bg-accent-soft hover:text-accent",
                      disabled &&
                        "border-transparent bg-mist text-ink-3/60 line-through",
                    )}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {day.freeCount === 0 && (
        <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
          В этот день всё занято. Выберите другую дату — вернуться можно шагом
          назад.
        </p>
      )}
    </fieldset>
  );
}
