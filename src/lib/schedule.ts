import {
  BOOKING_HORIZON_DAYS,
  MIN_LEAD_HOURS,
  SLOT_MINUTES,
} from "@/lib/config";
import {
  addDaysToKey,
  dayKey,
  instantFromTashkent,
  isoDayOfWeek,
  minutesToLabel,
} from "@/lib/time";
import type { DoctorSchedule, ScheduleDay, TimeSlot } from "@/types/schedule";

/**
 * Построение сетки приёма.
 *
 * Слоты нигде не хранятся: они целиком выводятся из графика врача и списка
 * занятых времён. Когда появится CRM, изменится только источник `bookedSlots` —
 * сама логика останется прежней, а компоненты её вообще не заметят.
 */

/** Ключ занятого слота: `2026-09-12T09:30`. Тот же формат ждём от CRM. */
export function slotKey(date: string, minutes: number): string {
  return `${date}T${minutesToLabel(minutes)}`;
}

/** Пересекается ли приём [start, start + SLOT) с перерывом [from, to). */
function overlapsBreak(start: number, from?: number, to?: number): boolean {
  if (from === undefined || to === undefined) return false;
  return start < to && start + SLOT_MINUTES > from;
}

/** Сетка времени на один день. */
export function buildScheduleDay(
  schedule: DoctorSchedule,
  date: string,
  now: Date = new Date(),
): ScheduleDay {
  const dayOfWeek = isoDayOfWeek(instantFromTashkent(date, 12 * 60));
  const workingDay = schedule.workingDays.find((d) => d.dayOfWeek === dayOfWeek);
  const isDayOff = schedule.daysOff.includes(date);

  if (!workingDay || isDayOff) {
    return { date, dayOfWeek, isWorking: false, slots: [], freeCount: 0 };
  }

  const booked = new Set(schedule.bookedSlots);
  const earliest = now.getTime() + MIN_LEAD_HOURS * 60 * 60 * 1000;
  const slots: TimeSlot[] = [];

  for (
    let minutes = workingDay.startsAt;
    minutes + SLOT_MINUTES <= workingDay.endsAt;
    minutes += SLOT_MINUTES
  ) {
    if (overlapsBreak(minutes, workingDay.breakStart, workingDay.breakEnd)) {
      continue;
    }

    const startsAt = instantFromTashkent(date, minutes);
    // Прошедшее время и слишком близкие приёмы показываем неактивными,
    // а не прячем: пациент видит весь рабочий день врача.
    const state =
      startsAt.getTime() < earliest
        ? "past"
        : booked.has(slotKey(date, minutes))
          ? "booked"
          : "free";

    slots.push({ minutes, label: minutesToLabel(minutes), state });
  }

  return {
    date,
    dayOfWeek,
    isWorking: true,
    slots,
    freeCount: slots.filter((slot) => slot.state === "free").length,
  };
}

/** Сетка на весь горизонт записи, начиная с сегодняшнего дня. */
export function buildScheduleDays(
  schedule: DoctorSchedule,
  now: Date = new Date(),
  days: number = BOOKING_HORIZON_DAYS,
): ScheduleDay[] {
  const start = dayKey(now);
  return Array.from({ length: days }, (_, index) =>
    buildScheduleDay(schedule, addDaysToKey(start, index), now),
  );
}

/**
 * Демонстрационная занятость.
 *
 * Пока нет CRM, занятые слоты нужно откуда-то взять — иначе календарь выглядит
 * пустым и нерабочим. Берём устойчивый хэш от врача, даты и времени: набор
 * занятых слотов не меняется между отрисовками страницы, но остаётся разным
 * для разных дней и врачей. С подключением CRM функция просто перестанет
 * использоваться.
 */
export function buildDemoBookedSlots(
  doctorSlug: string,
  schedule: DoctorSchedule,
  now: Date = new Date(),
  days: number = BOOKING_HORIZON_DAYS,
): string[] {
  const start = dayKey(now);
  const booked: string[] = [];

  for (let index = 0; index < days; index += 1) {
    const date = addDaysToKey(start, index);
    const dayOfWeek = isoDayOfWeek(instantFromTashkent(date, 12 * 60));
    const workingDay = schedule.workingDays.find((d) => d.dayOfWeek === dayOfWeek);
    if (!workingDay) continue;

    for (
      let minutes = workingDay.startsAt;
      minutes + SLOT_MINUTES <= workingDay.endsAt;
      minutes += SLOT_MINUTES
    ) {
      if (overlapsBreak(minutes, workingDay.breakStart, workingDay.breakEnd)) {
        continue;
      }

      // Ближайшие дни заняты плотнее дальних — так выглядит живая запись.
      const density = index < 3 ? 62 : index < 7 ? 45 : 28;
      if (hash(`${doctorSlug}|${date}|${minutes}`) % 100 < density) {
        booked.push(slotKey(date, minutes));
      }
    }
  }

  return booked;
}

/** Небольшой устойчивый хэш строки (FNV-1a). */
function hash(input: string): number {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

/**
 * Объединяет графики нескольких врачей в один — для варианта
 * «любой подходящий врач». Слот свободен, если он свободен хотя бы у одного.
 */
export function combineScheduleDays(schedules: ScheduleDay[][]): ScheduleDay[] {
  if (schedules.length === 0) return [];
  if (schedules.length === 1) return schedules[0];

  // Берём за основу расписание с самым длинным рабочим днём, иначе часы
  // врача, который работает дольше остальных, потерялись бы.
  const base = schedules.reduce((longest, current) =>
    current.reduce((sum, day) => sum + day.slots.length, 0) >
    longest.reduce((sum, day) => sum + day.slots.length, 0)
      ? current
      : longest,
  );

  return base.map((day, dayIndex) => {
    const sameDay = schedules
      .map((schedule) => schedule[dayIndex])
      .filter((value): value is ScheduleDay => Boolean(value));

    const slots = day.slots.map((slot) => {
      const states = sameDay
        .map((candidate) =>
          candidate.slots.find((item) => item.minutes === slot.minutes)?.state,
        )
        .filter(Boolean);

      const state = states.includes("free")
        ? ("free" as const)
        : states.includes("booked")
          ? ("booked" as const)
          : ("past" as const);

      return { ...slot, state };
    });

    return {
      ...day,
      isWorking: sameDay.some((candidate) => candidate.isWorking),
      slots,
      freeCount: slots.filter((slot) => slot.state === "free").length,
    };
  });
}
