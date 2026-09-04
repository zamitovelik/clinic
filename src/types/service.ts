import type { Localized } from "@/i18n/config";

/** Категория услуг — верхний уровень каталога. */
export interface ServiceCategory {
  slug: string;
  title: Localized;
  /** Короткое описание для карточки категории. */
  summary: Localized;
}

export interface ServicePriceItem {
  title: Localized;
  /** Цена строкой: «от 350 000 сум». Числом не храним — прайс меняется часто. */
  price: string;
}

export interface Service {
  id: string;
  slug: string;
  categorySlug: string;
  title: Localized;
  /** Одна строка для карточки в сетке. */
  summary: Localized;
  /** Полный текст для страницы услуги. */
  description: Localized;
  /** Что входит в лечение. */
  includes: Localized<string[]>;
  /** Этапы лечения — показываются нумерованным списком. */
  stages: { title: Localized; text: Localized }[];
  /** Ориентировочная длительность приёма, минуты. */
  durationMinutes: number;
  priceFrom?: string;
  prices?: ServicePriceItem[];
  image?: string;
  /** Пометка о том, что данные демонстрационные. */
  demo?: boolean;
}
