"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./ru";
import type { Locale } from "./config";

/**
 * Словарь для клиентских компонентов.
 *
 * Серверные страницы получают словарь напрямую вызовом `getDictionary`,
 * а клиентским его кладёт сюда общий макет — иначе пришлось бы протаскивать
 * тексты пропсами через каждый шаг мастера записи.
 */
interface I18nValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: I18nValue & { children: React.ReactNode }) {
  // Значение меняется только при смене языка, то есть при переходе
  // на другую страницу, поэтому мемоизация тут ничего не даст.
  return (
    <I18nContext.Provider value={{ locale, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n используется вне I18nProvider");
  return value;
}
