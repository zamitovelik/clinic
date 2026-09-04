"use client";

import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";
import { formatDate, weekdayFull } from "@/i18n/format";
import type { ScheduleDay } from "@/types/schedule";
import { cn } from "@/lib/cn";

/**
 * Сетка времени на выбранный день.
 *
 * Занятое время показано зачёркнутым, а не спрятано: так видно, что день
 * плотный, а не что у врача почти нет приёмов. Прошедшее время убирается
 * совсем — выбрать его нельзя никогда, и на сегодняшний день оно занимало
 * бо́льшую часть сетки, мешая разглядеть свободные часы.
 */
export function TimeGrid({
  day,
  selected,
  onSelect,
}: {
  day: ScheduleDay | undefined;
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  const { dict } = useI18n();

  if (!day) {
    return (
      <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
        {dict.stepTime.chooseDate}
      </p>
    );
  }

  const slots = day.slots.filter((slot) => slot.state !== "past");

  const groups = [
    {
      title: dict.stepTime.morning,
      slots: slots.filter((slot) => slot.minutes < 12 * 60),
    },
    {
      title: dict.stepTime.day,
      slots: slots.filter(
        (slot) => slot.minutes >= 12 * 60 && slot.minutes < 17 * 60,
      ),
    },
    {
      title: dict.stepTime.evening,
      slots: slots.filter((slot) => slot.minutes >= 17 * 60),
    },
  ].filter((group) => group.slots.length > 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
          {dict.stepTime.heading}
        </h3>
        <p aria-live="polite" className="text-[15px] text-ink-2">
          {fill(dict.stepTime.summary, {
            weekday: weekdayFull(day.dayOfWeek, dict),
            date: formatDate(day.date, dict),
            free: day.freeCount,
            total: slots.length,
          })}
        </p>
      </div>

      {day.freeCount === 0 ? (
        <p className="rounded-card border border-dashed border-line-strong p-6 text-center text-sm text-ink-2">
          {dict.stepTime.allBooked}
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-2.5">
              <h4 className="text-[12px] font-medium tracking-wide text-ink-3 uppercase">
                {group.title}
              </h4>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {group.slots.map((slot) => {
                  const isSelected = selected === slot.label;
                  const disabled = slot.state !== "free";

                  return (
                    <button
                      key={slot.minutes}
                      type="button"
                      disabled={disabled}
                      onClick={() => onSelect(slot.label)}
                      aria-pressed={isSelected}
                      className={cn(
                        "h-11 rounded-lg border text-[14px] transition-colors tabular",
                        isSelected && "border-accent bg-accent text-white",
                        !isSelected &&
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
      )}
    </div>
  );
}
