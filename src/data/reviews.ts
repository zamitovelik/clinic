import type { Review } from "@/types/review";

/**
 * ДЕМОНСТРАЦИОННЫЕ ОТЗЫВЫ.
 *
 * Каждый отзыв помечен `demo: true` (раздел 16 ТЗ). Это не настоящие слова
 * пациентов, а образцы для проверки вёрстки. Перед запуском файл заменяется
 * реальными отзывами — с указанием источника в поле `source`.
 *
 * Настоящие отзывы придут на том языке, на котором их написали. Тогда второй
 * вариант либо переводится, либо остаётся тем же текстом — выдавать перевод
 * за слова пациента нельзя.
 */

export const reviews: Review[] = [
  {
    id: "r1",
    doctorSlug: "aliyev-rustam",
    authorName: { ru: "Анна К.", uz: "Anna K." },
    date: "2026-07-21",
    rating: 5,
    text: {
      ru: "Долго не могла заставить себя пойти лечить зуб. Врач всё объяснил заранее и делал паузы, когда просила. Впервые вышла из стоматологии спокойной.",
      uz: "Uzoq vaqt tish davolatishga oʻzimni majbur qila olmadim. Shifokor hammasini oldindan tushuntirdi va soʻraganimda tanaffus qildi. Birinchi marta stomatologiyadan xotirjam chiqdim.",
    },
    demo: true,
  },
  {
    id: "r2",
    doctorSlug: "karimova-dilnoza",
    authorName: { ru: "Мадина Т.", uz: "Madina T." },
    date: "2026-07-09",
    rating: 5,
    text: {
      ru: "Привела дочь пяти лет. Первый приём прошёл вообще без лечения — просто знакомились с кабинетом. На втором ребёнок уже сам сел в кресло.",
      uz: "Besh yoshli qizimni olib keldim. Birinchi qabul umuman davolashsiz oʻtdi — shunchaki xona bilan tanishdik. Ikkinchisida bola oʻzi kresloga oʻtirdi.",
    },
    demo: true,
  },
  {
    id: "r3",
    doctorSlug: "yusupov-timur",
    authorName: { ru: "Рустам А.", uz: "Rustam A." },
    date: "2026-06-28",
    rating: 5,
    text: {
      ru: "Удаляли зуб мудрости. Перед этим сделали снимок и подробно рассказали, как всё пройдёт. По ощущениям заняло меньше, чем я ожидал.",
      uz: "Aql tishimni olishdi. Bundan oldin rentgen qilib, hammasi qanday oʻtishini batafsil aytib berishdi. His-tuygʻularimga koʻra men kutganimdan kamroq vaqt oldi.",
    },
    demo: true,
  },
  {
    id: "r4",
    doctorSlug: "nigmatova-lola",
    authorName: { ru: "Севара М.", uz: "Sevara M." },
    date: "2026-06-15",
    rating: 5,
    text: {
      ru: "Ношу элайнеры восьмой месяц. На каждом приёме показывают, насколько продвинулись относительно плана. Это очень мотивирует не бросать.",
      uz: "Sakkizinchi oy aylaynerlar taqib yuribman. Har bir qabulda rejaga nisbatan qanchalik oldinga siljiganimizni koʻrsatishadi. Bu tashlab qoʻymaslikka juda undaydi.",
    },
    demo: true,
  },
  {
    id: "r5",
    doctorSlug: "sadikov-jasur",
    authorName: { ru: "Дмитрий П.", uz: "Dmitriy P." },
    date: "2026-05-30",
    rating: 5,
    text: {
      ru: "Ставили коронку. Оттенок подбирали при мне, сравнивали с соседними зубами. Отличить от своего зуба не получается.",
      uz: "Koronka qoʻyishdi. Rangni men oldimda tanlashdi, qoʻshni tishlar bilan solishtirishdi. Oʻz tishimdan farqlab boʻlmayapti.",
    },
    demo: true,
  },
  {
    id: "r6",
    doctorSlug: "abdullayeva-sevara",
    authorName: { ru: "Ольга В.", uz: "Olga V." },
    date: "2026-05-12",
    rating: 5,
    text: {
      ru: "Хожу на чистку раз в полгода. Отдельно ценю, что каждый раз разбирают, где я плохо прочищаю, и показывают на модели.",
      uz: "Yarim yilda bir marta tozalashga boraman. Har safar qayerni yomon tozalayotganimni koʻrib chiqib, model ustida koʻrsatishlarini alohida qadrlayman.",
    },
    demo: true,
  },
  {
    id: "r7",
    doctorSlug: null,
    authorName: { ru: "Шахзод Н.", uz: "Shahzod N." },
    date: "2026-04-27",
    rating: 5,
    text: {
      ru: "Записался через сайт вечером, утром перезвонили и подтвердили время. Приняли минута в минуту, ждать не пришлось.",
      uz: "Kechqurun sayt orqali yozildim, ertalab qoʻngʻiroq qilib vaqtni tasdiqlashdi. Daqiqama-daqiqa qabul qilishdi, kutishga toʻgʻri kelmadi.",
    },
    demo: true,
  },
  {
    id: "r8",
    doctorSlug: null,
    authorName: { ru: "Ирина С.", uz: "Irina S." },
    date: "2026-04-03",
    rating: 5,
    text: {
      ru: "Приятно, что в клинике тихо и нет очереди в коридоре. Совсем не похоже на стоматологию из детства.",
      uz: "Klinikada tinch va koridorda navbat yoʻqligi yoqimli. Bolalikdagi stomatologiyaga umuman oʻxshamaydi.",
    },
    demo: true,
  },
];

export function getReviewsByDoctor(doctorSlug: string): Review[] {
  return reviews.filter((review) => review.doctorSlug === doctorSlug);
}
