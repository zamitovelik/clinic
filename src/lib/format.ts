/** Правильная форма русского слова при числе: 1 год, 2 года, 5 лет. */
export function plural(
  count: number,
  forms: [one: string, few: string, many: string],
): string {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export function pluralYears(count: number): string {
  return `${count} ${plural(count, ["год", "года", "лет"])}`;
}

export function pluralReviews(count: number): string {
  return `${count} ${plural(count, ["отзыв", "отзыва", "отзывов"])}`;
}

const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const WEEKDAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const WEEKDAYS_FULL = [
  "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье",
];

/** `2026-09-12` → `12 сентября`. */
export function formatDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return `${day} ${MONTHS_GENITIVE[month - 1]}${year !== new Date().getFullYear() ? ` ${year}` : ""}`;
}

/** `2026-09-12` → `12 сентября 2026`. Для отзывов, где год важен. */
export function formatDateFull(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return `${day} ${MONTHS_GENITIVE[month - 1]} ${year}`;
}

/** Номер дня недели по ISO (1–7) → «Пн». */
export function weekdayShort(isoDay: number): string {
  return WEEKDAYS_SHORT[isoDay - 1] ?? "";
}

export function weekdayFull(isoDay: number): string {
  return WEEKDAYS_FULL[isoDay - 1] ?? "";
}

/** Только число месяца — для клеток календаря. */
export function dayNumber(dateKey: string): number {
  return Number(dateKey.split("-")[2]);
}

const MONTHS_NOMINATIVE = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

/** `2026-09` → `Сентябрь 2026`. */
export function formatMonth(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return `${MONTHS_NOMINATIVE[month - 1]} ${year}`;
}

/** `2026-09-12` → `2026-09`. */
export function monthKeyOf(dateKey: string): string {
  return dateKey.slice(0, 7);
}

/** Сдвиг месяца: `2026-12` + 1 → `2027-01`. */
export function shiftMonth(monthKey: string, delta: number): string {
  const [year, month] = monthKey.split("-").map(Number);
  const total = year * 12 + (month - 1) + delta;
  const nextYear = Math.floor(total / 12);
  const nextMonth = (total % 12) + 1;
  return `${nextYear}-${String(nextMonth).padStart(2, "0")}`;
}

/** Сколько дней в месяце `2026-09`. */
export function daysInMonth(monthKey: string): number {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** День недели по ISO (1 — понедельник) для первого числа месяца. */
export function firstWeekdayOfMonth(monthKey: string): number {
  const [year, month] = monthKey.split("-").map(Number);
  const day = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  return day === 0 ? 7 : day;
}
