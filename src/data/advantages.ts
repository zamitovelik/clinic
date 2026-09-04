import type { Localized } from "@/i18n/config";

/**
 * Блок «Почему Dentos Medical» (раздел 7 ТЗ).
 * Формулировки описывают подход к работе и не содержат непроверяемых заявлений
 * вроде «лучшая клиника города» или конкретных цифр.
 */

export interface Advantage {
  key: string;
  /** Имя иконки из lucide-react. */
  icon: string;
  title: Localized;
  text: Localized;
}

export const advantages: Advantage[] = [
  {
    key: "specialists",
    icon: "stethoscope",
    title: {
      ru: "Профильные специалисты",
      uz: "Profil mutaxassislari",
    },
    text: {
      ru: "Каждым направлением занимается отдельный врач: терапевт не берётся за ортодонтию, а хирург — за детский приём.",
      uz: "Har bir yoʻnalish bilan alohida shifokor shugʻullanadi: terapevt ortodontiyaga, jarroh esa bolalar qabuliga kirishmaydi.",
    },
  },
  {
    key: "equipment",
    icon: "microscope",
    title: {
      ru: "Современное оборудование",
      uz: "Zamonaviy uskunalar",
    },
    text: {
      ru: "Диагностика и лечение опираются на снимки и увеличение, а не на осмотр вслепую.",
      uz: "Diagnostika va davolash koʻr-koʻrona koʻrikka emas, rentgen va kattalashtirishga tayanadi.",
    },
  },
  {
    key: "plan",
    icon: "clipboard-list",
    title: {
      ru: "План лечения до начала",
      uz: "Boshlashdan oldin davolash rejasi",
    },
    text: {
      ru: "Вы заранее знаете очерёдность этапов и объём работы. Решения не принимаются в кресле на ходу.",
      uz: "Siz bosqichlar navbati va ish hajmini oldindan bilasiz. Qarorlar kresloda yoʻl-yoʻlakay qabul qilinmaydi.",
    },
  },
  {
    key: "comfort",
    icon: "heart-handshake",
    title: {
      ru: "Спокойный приём",
      uz: "Xotirjam qabul",
    },
    text: {
      ru: "Работаем по записи, без очередей. Для тревожных пациентов — темп короткими этапами с паузами.",
      uz: "Yozuv asosida, navbatsiz ishlaymiz. Xavotirli bemorlar uchun — tanaffuslar bilan qisqa bosqichli surʼat.",
    },
  },
  {
    key: "complex",
    icon: "layers",
    title: {
      ru: "Комплексное лечение",
      uz: "Kompleks davolash",
    },
    text: {
      ru: "От диагностики до протезирования в одном месте — врачи ведут случай совместно и не теряют историю.",
      uz: "Diagnostikadan protezlashgacha bitta joyda — shifokorlar holatni birgalikda olib boradi va tarixni yoʻqotmaydi.",
    },
  },
  {
    key: "hygiene",
    icon: "shield-check",
    title: {
      ru: "Стерильность",
      uz: "Sterillik",
    },
    text: {
      ru: "Инструменты проходят полный цикл обработки, одноразовое остаётся одноразовым.",
      uz: "Asboblar toʻliq ishlov berish siklidan oʻtadi, bir martalik narsa bir martalik boʻlib qoladi.",
    },
  },
];
