import type { Localized } from "@/i18n/config";

/**
 * Данные клиники вынесены в один файл (раздел 28 ТЗ): заказчик меняет их здесь,
 * не трогая интерфейс.
 *
 * Здесь только сведения, полученные от заказчика. Ничего, что относится
 * к фактам о клинике, не выдумано: телефон, адрес и Instagram взяты из ТЗ,
 * остальное — нейтральные формулировки без конкретных утверждений.
 */

export interface WorkingDayHours {
  /** 1 — понедельник, 7 — воскресенье. Название дня берётся из словаря. */
  dayOfWeek: number;
  /** Часы работы строкой. `null` — выходной. */
  hours: string | null;
}

/**
 * Телефоны клиники. Первый — основной: он стоит в шапке, в нижней панели
 * и на всех кнопках «позвонить», где номер должен быть один. Списками
 * (подвал, контакты, блок «как нас найти») показываются оба.
 */
const phones = [
  { display: "+998 99 780 11 44", raw: "+998997801144" },
  { display: "+998 97 758 81 81", raw: "+998977588181" },
];

export const company = {
  name: "Dentos Medical",
  nameShort: "Dentos",
  city: { ru: "Ташкент", uz: "Toshkent" } satisfies Localized,
  address: {
    ru: "ул. Мукими, 19А",
    uz: "Muqimiy koʻchasi, 19A",
  } satisfies Localized,
  addressFull: {
    ru: "Ташкент, ул. Мукими, 19А",
    uz: "Toshkent, Muqimiy koʻchasi, 19A",
  } satisfies Localized,
  phones,
  /** Основной номер — там, где номер по смыслу один. */
  phone: phones[0].display,
  /** Тот же номер без разделителей — для tel: и WhatsApp. */
  phoneRaw: phones[0].raw,
  instagram: "@dentosmedical",
  instagramUrl: "https://instagram.com/dentosmedical",

  /** Координаты для карты. Уточняются заказчиком перед запуском. */
  coordinates: { latitude: 41.283, longitude: 69.226 },

  /** График работы. Названия дней недели подставляет интерфейс из словаря. */
  workingHours: [
    { dayOfWeek: 1, hours: "09:00 — 19:00" },
    { dayOfWeek: 2, hours: "09:00 — 19:00" },
    { dayOfWeek: 3, hours: "09:00 — 19:00" },
    { dayOfWeek: 4, hours: "09:00 — 19:00" },
    { dayOfWeek: 5, hours: "09:00 — 19:00" },
    { dayOfWeek: 6, hours: "10:00 — 16:00" },
    { dayOfWeek: 7, hours: null },
  ] satisfies WorkingDayHours[],

  /**
   * Числовые показатели первого экрана.
   *
   * Значения намеренно пустые: выдумывать опыт, количество пациентов и рейтинг
   * нельзя (раздел 28 ТЗ). Пока поле `value` пусто, первый экран показывает
   * качественные подписи из `heroBadges`; как только заказчик впишет числа,
   * блок сам переключится на них — правок в интерфейсе не потребуется.
   */
  stats: [
    {
      key: "experience",
      value: "",
      label: { ru: "лет клинике", uz: "klinikaga yil" } satisfies Localized,
    },
    {
      key: "patients",
      value: "",
      label: {
        ru: "пациентов в год",
        uz: "yiliga bemor",
      } satisfies Localized,
    },
    {
      key: "rating",
      value: "",
      label: {
        ru: "оценка пациентов",
        uz: "bemorlar bahosi",
      } satisfies Localized,
    },
  ],

  /** Запасной вариант первого экрана: утверждения без чисел. */
  heroBadges: [
    {
      key: "team",
      title: {
        ru: "Врачи с профильной специализацией",
        uz: "Profil mutaxassisligiga ega shifokorlar",
      } satisfies Localized,
    },
    {
      key: "equipment",
      title: {
        ru: "Современное оборудование",
        uz: "Zamonaviy uskunalar",
      } satisfies Localized,
    },
    {
      key: "warranty",
      title: {
        ru: "Гарантия на лечение",
        uz: "Davolashga kafolat",
      } satisfies Localized,
    },
  ],
};

export type Company = typeof company;
