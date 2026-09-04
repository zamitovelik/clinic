/**
 * Галерея (раздел 17 ТЗ). Сейчас — заглушки из `public/images/gallery`.
 * Заказчик заменяет `src` на реальные фотографии, подписи остаются.
 */

export interface GalleryItem {
  id: string;
  src: string;
  /** Подпись и одновременно alt для изображения. */
  caption: string;
  demo: boolean;
}

export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/gallery-1.svg", caption: "Лечебный кабинет", demo: true },
  { id: "g2", src: "/images/gallery/gallery-2.svg", caption: "Операционная", demo: true },
  { id: "g3", src: "/images/gallery/gallery-3.svg", caption: "Зона ожидания", demo: true },
  { id: "g4", src: "/images/gallery/gallery-4.svg", caption: "Диагностическое оборудование", demo: true },
  { id: "g5", src: "/images/gallery/gallery-5.svg", caption: "Детский кабинет", demo: true },
  { id: "g6", src: "/images/gallery/gallery-6.svg", caption: "Стерилизационная", demo: true },
  { id: "g7", src: "/images/gallery/gallery-7.svg", caption: "Кабинет гигиены", demo: true },
  { id: "g8", src: "/images/gallery/gallery-8.svg", caption: "Ресепшн", demo: true },
];
