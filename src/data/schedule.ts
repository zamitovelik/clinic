import type { DoctorSchedule } from "@/types/schedule";

/**
 * Графики приёма врачей.
 *
 * Логика построения слотов намеренно вынесена из интерфейса (раздел 11 ТЗ):
 * здесь лежат только исходные данные, а сетка времени собирается в
 * `src/lib/schedule.ts`. Когда появится CRM, этот файл заменится ответом
 * `getDoctorSchedule(doctorSlug)` без изменений в компонентах.
 *
 * Поле `bookedSlots` пустое: занятость демонстрационных врачей вычисляется
 * в слое `services/api` и всегда актуальна текущей дате. Настоящие занятые
 * слоты придут из CRM в этом же формате `2026-09-12T09:30`.
 */

const h = (hours: number, minutes = 0) => hours * 60 + minutes;

/** Будни 09:00–19:00 с перерывом 13:00–14:00. */
const weekdays = [1, 2, 3, 4, 5].map((dayOfWeek) => ({
  dayOfWeek,
  startsAt: h(9),
  endsAt: h(19),
  breakStart: h(13),
  breakEnd: h(14),
}));

/** Суббота 10:00–16:00 без перерыва. */
const saturday = { dayOfWeek: 6, startsAt: h(10), endsAt: h(16) };

export const doctorSchedules: DoctorSchedule[] = [
  {
    doctorSlug: "aliyev-rustam",
    workingDays: [...weekdays, saturday],
    daysOff: [],
    bookedSlots: [],
  },
  {
    doctorSlug: "karimova-dilnoza",
    // Детский приём короче и без вечерних часов.
    workingDays: [
      ...[1, 2, 3, 4, 5].map((dayOfWeek) => ({
        dayOfWeek,
        startsAt: h(9),
        endsAt: h(17),
        breakStart: h(13),
        breakEnd: h(14),
      })),
      saturday,
    ],
    daysOff: [],
    bookedSlots: [],
  },
  {
    doctorSlug: "yusupov-timur",
    // Хирургический приём — три дня в неделю.
    workingDays: [1, 3, 5].map((dayOfWeek) => ({
      dayOfWeek,
      startsAt: h(9),
      endsAt: h(18),
      breakStart: h(13),
      breakEnd: h(14),
    })),
    daysOff: [],
    bookedSlots: [],
  },
  {
    doctorSlug: "nigmatova-lola",
    workingDays: [
      ...[2, 3, 4, 5].map((dayOfWeek) => ({
        dayOfWeek,
        startsAt: h(10),
        endsAt: h(19),
        breakStart: h(14),
        breakEnd: h(15),
      })),
      saturday,
    ],
    daysOff: [],
    bookedSlots: [],
  },
  {
    doctorSlug: "sadikov-jasur",
    workingDays: weekdays,
    daysOff: [],
    bookedSlots: [],
  },
  {
    doctorSlug: "abdullayeva-sevara",
    workingDays: [
      ...[1, 2, 3, 4, 5].map((dayOfWeek) => ({
        dayOfWeek,
        startsAt: h(9),
        endsAt: h(18),
      })),
      saturday,
    ],
    daysOff: [],
    bookedSlots: [],
  },
];

export function getScheduleByDoctor(doctorSlug: string): DoctorSchedule | undefined {
  return doctorSchedules.find((item) => item.doctorSlug === doctorSlug);
}
