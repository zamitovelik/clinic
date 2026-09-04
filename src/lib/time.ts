import { TZDate } from "@date-fns/tz";
import { TIMEZONE } from "@/lib/config";

/**
 * Работа со временем платформы.
 *
 * Правило одно: в базе живут только моменты времени в UTC, а всё, что видит
 * пользователь, считается в поясе Asia/Tashkent. Ни один модуль не должен
 * обращаться к локальному времени сервера напрямую — сервер может стоять
 * где угодно.
 */

/** Текущий момент, представленный в ташкентском поясе. */
export function nowTashkent(): TZDate {
  return new TZDate(Date.now(), TIMEZONE);
}

/** Тот же момент времени, но в ташкентском представлении. */
export function toTashkent(instant: Date): TZDate {
  return new TZDate(instant, TIMEZONE);
}

/** Ключ дня в виде `2026-09-04` по ташкентскому календарю. */
export function dayKey(instant: Date): string {
  const d = toTashkent(instant);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

/** День недели по ISO: 1 — понедельник, 7 — воскресенье. */
export function isoDayOfWeek(instant: Date): number {
  const day = toTashkent(instant).getDay();
  return day === 0 ? 7 : day;
}

/** Минуты от полуночи для момента времени в ташкентском поясе. */
export function minutesOfDay(instant: Date): number {
  const d = toTashkent(instant);
  return d.getHours() * 60 + d.getMinutes();
}

/**
 * Момент времени в UTC для ташкентских суток `dayKey` и `minutes` от полуночи.
 * Это единственный способ превратить выбранный пациентом слот в значение,
 * пригодное для записи в базу.
 */
export function instantFromTashkent(dayKey: string, minutes: number): Date {
  const [year, month, day] = dayKey.split("-").map(Number);
  const local = new TZDate(
    year,
    month - 1,
    day,
    Math.floor(minutes / 60),
    minutes % 60,
    0,
    0,
    TIMEZONE,
  );
  return new Date(local.getTime());
}

/** `570` → `09:30`. */
export function minutesToLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** `09:30` → `570`. Возвращает `null`, если строка не похожа на время. */
export function labelToMinutes(label: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(label.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

/** Прибавляет дни к ключу дня, оставаясь в ташкентском календаре. */
export function addDaysToKey(key: string, days: number): string {
  const [year, month, day] = key.split("-").map(Number);
  const shifted = new TZDate(year, month - 1, day + days, 12, 0, 0, 0, TIMEZONE);
  return dayKey(new Date(shifted.getTime()));
}

/** Список ключей дней от сегодняшнего включительно длиной `count`. */
export function dayKeysAhead(count: number, from: Date = new Date()): string[] {
  const start = dayKey(from);
  return Array.from({ length: count }, (_, i) => addDaysToKey(start, i));
}

/** Проверяет, попадает ли день в диапазон исключения расписания. */
export function isDayWithin(key: string, startDate: Date, endDate: Date): boolean {
  return key >= dayKey(startDate) && key <= dayKey(endDate);
}
