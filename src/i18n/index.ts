import { ru } from "./ru";
import { uz } from "./uz";
import type { Locale } from "./config";

export type { Dictionary } from "./ru";
export * from "./config";

const dictionaries = { ru, uz };

/** Словарь интерфейса для нужного языка. */
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

/**
 * Подставляет значения в шаблон: `fill("Свободно {n}", { n: 5 })`.
 * Намеренно простая замена — в текстах сайта нет ни склонений по числу,
 * ни вложенной разметки, ради которых стоило бы тянуть библиотеку.
 */
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
