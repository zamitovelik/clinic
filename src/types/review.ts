export interface Review {
  id: string;
  /** К какому врачу относится отзыв. `null` — отзыв о клинике в целом. */
  doctorSlug: string | null;
  authorName: string;
  /** `2026-07-14` */
  date: string;
  rating: number;
  text: string;
  /** Откуда отзыв: Google, Instagram, книга отзывов. */
  source?: string;
  /** Демонстрационные отзывы помечены явно и не выдаются за настоящие. */
  demo: boolean;
}
