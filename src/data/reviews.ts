import type { Review } from "@/types/review";

/**
 * ДЕМОНСТРАЦИОННЫЕ ОТЗЫВЫ.
 *
 * Каждый отзыв помечен `demo: true` (раздел 16 ТЗ). Это не настоящие слова
 * пациентов, а образцы для проверки вёрстки. Перед запуском файл заменяется
 * реальными отзывами — с указанием источника в поле `source`.
 */

export const reviews: Review[] = [
  {
    id: "r1",
    doctorSlug: "aliyev-rustam",
    authorName: "Анна К.",
    date: "2026-07-21",
    rating: 5,
    text: "Долго не могла заставить себя пойти лечить зуб. Врач всё объяснил заранее и делал паузы, когда просила. Впервые вышла из стоматологии спокойной.",
    demo: true,
  },
  {
    id: "r2",
    doctorSlug: "karimova-dilnoza",
    authorName: "Мадина Т.",
    date: "2026-07-09",
    rating: 5,
    text: "Привела дочь пяти лет. Первый приём прошёл вообще без лечения — просто знакомились с кабинетом. На втором ребёнок уже сам сел в кресло.",
    demo: true,
  },
  {
    id: "r3",
    doctorSlug: "yusupov-timur",
    authorName: "Рустам А.",
    date: "2026-06-28",
    rating: 5,
    text: "Удаляли зуб мудрости. Перед этим сделали снимок и подробно рассказали, как всё пройдёт. По ощущениям заняло меньше, чем я ожидал.",
    demo: true,
  },
  {
    id: "r4",
    doctorSlug: "nigmatova-lola",
    authorName: "Севара М.",
    date: "2026-06-15",
    rating: 5,
    text: "Ношу элайнеры восьмой месяц. На каждом приёме показывают, насколько продвинулись относительно плана. Это очень мотивирует не бросать.",
    demo: true,
  },
  {
    id: "r5",
    doctorSlug: "sadikov-jasur",
    authorName: "Дмитрий П.",
    date: "2026-05-30",
    rating: 5,
    text: "Ставили коронку. Оттенок подбирали при мне, сравнивали с соседними зубами. Отличить от своего зуба не получается.",
    demo: true,
  },
  {
    id: "r6",
    doctorSlug: "abdullayeva-sevara",
    authorName: "Ольга В.",
    date: "2026-05-12",
    rating: 5,
    text: "Хожу на чистку раз в полгода. Отдельно ценю, что каждый раз разбирают, где я плохо прочищаю, и показывают на модели.",
    demo: true,
  },
  {
    id: "r7",
    doctorSlug: null,
    authorName: "Шахзод Н.",
    date: "2026-04-27",
    rating: 5,
    text: "Записался через сайт вечером, утром перезвонили и подтвердили время. Приняли минута в минуту, ждать не пришлось.",
    demo: true,
  },
  {
    id: "r8",
    doctorSlug: null,
    authorName: "Ирина С.",
    date: "2026-04-03",
    rating: 5,
    text: "Приятно, что в клинике тихо и нет очереди в коридоре. Совсем не похоже на стоматологию из детства.",
    demo: true,
  },
];

export function getReviewsByDoctor(doctorSlug: string): Review[] {
  return reviews.filter((review) => review.doctorSlug === doctorSlug);
}
