import type { Service, ServiceCategory } from "@/types/service";

/**
 * Каталог услуг на двух языках.
 *
 * Описания процедур составлены из общих сведений о стоматологическом лечении
 * и не содержат утверждений о самой клинике: ни о ценах, ни о применяемых
 * марках материалов, ни о сроках гарантии. Всё это заказчик добавит своими
 * данными — структура для них уже готова (`priceFrom`, `prices`).
 */

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "treatment",
    title: { ru: "Лечение и хирургия", uz: "Davolash va jarrohlik" },
    summary: {
      ru: "Помощь при боли, кариесе, воспалении и удалении зубов",
      uz: "Ogʻriq, kariyes, yalligʻlanish va tish olishda yordam",
    },
  },
  {
    slug: "restoration",
    title: { ru: "Восстановление зубов", uz: "Tishlarni tiklash" },
    summary: {
      ru: "Возвращение формы, функции и внешнего вида зубного ряда",
      uz: "Tish qatorining shakli, vazifasi va koʻrinishini qaytarish",
    },
  },
  {
    slug: "alignment",
    title: { ru: "Исправление прикуса", uz: "Tishlashni toʻgʻrilash" },
    summary: {
      ru: "Ортодонтическое лечение для детей и взрослых",
      uz: "Bolalar va kattalar uchun ortodontik davolash",
    },
  },
  {
    slug: "prevention",
    title: { ru: "Профилактика и диагностика", uz: "Profilaktika va diagnostika" },
    summary: {
      ru: "Регулярный уход, который избавляет от сложного лечения",
      uz: "Murakkab davolashdan xalos qiladigan muntazam parvarish",
    },
  },
];

export const services: Service[] = [
  {
    id: "therapy",
    slug: "terapiya",
    categorySlug: "treatment",
    title: { ru: "Терапия", uz: "Terapiya" },
    summary: {
      ru: "Лечение кариеса и его осложнений с восстановлением естественной формы зуба.",
      uz: "Kariyes va uning asoratlarini davolash, tishning tabiiy shaklini tiklash.",
    },
    description: {
      ru: "Терапевтическое лечение направлено на то, чтобы сохранить собственный зуб. Врач убирает поражённые ткани, дезинфицирует полость и восстанавливает коронковую часть пломбировочным материалом, подбирая оттенок под соседние зубы. При воспалении пульпы проводится эндодонтическое лечение: обработка и пломбирование корневых каналов.",
      uz: "Terapevtik davolashdan maqsad — oʻz tishini saqlab qolish. Shifokor zararlangan toʻqimalarni olib tashlaydi, boʻshliqni dezinfeksiya qiladi va tish tojini plomba materiali bilan tiklaydi, rangini qoʻshni tishlarga moslab tanlaydi. Pulpa yalligʻlanganda endodontik davolash oʻtkaziladi: ildiz kanallarini tozalash va plombalash.",
    },
    includes: {
      ru: [
        "Осмотр и постановка диагноза",
        "Обезболивание",
        "Удаление поражённых тканей",
        "Восстановление формы и цвета зуба",
        "Рекомендации по уходу",
      ],
      uz: [
        "Koʻrik va tashxis qoʻyish",
        "Ogʻriqsizlantirish",
        "Zararlangan toʻqimalarni olib tashlash",
        "Tish shakli va rangini tiklash",
        "Parvarish boʻyicha tavsiyalar",
      ],
    },
    stages: [
      {
        title: { ru: "Диагностика", uz: "Diagnostika" },
        text: {
          ru: "Осмотр, при необходимости снимок, определение глубины поражения.",
          uz: "Koʻrik, zarur boʻlsa rentgen, zarar chuqurligini aniqlash.",
        },
      },
      {
        title: { ru: "Подготовка", uz: "Tayyorgarlik" },
        text: {
          ru: "Обезболивание и изоляция зуба от слюны — без этого пломба служит меньше.",
          uz: "Ogʻriqsizlantirish va tishni soʻlakdan ajratish — busiz plomba kamroq xizmat qiladi.",
        },
      },
      {
        title: { ru: "Лечение", uz: "Davolash" },
        text: {
          ru: "Удаление поражённых тканей и обработка полости или каналов.",
          uz: "Zararlangan toʻqimalarni olib tashlash, boʻshliq yoki kanallarni tozalash.",
        },
      },
      {
        title: { ru: "Восстановление", uz: "Tiklash" },
        text: {
          ru: "Послойная реставрация, шлифовка и полировка по прикусу.",
          uz: "Qatlamma-qatlam tiklash, tishlashga moslab silliqlash va jilolash.",
        },
      },
    ],
    durationMinutes: 60,
    image: "/images/gallery/gallery-1.svg",
  },
  {
    id: "surgery",
    slug: "hirurgiya",
    categorySlug: "treatment",
    title: { ru: "Хирургия", uz: "Jarrohlik" },
    summary: {
      ru: "Удаление зубов и небольшие операции в полости рта под местной анестезией.",
      uz: "Tish olish va ogʻiz boʻshligʻidagi kichik operatsiyalar mahalliy ogʻriqsizlantirish ostida.",
    },
    description: {
      ru: "Хирургический приём нужен, когда зуб невозможно сохранить или когда он мешает соседним: разрушенные корни, ретинированные зубы мудрости, кисты. Отдельное направление — подготовка кости к имплантации: костная пластика и синус-лифтинг.",
      uz: "Jarrohlik qabuli tishni saqlab qolish imkoni boʻlmaganda yoki u qoʻshni tishlarga xalaqit berganda kerak boʻladi: buzilgan ildizlar, chiqmagan aql tishlari, kistalar. Alohida yoʻnalish — suyakni implantatsiyaga tayyorlash: suyak plastikasi va sinus-lifting.",
    },
    includes: {
      ru: [
        "Консультация и снимок",
        "Местная анестезия",
        "Проведение вмешательства",
        "Наложение швов при необходимости",
        "Контрольный осмотр",
      ],
      uz: [
        "Maslahat va rentgen",
        "Mahalliy ogʻriqsizlantirish",
        "Aralashuvni oʻtkazish",
        "Zarur boʻlsa chok qoʻyish",
        "Nazorat koʻrigi",
      ],
    },
    stages: [
      {
        title: { ru: "Обследование", uz: "Tekshiruv" },
        text: {
          ru: "Снимок и оценка положения корней и соседних структур.",
          uz: "Rentgen va ildizlar hamda qoʻshni tuzilmalar holatini baholash.",
        },
      },
      {
        title: { ru: "Планирование", uz: "Rejalashtirish" },
        text: {
          ru: "Выбор методики и объёма вмешательства, обсуждение с пациентом.",
          uz: "Usul va aralashuv hajmini tanlash, bemor bilan muhokama qilish.",
        },
      },
      {
        title: { ru: "Операция", uz: "Operatsiya" },
        text: {
          ru: "Вмешательство под местной анестезией.",
          uz: "Mahalliy ogʻriqsizlantirish ostida aralashuv.",
        },
      },
      {
        title: { ru: "Наблюдение", uz: "Kuzatuv" },
        text: {
          ru: "Рекомендации на период заживления и контрольный приём.",
          uz: "Bitish davri uchun tavsiyalar va nazorat qabuli.",
        },
      },
    ],
    durationMinutes: 60,
    image: "/images/gallery/gallery-2.svg",
  },
  {
    id: "prosthetics",
    slug: "ortopediya",
    categorySlug: "restoration",
    title: { ru: "Ортопедия", uz: "Ortopediya" },
    summary: {
      ru: "Коронки, вкладки и протезы, когда собственных тканей зуба осталось мало.",
      uz: "Tishning oʻz toʻqimasi kam qolganda koronka, qoplama va protezlar.",
    },
    description: {
      ru: "Ортопедическое лечение возвращает зубному ряду жевательную функцию и внешний вид. Врач снимает слепок или делает цифровое сканирование, зубной техник изготавливает конструкцию, после примерки её фиксируют. Правильно распределённая нагрузка защищает оставшиеся зубы от перегрузки.",
      uz: "Ortopedik davolash tish qatoriga chaynash vazifasi va koʻrinishini qaytaradi. Shifokor qolip oladi yoki raqamli skanerlash qiladi, tish texnigi konstruksiyani tayyorlaydi, oʻlchab koʻrilgach u mahkamlanadi. Toʻgʻri taqsimlangan yuk qolgan tishlarni ortiqcha zoʻriqishdan asraydi.",
    },
    includes: {
      ru: [
        "Планирование конструкции",
        "Подготовка опорных зубов",
        "Слепок или цифровое сканирование",
        "Примерка и коррекция",
        "Фиксация и настройка прикуса",
      ],
      uz: [
        "Konstruksiyani rejalashtirish",
        "Tayanch tishlarni tayyorlash",
        "Qolip yoki raqamli skanerlash",
        "Oʻlchab koʻrish va tuzatish",
        "Mahkamlash va tishlashni sozlash",
      ],
    },
    stages: [
      {
        title: { ru: "Консультация", uz: "Maslahat" },
        text: {
          ru: "Оценка состояния зубов и выбор типа конструкции.",
          uz: "Tishlar holatini baholash va konstruksiya turini tanlash.",
        },
      },
      {
        title: { ru: "Подготовка", uz: "Tayyorgarlik" },
        text: {
          ru: "Лечение опорных зубов, обточка при необходимости.",
          uz: "Tayanch tishlarni davolash, zarur boʻlsa charxlash.",
        },
      },
      {
        title: { ru: "Изготовление", uz: "Tayyorlash" },
        text: {
          ru: "Работа зуботехнической лаборатории по слепку.",
          uz: "Tish-texnika laboratoriyasining qolip boʻyicha ishi.",
        },
      },
      {
        title: { ru: "Фиксация", uz: "Mahkamlash" },
        text: {
          ru: "Примерка, коррекция по прикусу, установка.",
          uz: "Oʻlchab koʻrish, tishlashga moslash, oʻrnatish.",
        },
      },
    ],
    durationMinutes: 90,
    image: "/images/gallery/gallery-3.svg",
  },
  {
    id: "implantation",
    slug: "implantaciya",
    categorySlug: "restoration",
    title: { ru: "Имплантация", uz: "Implantatsiya" },
    summary: {
      ru: "Восстановление утраченного зуба без обточки соседних — с опорой на имплант.",
      uz: "Yoʻqolgan tishni qoʻshnilarini charxlamasdan tiklash — implantga tayanib.",
    },
    description: {
      ru: "Имплант заменяет корень зуба и принимает на себя жевательную нагрузку, поэтому кость вокруг него не убывает так, как под съёмным протезом. Лечение идёт в два этапа: установка импланта и, после приживления, фиксация коронки. Сроки зависят от состояния кости и определяются после снимка.",
      uz: "Implant tish ildizini almashtiradi va chaynash yukini oʻziga oladi, shuning uchun uning atrofidagi suyak olinadigan protez ostidagidek kamaymaydi. Davolash ikki bosqichda boradi: implantni oʻrnatish va u bitgach koronkani mahkamlash. Muddatlar suyak holatiga bogʻliq va rentgendan keyin aniqlanadi.",
    },
    includes: {
      ru: [
        "Компьютерная томография",
        "Планирование положения импланта",
        "Установка импланта",
        "Период приживления",
        "Установка коронки",
      ],
      uz: [
        "Kompyuter tomografiyasi",
        "Implant joylashuvini rejalashtirish",
        "Implantni oʻrnatish",
        "Bitish davri",
        "Koronkani oʻrnatish",
      ],
    },
    stages: [
      {
        title: { ru: "Диагностика", uz: "Diagnostika" },
        text: {
          ru: "Томография, оценка объёма кости и плана лечения.",
          uz: "Tomografiya, suyak hajmi va davolash rejasini baholash.",
        },
      },
      {
        title: { ru: "Установка", uz: "Oʻrnatish" },
        text: {
          ru: "Имплант устанавливается под местной анестезией.",
          uz: "Implant mahalliy ogʻriqsizlantirish ostida oʻrnatiladi.",
        },
      },
      {
        title: { ru: "Приживление", uz: "Bitish" },
        text: {
          ru: "Кость срастается с поверхностью импланта; срок определяет врач.",
          uz: "Suyak implant yuzasi bilan birikadi; muddatni shifokor belgilaydi.",
        },
      },
      {
        title: { ru: "Коронка", uz: "Koronka" },
        text: {
          ru: "Изготовление и фиксация постоянной коронки.",
          uz: "Doimiy koronkani tayyorlash va mahkamlash.",
        },
      },
    ],
    durationMinutes: 90,
    image: "/images/gallery/gallery-4.svg",
  },
  {
    id: "aesthetic",
    slug: "esteticheskaya-stomatologiya",
    categorySlug: "restoration",
    title: { ru: "Эстетическая стоматология", uz: "Estetik stomatologiya" },
    summary: {
      ru: "Виниры, реставрации и отбеливание — работа с внешним видом улыбки.",
      uz: "Vinirlar, restavratsiya va oqartirish — tabassum koʻrinishi ustida ish.",
    },
    description: {
      ru: "Эстетическое направление занимается формой, цветом и положением видимых зубов. В зависимости от задачи это может быть художественная реставрация, керамические виниры или профессиональное отбеливание. Перед эстетической работой зубы обязательно приводят в здоровое состояние.",
      uz: "Estetik yoʻnalish koʻrinadigan tishlarning shakli, rangi va joylashuvi bilan shugʻullanadi. Vazifaga qarab bu badiiy restavratsiya, keramik vinirlar yoki professional oqartirish boʻlishi mumkin. Estetik ishdan oldin tishlar albatta sogʻlom holatga keltiriladi.",
    },
    includes: {
      ru: [
        "Оценка формы и цвета зубного ряда",
        "Подбор оттенка",
        "Санация перед эстетической работой",
        "Изготовление и фиксация конструкций",
        "Рекомендации по сохранению результата",
      ],
      uz: [
        "Tish qatori shakli va rangini baholash",
        "Rang tanlash",
        "Estetik ishdan oldin sanatsiya",
        "Konstruksiyalarni tayyorlash va mahkamlash",
        "Natijani saqlash boʻyicha tavsiyalar",
      ],
    },
    stages: [
      {
        title: { ru: "Обсуждение", uz: "Muhokama" },
        text: {
          ru: "Что именно не устраивает и какого результата ждём.",
          uz: "Aynan nima qoniqtirmaydi va qanday natija kutilyapti.",
        },
      },
      {
        title: { ru: "Подготовка", uz: "Tayyorgarlik" },
        text: {
          ru: "Лечение и профессиональная гигиена.",
          uz: "Davolash va professional gigiyena.",
        },
      },
      {
        title: { ru: "Работа", uz: "Ish" },
        text: {
          ru: "Реставрация, виниры или отбеливание.",
          uz: "Restavratsiya, vinirlar yoki oqartirish.",
        },
      },
      {
        title: { ru: "Поддержание", uz: "Saqlash" },
        text: {
          ru: "График осмотров, чтобы результат держался.",
          uz: "Natija saqlanishi uchun koʻriklar jadvali.",
        },
      },
    ],
    durationMinutes: 90,
    image: "/images/gallery/gallery-5.svg",
  },
  {
    id: "orthodontics",
    slug: "ortodontiya",
    categorySlug: "alignment",
    title: { ru: "Ортодонтия", uz: "Ortodontiya" },
    summary: {
      ru: "Брекеты и элайнеры для исправления положения зубов и прикуса.",
      uz: "Tishlar joylashuvi va tishlashni toʻgʻrilash uchun breketlar va aylaynerlar.",
    },
    description: {
      ru: "Ортодонтическое лечение выравнивает зубной ряд и распределяет жевательную нагрузку равномерно. Начинается с диагностики: снимков, слепков и расчёта. Далее врач подбирает аппаратуру — несъёмную брекет-систему или прозрачные элайнеры — и ведёт пациента до ретенционного периода.",
      uz: "Ortodontik davolash tish qatorini tekislaydi va chaynash yukini bir tekis taqsimlaydi. Diagnostikadan boshlanadi: rentgen, qolip va hisob-kitob. Soʻng shifokor moslamani tanlaydi — olinmaydigan breket-tizim yoki shaffof aylaynerlar — va bemorni retensiya davrigacha olib boradi.",
    },
    includes: {
      ru: [
        "Диагностика и расчёт",
        "План лечения со сроками",
        "Установка аппаратуры",
        "Регулярные коррекции",
        "Ретенционный период",
      ],
      uz: [
        "Diagnostika va hisob-kitob",
        "Muddatlari bilan davolash rejasi",
        "Moslamani oʻrnatish",
        "Muntazam tuzatishlar",
        "Retensiya davri",
      ],
    },
    stages: [
      {
        title: { ru: "Диагностика", uz: "Diagnostika" },
        text: {
          ru: "Снимки, слепки, анализ прикуса.",
          uz: "Rentgen, qoliplar, tishlash tahlili.",
        },
      },
      {
        title: { ru: "План", uz: "Reja" },
        text: {
          ru: "Выбор аппаратуры и обсуждение сроков.",
          uz: "Moslamani tanlash va muddatlarni muhokama qilish.",
        },
      },
      {
        title: { ru: "Активное лечение", uz: "Faol davolash" },
        text: {
          ru: "Перемещение зубов с регулярными приёмами.",
          uz: "Muntazam qabullar bilan tishlarni siljitish.",
        },
      },
      {
        title: { ru: "Ретенция", uz: "Retensiya" },
        text: {
          ru: "Закрепление результата ретейнером.",
          uz: "Natijani reteyner bilan mustahkamlash.",
        },
      },
    ],
    durationMinutes: 60,
    image: "/images/gallery/gallery-6.svg",
  },
  {
    id: "pediatric",
    slug: "detskaya-stomatologiya",
    categorySlug: "prevention",
    title: { ru: "Детская стоматология", uz: "Bolalar stomatologiyasi" },
    summary: {
      ru: "Приём детей с бережной адаптацией и профилактикой кариеса.",
      uz: "Bolalarni ehtiyotkorona moslashtirish va kariyes profilaktikasi bilan qabul qilish.",
    },
    description: {
      ru: "Детский приём отличается не только объёмом лечения, но и его темпом: первая встреча часто уходит на знакомство с кабинетом. Основа детского направления — профилактика: герметизация фиссур, фторирование, обучение чистке. Лечение молочных зубов важно потому, что от их состояния зависят зачатки постоянных.",
      uz: "Bolalar qabuli davolash hajmi bilangina emas, uning surʼati bilan ham farq qiladi: birinchi uchrashuv koʻpincha xona bilan tanishishga ketadi. Bolalar yoʻnalishining asosi — profilaktika: fissuralarni germetiklash, ftorlash, tozalashni oʻrgatish. Sut tishlarini davolash muhim, chunki doimiy tishlar kurtagi ularning holatiga bogʻliq.",
    },
    includes: {
      ru: [
        "Знакомство и адаптация",
        "Осмотр в игровой форме",
        "Профилактика кариеса",
        "Лечение молочных зубов",
        "Разговор с родителями об уходе",
      ],
      uz: [
        "Tanishuv va moslashuv",
        "Oʻyin tarzida koʻrik",
        "Kariyes profilaktikasi",
        "Sut tishlarini davolash",
        "Ota-onalar bilan parvarish haqida suhbat",
      ],
    },
    stages: [
      {
        title: { ru: "Знакомство", uz: "Tanishuv" },
        text: {
          ru: "Ребёнок осваивается в кабинете без лечения.",
          uz: "Bola davolashsiz xonaga koʻnikadi.",
        },
      },
      {
        title: { ru: "Осмотр", uz: "Koʻrik" },
        text: {
          ru: "Оценка состояния зубов и прикуса.",
          uz: "Tishlar va tishlash holatini baholash.",
        },
      },
      {
        title: { ru: "Профилактика", uz: "Profilaktika" },
        text: {
          ru: "Герметизация фиссур, фторирование, чистка.",
          uz: "Fissuralarni germetiklash, ftorlash, tozalash.",
        },
      },
      {
        title: { ru: "Лечение", uz: "Davolash" },
        text: {
          ru: "При необходимости — короткими комфортными приёмами.",
          uz: "Zarur boʻlsa — qisqa va qulay qabullar bilan.",
        },
      },
    ],
    durationMinutes: 45,
    image: "/images/gallery/gallery-7.svg",
  },
  {
    id: "hygiene",
    slug: "professionalnaya-gigiena",
    categorySlug: "prevention",
    title: { ru: "Профессиональная гигиена", uz: "Professional gigiyena" },
    summary: {
      ru: "Снятие налёта и зубного камня — то, что не убирается щёткой дома.",
      uz: "Karash va tish toshini olib tashlash — uyda choʻtka bilan ketmaydigan narsa.",
    },
    description: {
      ru: "Профессиональная чистка убирает твёрдые отложения и налёт в местах, недоступных зубной щётке. Это основная профилактика кариеса и заболеваний дёсен, а также обязательный этап перед отбеливанием, протезированием и ортодонтическим лечением.",
      uz: "Professional tozalash tish choʻtkasi yetib bormaydigan joylardagi qattiq qoldiq va karashni olib tashlaydi. Bu kariyes va milk kasalliklarining asosiy profilaktikasi, shuningdek oqartirish, protezlash va ortodontik davolash oldidan majburiy bosqich.",
    },
    includes: {
      ru: [
        "Ультразвуковое снятие зубного камня",
        "Удаление налёта",
        "Полировка",
        "Фторирование по показаниям",
        "Подбор средств для домашнего ухода",
      ],
      uz: [
        "Tish toshini ultratovush bilan olib tashlash",
        "Karashni tozalash",
        "Jilolash",
        "Koʻrsatma boʻyicha ftorlash",
        "Uyda parvarish vositalarini tanlash",
      ],
    },
    stages: [
      {
        title: { ru: "Осмотр", uz: "Koʻrik" },
        text: {
          ru: "Оценка состояния дёсен и объёма отложений.",
          uz: "Milk holati va qoldiqlar hajmini baholash.",
        },
      },
      {
        title: { ru: "Снятие отложений", uz: "Qoldiqlarni olish" },
        text: {
          ru: "Ультразвук и удаление мягкого налёта.",
          uz: "Ultratovush va yumshoq karashni tozalash.",
        },
      },
      {
        title: { ru: "Полировка", uz: "Jilolash" },
        text: {
          ru: "Сглаживание поверхности, чтобы налёт возвращался медленнее.",
          uz: "Karash sekinroq qaytishi uchun yuzani silliqlash.",
        },
      },
      {
        title: { ru: "Рекомендации", uz: "Tavsiyalar" },
        text: {
          ru: "Подбор щётки, пасты и ёршиков под ваш случай.",
          uz: "Holatingizga mos choʻtka, pasta va yorshiklarni tanlash.",
        },
      },
    ],
    durationMinutes: 45,
    image: "/images/gallery/gallery-8.svg",
  },
  {
    id: "diagnostics",
    slug: "diagnostika",
    categorySlug: "prevention",
    title: { ru: "Диагностика", uz: "Diagnostika" },
    summary: {
      ru: "Осмотр и снимки, с которых начинается любое лечение.",
      uz: "Har qanday davolash boshlanadigan koʻrik va rentgen.",
    },
    description: {
      ru: "Диагностика определяет, что именно нужно лечить и в каком порядке. Помимо осмотра она включает снимки: прицельный — по одному зубу, панорамный — по всему зубному ряду, томография — при планировании имплантации и сложной хирургии. По результатам составляется план лечения.",
      uz: "Diagnostika aynan nimani va qanday tartibda davolash kerakligini aniqlaydi. Koʻrikdan tashqari u rentgenni ham oʻz ichiga oladi: nishonli — bitta tish boʻyicha, panoramali — butun tish qatori boʻyicha, tomografiya — implantatsiya va murakkab jarrohlikni rejalashtirishda. Natijalar boʻyicha davolash rejasi tuziladi.",
    },
    includes: {
      ru: [
        "Осмотр полости рта",
        "Снимки по показаниям",
        "Оценка прикуса и состояния дёсен",
        "План лечения с очерёдностью",
        "Ответы на вопросы пациента",
      ],
      uz: [
        "Ogʻiz boʻshligʻini koʻrikdan oʻtkazish",
        "Koʻrsatma boʻyicha rentgen",
        "Tishlash va milk holatini baholash",
        "Navbati bilan davolash rejasi",
        "Bemor savollariga javoblar",
      ],
    },
    stages: [
      {
        title: { ru: "Беседа", uz: "Suhbat" },
        text: {
          ru: "Что беспокоит, что уже лечили, чего ждёте.",
          uz: "Nima bezovta qilyapti, nimani davolatgansiz, nima kutyapsiz.",
        },
      },
      {
        title: { ru: "Осмотр", uz: "Koʻrik" },
        text: {
          ru: "Оценка зубов, дёсен и прикуса.",
          uz: "Tishlar, milk va tishlashni baholash.",
        },
      },
      {
        title: { ru: "Снимки", uz: "Rentgen" },
        text: {
          ru: "По показаниям — прицельный, панорамный или томография.",
          uz: "Koʻrsatma boʻyicha — nishonli, panoramali yoki tomografiya.",
        },
      },
      {
        title: { ru: "План", uz: "Reja" },
        text: {
          ru: "Очерёдность лечения и ориентировочные сроки.",
          uz: "Davolash navbati va taxminiy muddatlar.",
        },
      },
    ],
    durationMinutes: 30,
    image: "/images/about-clinic.svg",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter((service) => service.categorySlug === categorySlug);
}
