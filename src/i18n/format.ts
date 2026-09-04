import type { Dictionary } from "./ru";
import type { Locale } from "./config";

/**
 * Форматирование дат и чисел с учётом языка.
 *
 * Названия месяцев и дней недели живут в словаре, поэтому здесь остаётся
 * только логика. Русский требует выбора формы слова по числу, узбекский —
 * нет, и это учтено в самих словарях: там все три формы одинаковы.
 */

/** Правильная форма русского слова при числе: 1 год, 2 года, 5 лет. */
export function plural(count: number, forms: readonly string[]): string {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export function pluralYears(count: number, dict: Dictionary): string {
  return `${count} ${plural(count, dict.units.years)}`;
}

/** `2026-09-12` → `12 сентября` / `12 sentabr`. */
export function formatDate(dateKey: string, dict: Dictionary): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const name = dict.calendar.monthsGenitive[month - 1];
  const suffix = year !== new Date().getFullYear() ? ` ${year}` : "";
  return `${day} ${name}${suffix}`;
}

/** `2026-09-12` → `12 сентября 2026`. Для отзывов, где год важен. */
export function formatDateFull(dateKey: string, dict: Dictionary): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return `${day} ${dict.calendar.monthsGenitive[month - 1]} ${year}`;
}

/** `2026-09` → `Сентябрь 2026` / `Sentabr 2026`. */
export function formatMonth(monthKey: string, dict: Dictionary): string {
  const [year, month] = monthKey.split("-").map(Number);
  return `${dict.calendar.monthsNominative[month - 1]} ${year}`;
}

/** Номер дня недели по ISO (1–7) → «Пн» / «Du». */
export function weekdayShort(isoDay: number, dict: Dictionary): string {
  return dict.calendar.weekdaysShort[isoDay - 1] ?? "";
}

export function weekdayFull(isoDay: number, dict: Dictionary): string {
  return dict.calendar.weekdaysFull[isoDay - 1] ?? "";
}

/** Языковая метка для атрибута lang и разметки. */
export function htmlLang(locale: Locale): string {
  return locale;
}
