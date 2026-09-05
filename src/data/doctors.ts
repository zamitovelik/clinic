import type { Doctor } from "@/types/doctor";

/**
 * ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ.
 *
 * Все врачи помечены `demo: true`. Имена, стаж, категории, места работы,
 * дипломы и сертификаты — вымышленные и приведены только для того, чтобы
 * интерфейс был полностью рабочим (раздел 28 ТЗ). Перед запуском файл
 * заменяется настоящими данными клиники; структура при этом не меняется.
 *
 * Имена врачей не переводятся — они одинаковы на обоих языках.
 */

export const doctors: Doctor[] = [
  {
    id: "1",
    slug: "aliyev-rustam",
    name: { ru: "Алиев Рустам Шухратович", uz: "Aliyev Rustam Shuhratovich" },
    specialty: { ru: "Стоматолог-терапевт", uz: "Stomatolog-terapevt" },
    experience: 12,
    category: { ru: "Врач высшей категории", uz: "Oliy toifali shifokor" },
    photo: "/images/doctors/doctor-1.svg",
    shortDescription: {
      ru: "Ведёт лечение кариеса и корневых каналов под увеличением, работает с тревожными пациентами.",
      uz: "Kariyes va ildiz kanallarini kattalashtirish ostida davolaydi, xavotirli bemorlar bilan ishlaydi.",
    },
    biography: {
      ru: [
        "Занимается терапевтической стоматологией: лечением кариеса, пульпита и периодонтита. Основной принцип работы — сохранить как можно больше собственных тканей зуба.",
        "Отдельное внимание уделяет пациентам, которые долго откладывали визит из-за страха: приём строится короткими этапами, с подробным объяснением каждого шага.",
      ],
      uz: [
        "Terapevtik stomatologiya bilan shugʻullanadi: kariyes, pulpit va periodontitni davolaydi. Ishning asosiy tamoyili — tishning oʻz toʻqimasini imkon qadar koʻproq saqlab qolish.",
        "Qoʻrquv tufayli tashrifni uzoq vaqt keyinga surgan bemorlarga alohida eʼtibor beradi: qabul qisqa bosqichlarda, har bir qadamni batafsil tushuntirib olib boriladi.",
      ],
    },
    education: [
      {
        year: "2009 — 2014",
        institution: {
          ru: "Ташкентский государственный стоматологический институт",
          uz: "Toshkent davlat stomatologiya instituti",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
      {
        year: "2014 — 2016",
        institution: { ru: "Клиническая ординатура", uz: "Klinik ordinatura" },
        specialty: {
          ru: "Терапевтическая стоматология",
          uz: "Terapevtik stomatologiya",
        },
      },
    ],
    workExperience: [
      {
        period: { ru: "2016 — 2019", uz: "2016 — 2019" },
        place: {
          ru: "Стоматологическая клиника, Ташкент",
          uz: "Stomatologiya klinikasi, Toshkent",
        },
        role: { ru: "Врач-стоматолог", uz: "Shifokor-stomatolog" },
      },
      {
        period: { ru: "2019 — 2023", uz: "2019 — 2023" },
        place: {
          ru: "Частная стоматология, Ташкент",
          uz: "Xususiy stomatologiya, Toshkent",
        },
        role: { ru: "Стоматолог-терапевт", uz: "Stomatolog-terapevt" },
      },
      {
        period: { ru: "2023 — н. в.", uz: "2023 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Стоматолог-терапевт", uz: "Stomatolog-terapevt" },
      },
    ],
    certificates: [
      {
        id: "c1",
        title: {
          ru: "Эндодонтическое лечение под микроскопом",
          uz: "Mikroskop ostida endodontik davolash",
        },
        year: "2021",
        image: "/images/certificates/certificate-1.svg",
      },
      {
        id: "c2",
        title: {
          ru: "Современные методы реставрации",
          uz: "Zamonaviy restavratsiya usullari",
        },
        year: "2022",
        image: "/images/certificates/certificate-2.svg",
      },
    ],
    serviceSlugs: ["terapiya", "diagnostika", "professionalnaya-gigiena"],
    specializations: {
      ru: ["Терапия", "Эндодонтия", "Реставрация"],
      uz: ["Terapiya", "Endodontiya", "Restavratsiya"],
    },
    demo: true,
  },
  {
    id: "2",
    slug: "karimova-dilnoza",
    name: { ru: "Каримова Дилноза Азизовна", uz: "Karimova Dilnoza Azizovna" },
    specialty: { ru: "Детский стоматолог", uz: "Bolalar stomatologi" },
    experience: 9,
    category: { ru: "Врач первой категории", uz: "Birinchi toifali shifokor" },
    photo: "/images/doctors/doctor-2.svg",
    shortDescription: {
      ru: "Принимает детей с двух лет, строит первый визит как знакомство, а не как лечение.",
      uz: "Ikki yoshdan bolalarni qabul qiladi, birinchi tashrifni davolash emas, tanishuv sifatida quradi.",
    },
    biography: {
      ru: [
        "Работает с детьми дошкольного и школьного возраста. Считает, что первое посещение стоматолога определяет отношение человека к лечению на годы вперёд, поэтому начинает с адаптации.",
        "Основное направление — профилактика: герметизация фиссур, фторирование и обучение родителей уходу за зубами ребёнка.",
      ],
      uz: [
        "Maktabgacha va maktab yoshidagi bolalar bilan ishlaydi. Stomatologga birinchi tashrif odamning davolashga munosabatini yillar davomida belgilaydi deb hisoblaydi, shuning uchun moslashuvdan boshlaydi.",
        "Asosiy yoʻnalish — profilaktika: fissuralarni germetiklash, ftorlash va ota-onalarga bolaning tishlarini parvarish qilishni oʻrgatish.",
      ],
    },
    education: [
      {
        year: "2012 — 2017",
        institution: {
          ru: "Ташкентский педиатрический медицинский институт",
          uz: "Toshkent pediatriya tibbiyot instituti",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
      {
        year: "2017 — 2019",
        institution: { ru: "Клиническая ординатура", uz: "Klinik ordinatura" },
        specialty: {
          ru: "Детская стоматология",
          uz: "Bolalar stomatologiyasi",
        },
      },
    ],
    workExperience: [
      {
        period: { ru: "2019 — 2022", uz: "2019 — 2022" },
        place: {
          ru: "Детская стоматология, Ташкент",
          uz: "Bolalar stomatologiyasi, Toshkent",
        },
        role: { ru: "Врач-стоматолог", uz: "Shifokor-stomatolog" },
      },
      {
        period: { ru: "2022 — н. в.", uz: "2022 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Детский стоматолог", uz: "Bolalar stomatologi" },
      },
    ],
    certificates: [
      {
        id: "c3",
        title: {
          ru: "Лечение зубов у детей раннего возраста",
          uz: "Erta yoshdagi bolalarda tish davolash",
        },
        year: "2021",
        image: "/images/certificates/certificate-3.svg",
      },
    ],
    serviceSlugs: [
      "detskaya-stomatologiya",
      "professionalnaya-gigiena",
      "diagnostika",
    ],
    specializations: {
      ru: ["Детская стоматология", "Профилактика"],
      uz: ["Bolalar stomatologiyasi", "Profilaktika"],
    },
    demo: true,
  },
  {
    id: "3",
    slug: "yusupov-timur",
    name: { ru: "Юсупов Тимур Бахтиярович", uz: "Yusupov Timur Bahtiyarovich" },
    specialty: {
      ru: "Стоматолог-хирург, имплантолог",
      uz: "Stomatolog-jarroh, implantolog",
    },
    experience: 15,
    category: { ru: "Врач высшей категории", uz: "Oliy toifali shifokor" },
    photo: "/images/doctors/doctor-3.svg",
    shortDescription: {
      ru: "Проводит удаления любой сложности и устанавливает импланты с предварительным планированием по томографии.",
      uz: "Har qanday murakkablikdagi tish olishni bajaradi va implantlarni tomografiya boʻyicha oldindan rejalashtirib oʻrnatadi.",
    },
    biography: {
      ru: [
        "Занимается хирургическим приёмом и имплантацией. Каждое вмешательство планирует по компьютерной томографии — это позволяет заранее оценить объём кости и положение важных структур.",
        "Ведёт пациентов от подготовки до установки постоянной коронки совместно с врачом-ортопедом.",
      ],
      uz: [
        "Jarrohlik qabuli va implantatsiya bilan shugʻullanadi. Har bir aralashuvni kompyuter tomografiyasi boʻyicha rejalashtiradi — bu suyak hajmi va muhim tuzilmalar joylashuvini oldindan baholash imkonini beradi.",
        "Bemorlarni tayyorgarlikdan doimiy koronka oʻrnatilgunga qadar shifokor-ortoped bilan birgalikda olib boradi.",
      ],
    },
    education: [
      {
        year: "2006 — 2011",
        institution: {
          ru: "Ташкентская медицинская академия",
          uz: "Toshkent tibbiyot akademiyasi",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
      {
        year: "2011 — 2013",
        institution: { ru: "Клиническая ординатура", uz: "Klinik ordinatura" },
        specialty: {
          ru: "Челюстно-лицевая хирургия",
          uz: "Yuz-jagʻ jarrohligi",
        },
      },
    ],
    workExperience: [
      {
        period: { ru: "2013 — 2018", uz: "2013 — 2018" },
        place: {
          ru: "Городская стоматологическая поликлиника, Ташкент",
          uz: "Shahar stomatologiya poliklinikasi, Toshkent",
        },
        role: { ru: "Хирург", uz: "Jarroh" },
      },
      {
        period: { ru: "2018 — 2024", uz: "2018 — 2024" },
        place: {
          ru: "Частная клиника, Ташкент",
          uz: "Xususiy klinika, Toshkent",
        },
        role: { ru: "Хирург-имплантолог", uz: "Jarroh-implantolog" },
      },
      {
        period: { ru: "2024 — н. в.", uz: "2024 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Стоматолог-хирург", uz: "Stomatolog-jarroh" },
      },
    ],
    certificates: [
      {
        id: "c4",
        title: { ru: "Дентальная имплантация", uz: "Dental implantatsiya" },
        year: "2019",
        image: "/images/certificates/certificate-4.svg",
      },
      {
        id: "c5",
        title: {
          ru: "Костная пластика и синус-лифтинг",
          uz: "Suyak plastikasi va sinus-lifting",
        },
        year: "2022",
        image: "/images/certificates/certificate-1.svg",
      },
    ],
    serviceSlugs: ["hirurgiya", "implantaciya", "diagnostika"],
    specializations: {
      ru: ["Хирургия", "Имплантация"],
      uz: ["Jarrohlik", "Implantatsiya"],
    },
    demo: true,
  },
  {
    id: "4",
    slug: "nigmatova-lola",
    name: { ru: "Нигматова Лола Фарходовна", uz: "Nigmatova Lola Farhodovna" },
    specialty: { ru: "Врач-ортодонт", uz: "Shifokor-ortodont" },
    experience: 10,
    category: { ru: "Врач первой категории", uz: "Birinchi toifali shifokor" },
    photo: "/images/doctors/doctor-4.svg",
    shortDescription: {
      ru: "Исправляет прикус брекет-системами и элайнерами, ведёт подростков и взрослых.",
      uz: "Tishlashni breket-tizim va aylaynerlar bilan toʻgʻrilaydi, oʻsmirlar va kattalarni olib boradi.",
    },
    biography: {
      ru: [
        "Занимается диагностикой и лечением аномалий прикуса. Перед началом лечения составляет расчёт и показывает пациенту предполагаемый результат и сроки.",
        "Считает ретенционный период такой же обязательной частью лечения, как и активную фазу — без него результат возвращается назад.",
      ],
      uz: [
        "Tishlash anomaliyalarini tashxislash va davolash bilan shugʻullanadi. Davolashni boshlashdan oldin hisob-kitob tuzadi va bemorga kutilayotgan natija hamda muddatlarni koʻrsatadi.",
        "Retensiya davrini davolashning faol bosqichi kabi majburiy qismi deb biladi — usiz natija ortga qaytadi.",
      ],
    },
    education: [
      {
        year: "2011 — 2016",
        institution: {
          ru: "Ташкентский государственный стоматологический институт",
          uz: "Toshkent davlat stomatologiya instituti",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
      {
        year: "2016 — 2018",
        institution: { ru: "Клиническая ординатура", uz: "Klinik ordinatura" },
        specialty: { ru: "Ортодонтия", uz: "Ortodontiya" },
      },
    ],
    workExperience: [
      {
        period: { ru: "2018 — 2023", uz: "2018 — 2023" },
        place: {
          ru: "Ортодонтический центр, Ташкент",
          uz: "Ortodontiya markazi, Toshkent",
        },
        role: { ru: "Врач-ортодонт", uz: "Shifokor-ortodont" },
      },
      {
        period: { ru: "2023 — н. в.", uz: "2023 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Врач-ортодонт", uz: "Shifokor-ortodont" },
      },
    ],
    certificates: [
      {
        id: "c6",
        title: {
          ru: "Лечение прозрачными элайнерами",
          uz: "Shaffof aylaynerlar bilan davolash",
        },
        year: "2022",
        image: "/images/certificates/certificate-2.svg",
      },
    ],
    serviceSlugs: ["ortodontiya", "diagnostika"],
    specializations: {
      ru: ["Ортодонтия", "Прикус"],
      uz: ["Ortodontiya", "Tishlash"],
    },
    demo: true,
  },
  {
    id: "5",
    slug: "sadikov-jasur",
    name: { ru: "Садиков Жасур Улугбекович", uz: "Sadikov Jasur Ulugʻbekovich" },
    specialty: {
      ru: "Врач стоматолог-ортопед",
      uz: "Shifokor stomatolog-ortoped",
    },
    experience: 13,
    category: { ru: "Врач высшей категории", uz: "Oliy toifali shifokor" },
    photo: "/images/doctors/doctor-5.svg",
    shortDescription: {
      ru: "Занимается протезированием: коронки, вкладки, мостовидные и съёмные конструкции.",
      uz: "Protezlash bilan shugʻullanadi: koronkalar, qoplamalar, koʻprikli va olinadigan konstruksiyalar.",
    },
    biography: {
      ru: [
        "Восстанавливает разрушенные и утраченные зубы. Подбирает конструкцию так, чтобы жевательная нагрузка распределялась равномерно и не перегружала опорные зубы.",
        "Работает в паре с зубным техником, участвует в подборе оттенка и контроле каждой примерки.",
      ],
      uz: [
        "Buzilgan va yoʻqolgan tishlarni tiklaydi. Konstruksiyani chaynash yuki bir tekis taqsimlanadigan va tayanch tishlarni ortiqcha zoʻriqtirmaydigan qilib tanlaydi.",
        "Tish texnigi bilan juftlikda ishlaydi, rang tanlashda va har bir oʻlchovni nazorat qilishda qatnashadi.",
      ],
    },
    education: [
      {
        year: "2008 — 2013",
        institution: {
          ru: "Ташкентская медицинская академия",
          uz: "Toshkent tibbiyot akademiyasi",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
      {
        year: "2013 — 2015",
        institution: { ru: "Клиническая ординатура", uz: "Klinik ordinatura" },
        specialty: {
          ru: "Ортопедическая стоматология",
          uz: "Ortopedik stomatologiya",
        },
      },
    ],
    workExperience: [
      {
        period: { ru: "2015 — 2021", uz: "2015 — 2021" },
        place: {
          ru: "Стоматологическая клиника, Ташкент",
          uz: "Stomatologiya klinikasi, Toshkent",
        },
        role: { ru: "Врач-ортопед", uz: "Shifokor-ortoped" },
      },
      {
        period: { ru: "2021 — н. в.", uz: "2021 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Стоматолог-ортопед", uz: "Stomatolog-ortoped" },
      },
    ],
    certificates: [
      {
        id: "c7",
        title: { ru: "Цифровое протезирование", uz: "Raqamli protezlash" },
        year: "2023",
        image: "/images/certificates/certificate-3.svg",
      },
    ],
    serviceSlugs: [
      "ortopediya",
      "implantaciya",
      "esteticheskaya-stomatologiya",
    ],
    specializations: {
      ru: ["Ортопедия", "Протезирование"],
      uz: ["Ortopediya", "Protezlash"],
    },
    demo: true,
  },
  {
    id: "6",
    slug: "abdullayeva-sevara",
    name: { ru: "Абдуллаева Севара Икромовна", uz: "Abdullayeva Sevara Ikromovna" },
    specialty: { ru: "Стоматолог-гигиенист", uz: "Stomatolog-gigiyenist" },
    experience: 7,
    category: { ru: "Врач второй категории", uz: "Ikkinchi toifali shifokor" },
    photo: "/images/doctors/doctor-6.svg",
    shortDescription: {
      ru: "Проводит профессиональную гигиену и подбирает домашний уход под конкретный случай.",
      uz: "Professional gigiyena oʻtkazadi va uydagi parvarishni har bir holatga moslab tanlaydi.",
    },
    biography: {
      ru: [
        "Отвечает за профилактическое направление: снятие зубных отложений, полировку, фторирование. Регулярная гигиена решает большую часть проблем до того, как они становятся лечением.",
        "На приёме разбирает технику чистки и подбирает щётку, пасту и ёршики под особенности зубного ряда пациента.",
      ],
      uz: [
        "Profilaktika yoʻnalishi uchun javob beradi: tish qoldiqlarini olish, jilolash, ftorlash. Muntazam gigiyena muammolarning koʻpini ular davolashga aylanguncha hal qiladi.",
        "Qabulda tozalash texnikasini koʻrib chiqadi va bemor tish qatorining xususiyatlariga qarab choʻtka, pasta va yorshiklarni tanlaydi.",
      ],
    },
    education: [
      {
        year: "2014 — 2019",
        institution: {
          ru: "Ташкентский государственный стоматологический институт",
          uz: "Toshkent davlat stomatologiya instituti",
        },
        specialty: { ru: "Стоматология", uz: "Stomatologiya" },
      },
    ],
    workExperience: [
      {
        period: { ru: "2019 — 2022", uz: "2019 — 2022" },
        place: {
          ru: "Стоматологическая клиника, Ташкент",
          uz: "Stomatologiya klinikasi, Toshkent",
        },
        role: { ru: "Гигиенист", uz: "Gigiyenist" },
      },
      {
        period: { ru: "2022 — н. в.", uz: "2022 — hozirgacha" },
        place: { ru: "Dentos Medical", uz: "Dentos Medical" },
        role: { ru: "Стоматолог-гигиенист", uz: "Stomatolog-gigiyenist" },
      },
    ],
    certificates: [
      {
        id: "c8",
        title: {
          ru: "Профессиональная гигиена полости рта",
          uz: "Ogʻiz boʻshligʻi professional gigiyenasi",
        },
        year: "2021",
        image: "/images/certificates/certificate-4.svg",
      },
    ],
    serviceSlugs: [
      "professionalnaya-gigiena",
      "esteticheskaya-stomatologiya",
      "diagnostika",
    ],
    specializations: {
      ru: ["Гигиена", "Профилактика"],
      uz: ["Gigiyena", "Profilaktika"],
    },
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
