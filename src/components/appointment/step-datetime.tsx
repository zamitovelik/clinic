"use client";

import { useEffect, useRef } from "react";
import { DatePicker } from "./date-picker";
import { TimeGrid } from "./time-grid";
import { useAppointment } from "@/stores/appointment-store";
import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";
import { pluralDays } from "@/i18n/format";
import type { ScheduleDay } from "@/types/schedule";

/**
 * Выбор даты и времени — один шаг (разделы 12 и 31 ТЗ).
 *
 * В ТЗ это два отдельных шага, но на практике так искать неудобно: чтобы
 * увидеть свободные часы, приходилось выбрать день, уйти на другой экран,
 * вернуться и ткнуть в следующий. Человек перебирал числа вслепую. Здесь
 * календарь и время стоят рядом: выбрал день — часы появились сразу.
 *
 * Ближайший свободный день подставляется сам, поэтому время видно ещё до
 * первого клика. Запись при этом не создаётся: дальше шага не пустит, пока
 * человек не выберет час осознанно.
 */
export function StepDateTime({ days }: { days: ScheduleDay[] }) {
  const { draft, setDate, setTime } = useAppointment();
  const { dict } = useI18n();
  const timesRef = useRef<HTMLDivElement>(null);

  const firstAvailable = days.find(
    (day) => day.isWorking && day.freeCount > 0,
  )?.date;

  // Подставляем ближайший свободный день, если человек ещё ничего не выбрал.
  useEffect(() => {
    if (!draft.date && firstAvailable) setDate(firstAvailable);
  }, [draft.date, firstAvailable, setDate]);

  const day = days.find((item) => item.date === draft.date);

  function chooseDate(date: string) {
    setDate(date);

    // На узком экране список времени уходит под календарь — подводим к нему,
    // иначе выбор дня выглядит так, будто ничего не произошло.
    requestAnimationFrame(() => {
      const element = timesRef.current;
      if (!element) return;
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">{dict.stepDate.legend}</legend>

      <div className="flex flex-col gap-2">
        <h2 className="display text-[26px] sm:text-[32px]">
          {dict.stepDate.title}
        </h2>
        <p className="text-[15px] text-ink-2">
          {fill(dict.stepDate.subtitle, {
            days: pluralDays(days.length, dict),
          })}
        </p>
      </div>

      {/* На широком экране календарь и часы стоят рядом: видно и то, и другое
          без прокрутки. На узком — друг под другом. */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
        <DatePicker days={days} selected={draft.date} onSelect={chooseDate} />

        <div ref={timesRef} className="scroll-mt-24">
          <TimeGrid day={day} selected={draft.time} onSelect={setTime} />
        </div>
      </div>
    </fieldset>
  );
}
