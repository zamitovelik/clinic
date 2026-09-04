import type { Localized } from "@/i18n/config";

/**
 * Прайс-лист.
 *
 * ВНИМАНИЕ. Суммы здесь демонстрационные — заказчик цен не присылал, а
 * придумывать их молча нельзя (раздел 28 ТЗ). Поэтому весь список помечен
 * `pricesAreDemo`, и пока флаг включён, над таблицей висит заметное
 * предупреждение. Когда заказчик пришлёт настоящий прайс, достаточно
 * заменить строки и поставить `pricesAreDemo = false` — предупреждение
 * исчезнет само, править интерфейс не нужно.
 *
 * Числа хранятся без слова «от» и без валюты: приставка и «сум» приходят из
 * словаря, иначе прайс пришлось бы дублировать на двух языках.
 */

export interface PriceAmount {
  /** Сумма как её видит человек: «350 000». Разряды уже разделены. */
  amount: string;
  /** true — «от 350 000», false — ровно столько. */
  from: boolean;
}

export interface PriceItem {
  /** Что именно делают. */
  title: Localized;
  /** `null` — цену называют после осмотра, а не потому что её забыли вписать. */
  price: PriceAmount | null;
}

export interface PriceGroup {
  /** Совпадает со `slug` услуги: отсюда берутся заголовок и ссылка. */
  serviceSlug: string;
  items: PriceItem[];
}

/** Пока true — на прайсе видно, что цифры условные. */
export const pricesAreDemo = true;

const from = (amount: string): PriceAmount => ({ amount, from: true });

export const prices: PriceGroup[] = [
  {
    serviceSlug: "terapiya",
    items: [
      {
        title: {
          ru: "Консультация и план лечения",
          uz: "Maslahat va davolash rejasi",
        },
        price: from("50 000"),
      },
      {
        title: {
          ru: "Лечение кариеса, одна поверхность",
          uz: "Kariyesni davolash, bitta yuza",
        },
        price: from("350 000"),
      },
      {
        title: {
          ru: "Лечение глубокого кариеса",
          uz: "Chuqur kariyesni davolash",
        },
        price: from("450 000"),
      },
      {
        title: {
          ru: "Лечение пульпита, один канал",
          uz: "Pulpitni davolash, bitta kanal",
        },
        price: from("600 000"),
      },
      {
        title: {
          ru: "Лечение периодонтита",
          uz: "Periodontitni davolash",
        },
        price: from("900 000"),
      },
      {
        title: {
          ru: "Восстановление коронковой части зуба",
          uz: "Tish toji qismini tiklash",
        },
        price: from("700 000"),
      },
    ],
  },
  {
    serviceSlug: "hirurgiya",
    items: [
      {
        title: {
          ru: "Простое удаление зуба",
          uz: "Tishni oddiy olib tashlash",
        },
        price: from("300 000"),
      },
      {
        title: {
          ru: "Сложное удаление зуба",
          uz: "Tishni murakkab olib tashlash",
        },
        price: from("700 000"),
      },
      {
        title: {
          ru: "Удаление зуба мудрости",
          uz: "Aql tishini olib tashlash",
        },
        price: from("900 000"),
      },
      {
        title: {
          ru: "Резекция верхушки корня",
          uz: "Ildiz uchini rezeksiya qilish",
        },
        price: from("1 200 000"),
      },
      {
        title: {
          ru: "Пластика уздечки",
          uz: "Yuganchani plastika qilish",
        },
        price: from("800 000"),
      },
    ],
  },
  {
    serviceSlug: "ortopediya",
    items: [
      {
        title: {
          ru: "Металлокерамическая коронка",
          uz: "Metall-keramik toj",
        },
        price: from("1 500 000"),
      },
      {
        title: { ru: "Циркониевая коронка", uz: "Sirkoniy toj" },
        price: from("3 000 000"),
      },
      {
        title: { ru: "Керамическая вкладка", uz: "Keramik qoplama" },
        price: from("2 000 000"),
      },
      {
        title: { ru: "Съёмный протез", uz: "Olinadigan protez" },
        price: from("3 500 000"),
      },
      {
        title: { ru: "Бюгельный протез", uz: "Byugel protez" },
        price: from("5 000 000"),
      },
    ],
  },
  {
    serviceSlug: "implantaciya",
    items: [
      {
        title: {
          ru: "Установка импланта, базовая система",
          uz: "Implant oʻrnatish, bazaviy tizim",
        },
        price: from("4 500 000"),
      },
      {
        title: {
          ru: "Установка импланта, премиальная система",
          uz: "Implant oʻrnatish, premium tizim",
        },
        price: from("8 000 000"),
      },
      {
        title: { ru: "Формирователь десны", uz: "Milk shakllantirgichi" },
        price: from("700 000"),
      },
      {
        title: { ru: "Абатмент", uz: "Abatment" },
        price: from("1 200 000"),
      },
      {
        title: { ru: "Синус-лифтинг", uz: "Sinus-lifting" },
        price: from("4 000 000"),
      },
    ],
  },
  {
    serviceSlug: "esteticheskaya-stomatologiya",
    items: [
      {
        title: {
          ru: "Профессиональное отбеливание",
          uz: "Professional oqartirish",
        },
        price: from("1 800 000"),
      },
      {
        title: {
          ru: "Набор для домашнего отбеливания",
          uz: "Uyda oqartirish toʻplami",
        },
        price: from("900 000"),
      },
      {
        title: { ru: "Керамический винир", uz: "Keramik vinir" },
        price: from("3 500 000"),
      },
      {
        title: {
          ru: "Художественная реставрация зуба",
          uz: "Tishni badiiy restavratsiya qilish",
        },
        price: from("900 000"),
      },
    ],
  },
  {
    serviceSlug: "ortodontiya",
    items: [
      {
        title: {
          ru: "Консультация ортодонта с расчётом плана",
          uz: "Ortodont maslahati va reja hisobi",
        },
        price: from("100 000"),
      },
      {
        title: {
          ru: "Металлические брекеты, одна челюсть",
          uz: "Metall breketlar, bitta jagʻ",
        },
        price: from("5 000 000"),
      },
      {
        title: {
          ru: "Керамические брекеты, одна челюсть",
          uz: "Keramik breketlar, bitta jagʻ",
        },
        price: from("8 000 000"),
      },
      {
        title: { ru: "Элайнеры", uz: "Elaynerlar" },
        // Цена целиком зависит от числа кап в плане — усреднять её бессмысленно.
        price: null,
      },
      {
        title: {
          ru: "Активация брекетов, визит",
          uz: "Breketlarni faollashtirish, tashrif",
        },
        price: from("250 000"),
      },
      {
        title: {
          ru: "Ретейнер после лечения",
          uz: "Davolashdan keyingi reteyner",
        },
        price: from("700 000"),
      },
    ],
  },
  {
    serviceSlug: "detskaya-stomatologiya",
    items: [
      {
        title: {
          ru: "Консультация детского стоматолога",
          uz: "Bolalar stomatologi maslahati",
        },
        price: from("50 000"),
      },
      {
        title: {
          ru: "Лечение кариеса молочного зуба",
          uz: "Sut tishidagi kariyesni davolash",
        },
        price: from("300 000"),
      },
      {
        title: {
          ru: "Герметизация фиссур, один зуб",
          uz: "Fissuralarni germetiklash, bitta tish",
        },
        price: from("200 000"),
      },
      {
        title: {
          ru: "Удаление молочного зуба",
          uz: "Sut tishini olib tashlash",
        },
        price: from("200 000"),
      },
      {
        title: { ru: "Фторирование, одна челюсть", uz: "Ftorlash, bitta jagʻ" },
        price: from("250 000"),
      },
    ],
  },
  {
    serviceSlug: "professionalnaya-gigiena",
    items: [
      {
        title: {
          ru: "Комплексная чистка: ультразвук, Air Flow, полировка",
          uz: "Kompleks tozalash: ultratovush, Air Flow, sayqallash",
        },
        price: from("600 000"),
      },
      {
        title: {
          ru: "Ультразвуковая чистка",
          uz: "Ultratovush bilan tozalash",
        },
        price: from("400 000"),
      },
      {
        title: { ru: "Air Flow", uz: "Air Flow" },
        price: from("350 000"),
      },
      {
        title: {
          ru: "Лечение воспаления дёсен, курс",
          uz: "Milk yalligʻlanishini davolash, kurs",
        },
        // Курс собирают из процедур после осмотра, единой суммы у него нет.
        price: null,
      },
    ],
  },
  {
    serviceSlug: "diagnostika",
    items: [
      {
        title: { ru: "Прицельный снимок", uz: "Nishonli rentgen" },
        price: from("50 000"),
      },
      {
        title: { ru: "Панорамный снимок", uz: "Panoramali rentgen" },
        price: from("150 000"),
      },
      {
        title: { ru: "КТ одной челюсти", uz: "Bitta jagʻ KT" },
        price: from("250 000"),
      },
      {
        title: { ru: "КТ обеих челюстей", uz: "Ikkala jagʻ KT" },
        price: from("350 000"),
      },
    ],
  },
];

export function getPricesFor(serviceSlug: string): PriceItem[] {
  return prices.find((group) => group.serviceSlug === serviceSlug)?.items ?? [];
}
