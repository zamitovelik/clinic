import type { Doctor } from "@/types/doctor";

/**
 * ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ.
 *
 * Все врачи помечены `demo: true`. Имена, стаж, категории, места работы,
 * дипломы и сертификаты — вымышленные и приведены только для того, чтобы
 * интерфейс был полностью рабочим (раздел 28 ТЗ). Перед запуском файл
 * заменяется настоящими данными клиники; структура при этом не меняется.
 */

export const doctors: Doctor[] = [
  {
    id: "1",
    slug: "aliyev-rustam",
    name: "Алиев Рустам Шухратович",
    specialty: "Стоматолог-терапевт",
    experience: 12,
    category: "Врач высшей категории",
    photo: "/images/doctors/doctor-1.svg",
    shortDescription:
      "Ведёт лечение кариеса и корневых каналов под увеличением, работает с тревожными пациентами.",
    biography: [
      "Занимается терапевтической стоматологией: лечением кариеса, пульпита и периодонтита. Основной принцип работы — сохранить как можно больше собственных тканей зуба.",
      "Отдельное внимание уделяет пациентам, которые долго откладывали визит из-за страха: приём строится короткими этапами, с подробным объяснением каждого шага.",
    ],
    education: [
      {
        year: "2009 — 2014",
        institution: "Ташкентский государственный стоматологический институт",
        specialty: "Стоматология",
      },
      {
        year: "2014 — 2016",
        institution: "Клиническая ординатура",
        specialty: "Терапевтическая стоматология",
      },
    ],
    workExperience: [
      { period: "2016 — 2019", place: "Стоматологическая клиника, Ташкент", role: "Врач-стоматолог" },
      { period: "2019 — 2023", place: "Частная стоматология, Ташкент", role: "Стоматолог-терапевт" },
      { period: "2023 — н. в.", place: "Dentos Medical", role: "Стоматолог-терапевт" },
    ],
    certificates: [
      { id: "c1", title: "Эндодонтическое лечение под микроскопом", year: "2021", image: "/images/certificates/certificate-1.svg" },
      { id: "c2", title: "Современные методы реставрации", year: "2022", image: "/images/certificates/certificate-2.svg" },
    ],
    serviceSlugs: ["terapiya", "diagnostika", "professionalnaya-gigiena"],
    specializations: ["Терапия", "Эндодонтия", "Реставрация"],
    demo: true,
  },
  {
    id: "2",
    slug: "karimova-dilnoza",
    name: "Каримова Дилноза Азизовна",
    specialty: "Детский стоматолог",
    experience: 9,
    category: "Врач первой категории",
    photo: "/images/doctors/doctor-2.svg",
    shortDescription:
      "Принимает детей с двух лет, строит первый визит как знакомство, а не как лечение.",
    biography: [
      "Работает с детьми дошкольного и школьного возраста. Считает, что первое посещение стоматолога определяет отношение человека к лечению на годы вперёд, поэтому начинает с адаптации.",
      "Основное направление — профилактика: герметизация фиссур, фторирование и обучение родителей уходу за зубами ребёнка.",
    ],
    education: [
      {
        year: "2012 — 2017",
        institution: "Ташкентский педиатрический медицинский институт",
        specialty: "Стоматология",
      },
      {
        year: "2017 — 2019",
        institution: "Клиническая ординатура",
        specialty: "Детская стоматология",
      },
    ],
    workExperience: [
      { period: "2019 — 2022", place: "Детская стоматология, Ташкент", role: "Врач-стоматолог" },
      { period: "2022 — н. в.", place: "Dentos Medical", role: "Детский стоматолог" },
    ],
    certificates: [
      { id: "c3", title: "Лечение зубов у детей раннего возраста", year: "2021", image: "/images/certificates/certificate-3.svg" },
    ],
    serviceSlugs: ["detskaya-stomatologiya", "professionalnaya-gigiena", "diagnostika"],
    specializations: ["Детская стоматология", "Профилактика"],
    demo: true,
  },
  {
    id: "3",
    slug: "yusupov-timur",
    name: "Юсупов Тимур Бахтиярович",
    specialty: "Стоматолог-хирург, имплантолог",
    experience: 15,
    category: "Врач высшей категории",
    photo: "/images/doctors/doctor-3.svg",
    shortDescription:
      "Проводит удаления любой сложности и устанавливает импланты с предварительным планированием по томографии.",
    biography: [
      "Занимается хирургическим приёмом и имплантацией. Каждое вмешательство планирует по компьютерной томографии — это позволяет заранее оценить объём кости и положение важных структур.",
      "Ведёт пациентов от подготовки до установки постоянной коронки совместно с врачом-ортопедом.",
    ],
    education: [
      {
        year: "2006 — 2011",
        institution: "Ташкентская медицинская академия",
        specialty: "Стоматология",
      },
      {
        year: "2011 — 2013",
        institution: "Клиническая ординатура",
        specialty: "Челюстно-лицевая хирургия",
      },
    ],
    workExperience: [
      { period: "2013 — 2018", place: "Городская стоматологическая поликлиника, Ташкент", role: "Хирург" },
      { period: "2018 — 2024", place: "Частная клиника, Ташкент", role: "Хирург-имплантолог" },
      { period: "2024 — н. в.", place: "Dentos Medical", role: "Стоматолог-хирург" },
    ],
    certificates: [
      { id: "c4", title: "Дентальная имплантация", year: "2019", image: "/images/certificates/certificate-4.svg" },
      { id: "c5", title: "Костная пластика и синус-лифтинг", year: "2022", image: "/images/certificates/certificate-1.svg" },
    ],
    serviceSlugs: ["hirurgiya", "implantaciya", "diagnostika"],
    specializations: ["Хирургия", "Имплантация"],
    demo: true,
  },
  {
    id: "4",
    slug: "nigmatova-lola",
    name: "Нигматова Лола Фарходовна",
    specialty: "Врач-ортодонт",
    experience: 10,
    category: "Врач первой категории",
    photo: "/images/doctors/doctor-4.svg",
    shortDescription:
      "Исправляет прикус брекет-системами и элайнерами, ведёт подростков и взрослых.",
    biography: [
      "Занимается диагностикой и лечением аномалий прикуса. Перед началом лечения составляет расчёт и показывает пациенту предполагаемый результат и сроки.",
      "Считает ретенционный период такой же обязательной частью лечения, как и активную фазу — без него результат возвращается назад.",
    ],
    education: [
      {
        year: "2011 — 2016",
        institution: "Ташкентский государственный стоматологический институт",
        specialty: "Стоматология",
      },
      {
        year: "2016 — 2018",
        institution: "Клиническая ординатура",
        specialty: "Ортодонтия",
      },
    ],
    workExperience: [
      { period: "2018 — 2023", place: "Ортодонтический центр, Ташкент", role: "Врач-ортодонт" },
      { period: "2023 — н. в.", place: "Dentos Medical", role: "Врач-ортодонт" },
    ],
    certificates: [
      { id: "c6", title: "Лечение прозрачными элайнерами", year: "2022", image: "/images/certificates/certificate-2.svg" },
    ],
    serviceSlugs: ["ortodontiya", "diagnostika"],
    specializations: ["Ортодонтия", "Прикус"],
    demo: true,
  },
  {
    id: "5",
    slug: "sadikov-jasur",
    name: "Садиков Жасур Улугбекович",
    specialty: "Врач стоматолог-ортопед",
    experience: 13,
    category: "Врач высшей категории",
    photo: "/images/doctors/doctor-5.svg",
    shortDescription:
      "Занимается протезированием: коронки, вкладки, мостовидные и съёмные конструкции.",
    biography: [
      "Восстанавливает разрушенные и утраченные зубы. Подбирает конструкцию так, чтобы жевательная нагрузка распределялась равномерно и не перегружала опорные зубы.",
      "Работает в паре с зубным техником, участвует в подборе оттенка и контроле каждой примерки.",
    ],
    education: [
      {
        year: "2008 — 2013",
        institution: "Ташкентская медицинская академия",
        specialty: "Стоматология",
      },
      {
        year: "2013 — 2015",
        institution: "Клиническая ординатура",
        specialty: "Ортопедическая стоматология",
      },
    ],
    workExperience: [
      { period: "2015 — 2021", place: "Стоматологическая клиника, Ташкент", role: "Врач-ортопед" },
      { period: "2021 — н. в.", place: "Dentos Medical", role: "Стоматолог-ортопед" },
    ],
    certificates: [
      { id: "c7", title: "Цифровое протезирование", year: "2023", image: "/images/certificates/certificate-3.svg" },
    ],
    serviceSlugs: ["ortopediya", "implantaciya", "esteticheskaya-stomatologiya"],
    specializations: ["Ортопедия", "Протезирование"],
    demo: true,
  },
  {
    id: "6",
    slug: "abdullayeva-sevara",
    name: "Абдуллаева Севара Икромовна",
    specialty: "Стоматолог-гигиенист",
    experience: 7,
    category: "Врач второй категории",
    photo: "/images/doctors/doctor-6.svg",
    shortDescription:
      "Проводит профессиональную гигиену и подбирает домашний уход под конкретный случай.",
    biography: [
      "Отвечает за профилактическое направление: снятие зубных отложений, полировку, фторирование. Регулярная гигиена решает большую часть проблем до того, как они становятся лечением.",
      "На приёме разбирает технику чистки и подбирает щётку, пасту и ёршики под особенности зубного ряда пациента.",
    ],
    education: [
      {
        year: "2014 — 2019",
        institution: "Ташкентский государственный стоматологический институт",
        specialty: "Стоматология",
      },
    ],
    workExperience: [
      { period: "2019 — 2022", place: "Стоматологическая клиника, Ташкент", role: "Гигиенист" },
      { period: "2022 — н. в.", place: "Dentos Medical", role: "Стоматолог-гигиенист" },
    ],
    certificates: [
      { id: "c8", title: "Профессиональная гигиена полости рта", year: "2021", image: "/images/certificates/certificate-4.svg" },
    ],
    serviceSlugs: ["professionalnaya-gigiena", "esteticheskaya-stomatologiya", "diagnostika"],
    specializations: ["Гигиена", "Профилактика"],
    demo: true,
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

/** Врачи, которые ведут указанную услугу. */
export function getDoctorsByService(serviceSlug: string): Doctor[] {
  return doctors.filter((doctor) => doctor.serviceSlugs.includes(serviceSlug));
}
