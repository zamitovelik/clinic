/**
 * Языки сайта.
 *
 * Русский — язык по умолчанию, поэтому его адреса остаются без префикса:
 * `/doctors`, а не `/ru/doctors`. Узбекская версия живёт по `/uz/...`.
 * Подмену корневых адресов на русскую версию делает middleware.
 *
 * Узбекский — на латинице: это письменность, принятая в Узбекистане для
 * официальных документов и веба.
 */

export const locales = ["ru", "uz"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/**
 * Заголовок, в котором middleware передаёт язык страницам.
 *
 * Нужен там, где языкового параметра нет по устройству Next.js, — прежде
 * всего на странице 404.
 */
export const LOCALE_HEADER = "x-dentos-locale";

/** Подписи для переключателя языка. */
export const localeLabels: Record<Locale, string> = {
  ru: "Рус",
  // Буква Oʻ пишется через U+02BB, как и во всех узбекских текстах
  // сайта: типографская кавычка U+2018 здесь была опечаткой.
  uz: "Oʻzb",
};

/** Значение атрибута lang для html. */
export const localeHtmlLang: Record<Locale, string> = {
  ru: "ru",
  uz: "uz",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Адрес страницы с учётом языка. Внутри кода ссылки пишутся без префикса
 * (`/doctors`), а префикс подставляется здесь — так ни одна ссылка не
 * забудет про язык.
 */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Убирает языковой префикс: `/uz/doctors` → `/doctors`. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/**
 * Значение, у которого есть вариант на каждом языке.
 * Используется в данных клиники: описания услуг, биографии врачей, отзывы.
 */
export type Localized<T = string> = Record<Locale, T>;

/** Достаёт нужный язык из локализованного значения. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
