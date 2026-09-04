import type { Localized } from "@/i18n/config";

/**
 * Раздел «До и после».
 *
 * Иллюстрации схематические и помечены `demo: true`. Настоящих снимков
 * работ заказчик не присылал, а рисовать псевдофотографии «результата»
 * нельзя: пациент воспримет их как обещание (раздел 28 ТЗ). Схема честно
 * показывает, что именно меняется, и заменяется на фотографию простой
 * заменой двух файлов в `public/images/before-after`.
 *
 * Сроки указаны как диапазон и относятся к типичному ходу лечения, а не
 * к конкретному пациенту клиники.
 */

export interface BeforeAfterCase {
  id: string;
  /** Слаг услуги: отсюда берётся ссылка «подробнее об услуге». */
  serviceSlug: string;
  title: Localized;
  description: Localized;
  /** Сколько обычно занимает такая работа. */
  duration: Localized;
  before: string;
  after: string;
  demo: boolean;
}

export const beforeAfter: BeforeAfterCase[] = [
  {
    id: "braces",
    serviceSlug: "ortodontiya",
    title: { ru: "Выравнивание прикуса", uz: "Tishlamni tekislash" },
    description: {
      ru: "Скученность передних зубов мешает чистке: щётка не достаёт до боковых поверхностей, и там начинается кариес. Ортодонтическое лечение ставит зубы в ряд и убирает эти труднодоступные места.",
      uz: "Old tishlarning zichligi tozalashga xalaqit beradi: choʻtka yon yuzalarga yetmaydi va oʻsha yerda kariyes boshlanadi. Ortodontik davolash tishlarni bir qatorga tizadi va bunday joylarni yoʻqotadi.",
    },
    duration: { ru: "от 12 до 24 месяцев", uz: "12 oydan 24 oygacha" },
    before: "/images/before-after/braces-before.svg",
    after: "/images/before-after/braces-after.svg",
    demo: true,
  },
  {
    id: "implant",
    serviceSlug: "implantaciya",
    title: { ru: "Восстановление утраченного зуба", uz: "Yoʻqolgan tishni tiklash" },
    description: {
      ru: "На месте удалённого зуба соседние постепенно наклоняются в промежуток, а кость на этом участке убывает. Имплант возвращает опору и жевательную нагрузку, поэтому ряд остаётся на месте.",
      uz: "Olib tashlangan tish oʻrniga qoʻshnilari asta-sekin ogʻadi, bu joydagi suyak esa kamayadi. Implant tayanchni va chaynash yukini qaytaradi, shuning uchun qator oʻz joyida qoladi.",
    },
    duration: { ru: "от 3 до 6 месяцев", uz: "3 oydan 6 oygacha" },
    before: "/images/before-after/implant-before.svg",
    after: "/images/before-after/implant-after.svg",
    demo: true,
  },
  {
    id: "whitening",
    serviceSlug: "esteticheskaya-stomatologiya",
    title: { ru: "Осветление эмали", uz: "Emalni oqartirish" },
    description: {
      ru: "Эмаль темнеет от кофе, чая и курения — пигмент накапливается в её верхнем слое. Перед отбеливанием делают чистку, иначе результат ляжет неравномерно, поверх налёта.",
      uz: "Emal qahva, choy va chekishdan qorayadi — pigment uning yuqori qatlamida toʻpalanadi. Oqartirishdan oldin tozalash qilinadi, aks holda natija karash ustiga notekis tushadi.",
    },
    duration: { ru: "один-два визита", uz: "bir-ikki tashrif" },
    before: "/images/before-after/whitening-before.svg",
    after: "/images/before-after/whitening-after.svg",
    demo: true,
  },
  {
    id: "restoration",
    serviceSlug: "terapiya",
    title: { ru: "Реставрация переднего зуба", uz: "Old tishni restavratsiya qilish" },
    description: {
      ru: "Скол и потемнение восстанавливают композитом, подбирая оттенок к соседним зубам. Работа делается за один приём, но перед ней проверяют, не задет ли нерв.",
      uz: "Siniq va qorayish kompozit bilan tiklanadi, rangi qoʻshni tishlarga moslab tanlanadi. Ish bitta qabulda bajariladi, lekin undan oldin nerv shikastlanmaganligi tekshiriladi.",
    },
    duration: { ru: "один визит", uz: "bitta tashrif" },
    before: "/images/before-after/restoration-before.svg",
    after: "/images/before-after/restoration-after.svg",
    demo: true,
  },
];
