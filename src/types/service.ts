/** Категория услуг — верхний уровень каталога. */
export interface ServiceCategory {
  slug: string;
  title: string;
  /** Короткое описание для карточки категории. */
  summary: string;
}

export interface ServicePriceItem {
  title: string;
  /** Цена строкой: «от 350 000 сум». Числом не храним — прайс меняется часто. */
  price: string;
}

export interface Service {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  /** Одна строка для карточки в сетке. */
  summary: string;
  /** Полный текст для страницы услуги. */
  description: string;
  /** Что входит в лечение. */
  includes: string[];
  /** Этапы лечения — показываются нумерованным списком. */
  stages: { title: string; text: string }[];
  /** Ориентировочная длительность приёма, минуты. */
  durationMinutes: number;
  priceFrom?: string;
  prices?: ServicePriceItem[];
  image?: string;
  /** Пометка о том, что данные демонстрационные. */
  demo?: boolean;
}
