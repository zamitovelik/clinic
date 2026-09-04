import type { Localized } from "@/i18n/config";

/**
 * Галерея (раздел 17 ТЗ). Сейчас — заглушки из `public/images/gallery`.
 * Заказчик заменяет `src` на реальные фотографии, подписи остаются.
 */

export interface GalleryItem {
  id: string;
  src: string;
  /** Подпись и одновременно alt для изображения. */
  caption: Localized;
  demo: boolean;
}

export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/gallery-1.svg", caption: { ru: "Лечебный кабинет", uz: "Davolash xonasi" }, demo: true },
  { id: "g2", src: "/images/gallery/gallery-2.svg", caption: { ru: "Операционная", uz: "Operatsiya xonasi" }, demo: true },
  { id: "g3", src: "/images/gallery/gallery-3.svg", caption: { ru: "Зона ожидания", uz: "Kutish zonasi" }, demo: true },
  { id: "g4", src: "/images/gallery/gallery-4.svg", caption: { ru: "Диагностическое оборудование", uz: "Diagnostika uskunalari" }, demo: true },
  { id: "g5", src: "/images/gallery/gallery-5.svg", caption: { ru: "Детский кабинет", uz: "Bolalar xonasi" }, demo: true },
  { id: "g6", src: "/images/gallery/gallery-6.svg", caption: { ru: "Стерилизационная", uz: "Sterilizatsiya xonasi" }, demo: true },
  { id: "g7", src: "/images/gallery/gallery-7.svg", caption: { ru: "Кабинет гигиены", uz: "Gigiyena xonasi" }, demo: true },
  { id: "g8", src: "/images/gallery/gallery-8.svg", caption: { ru: "Ресепшн", uz: "Qabulxona" }, demo: true },
];
