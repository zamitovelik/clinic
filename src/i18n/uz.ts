import type { Dictionary } from "./ru";

/**
 * Узбекский словарь интерфейса. Латиница — письменность, принятая
 * в Узбекистане для официальных документов и веба.
 *
 * Тип берётся из русского словаря: если там появится новый ключ, а здесь нет,
 * проверка типов не пройдёт и перевод не забудется.
 */
export const uz: Dictionary = {
  nav: {
    about: "Klinika haqida",
    services: "Xizmatlar",
    doctors: "Shifokorlar",
    reviews: "Sharhlar",
    contacts: "Aloqa",
  },

  header: {
    book: "Yozilish",
    bookLong: "Qabulga yozilish",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    mainNav: "Asosiy navigatsiya",
    mobileNav: "Mobil navigatsiya",
    skipToContent: "Asosiy qismga oʻtish",
    toHome: "bosh sahifaga",
    language: "Til",
  },

  footer: {
    tagline:
      "Toshkentdagi stomatologiya klinikasi. Kattalar va bolalar uchun davolash, tiklash va profilaktika.",
    sections: "Boʻlimlar",
    services: "Xizmatlar",
    contacts: "Aloqa",
    privacy: "Maxfiylik siyosati",
    sitemapNav: "Sayt boʻlimlari",
  },

  mobileBar: {
    call: "Qoʻngʻiroq",
    book: "Yozilish",
  },

  common: {
    more: "Batafsil",
    back: "Orqaga",
    close: "Yopish",
    of: "dan",
  },

  hero: {
    title: "Sogʻlom tabassum toʻgʻri shifokordan boshlanadi",
    subtitle:
      "Toshkentdagi stomatologiya: bu yerda davolash kreslodan emas, diagnostika va tushunarli rejadan boshlanadi. Mutaxassisni tanlang, boʻsh vaqtni koʻring va onlayn yoziling.",
    ctaPrimary: "Qabulga yozilish",
    ctaSecondary: "Shifokorni tanlash",
    workdays: "Du — Ju 09:00 — 19:00",
    photoAlt: "Dentos Medical klinikasi xonasi",
  },

  advantages: {
    eyebrow: "Nega Dentos Medical",
    title: "Yana qaytishga sabab boʻladigan yondashuv",
    description:
      "Imkonsiz narsani vaʼda qilmaymiz. Klinika ishi qanday tashkil etilganini aytamiz — xulosani oʻzingiz chiqarasiz.",
  },

  servicesPreview: {
    eyebrow: "Bizning xizmatlar",
    title: "Nimani davolaymiz",
    description:
      "Bir martalik tozalashdan tish qatorini toʻliq tiklashgacha. Har bir yoʻnalish bilan shu sohaning mutaxassisi shugʻullanadi.",
    all: "Barcha xizmatlar",
    allMobile: "Barcha xizmatlarni koʻrish",
  },

  doctorsPreview: {
    eyebrow: "Mutaxassislar",
    title: "Ishonch bildiriladigan shifokorlar",
    description:
      "Har bir shifokorning oʻz sahifasi bor: tarjimai hol, taʼlim va qabul jadvali. Aniq mutaxassisga yozilish mumkin.",
    all: "Barcha shifokorlar",
    allMobile: "Barcha shifokorlarni koʻrish",
  },

  aboutPreview: {
    eyebrow: "Klinika haqida",
    title: "Shoshilmasdan va ortiqcha gapsiz stomatologiya",
    text1:
      "Qabulni bitta fikr atrofida quramiz: bemor oʻzida nima boʻlayotganini tushunishi kerak. Shuning uchun davolash «boraverib koʻramiz» degan taklifdan emas, diagnostika va rejadan boshlanadi.",
    text2:
      "Faqat yozuv asosida ishlaymiz — koridorda navbat yoʻq. Har bir qabulga ishni bemalol va sifatli bajarish uchun qancha vaqt kerak boʻlsa, shuncha ajratiladi.",
    more: "Klinika haqida batafsil",
    photoAlt: "Dentos Medical klinikasining ichki koʻrinishi",
  },

  reviews: {
    eyebrow: "Sharhlar",
    title: "Bemorlar nima deydi",
    description:
      "Sharhlar manbasi koʻrsatilgan holda chop etiladi. Biz ularni oʻchirmaymiz va tahrirlamaymiz.",
  },

  gallery: {
    eyebrow: "Galereya",
    title: "Klinika qanday koʻrinadi",
    description:
      "Xonalar, uskunalar va qabuldan oldin hamda qabul davomida vaqt oʻtkazadigan joylar.",
    open: "Fotosuratni ochish",
    prev: "Oldingi fotosurat",
    next: "Keyingi fotosurat",
    photo: "Fotosurat",
  },

  location: {
    eyebrow: "Bizni qanday topasiz",
    title: "Biz shu yerdamiz",
    description:
      "Klinika Toshkent markazida. Belgilangan vaqtga keling — koridorda kutish shart emas.",
    address: "Manzil",
    phone: "Telefon",
    instagram: "Instagram",
    hours: "Ish vaqti",
    route: "Marshrut qurish",
    routeShort: "Marshrut",
    mapAlt: "Xarita",
    dayOff: "Dam olish kuni",
  },

  cta: {
    title: "Qabulga onlayn yoziling",
    description:
      "Xizmat, shifokor va qulay vaqtni tanlang. Yozuvni tasdiqlash uchun qoʻngʻiroq qilamiz.",
    book: "Qabulga yozilish",
  },

  doctorCard: {
    experience: "Tajriba",
    book: "Yozilish",
  },

  doctorsPage: {
    eyebrow: "Mutaxassislar",
    title: "Ishonch bildiriladigan shifokorlar",
    description:
      "Har bir mutaxassisning oʻz sahifasi bor: tarjimai hol, taʼlim, sertifikatlar, sharhlar va qabul jadvali. Aniq shifokorga yozilish yoki yozuv paytida mos keladigan istalgan shifokorni tanlash mumkin.",
  },

  doctorPage: {
    allDoctors: "Barcha shifokorlar",
    experience: "Ish tajribasi",
    category: "Toifa",
    book: "Shifokorga yozilish",
    about: "Shifokor haqida",
    workExperience: "Ish tajribasi",
    education: "Taʼlim",
    certificates: "Sertifikat va diplomlar",
    directions: "Yoʻnalishlar",
    reviews: "Shifokor haqida sharhlar",
    noReviews: "Bu shifokor haqida hozircha sharhlar yoʻq.",
    document: "Hujjat",
  },

  schedule: {
    title: "Qabul jadvali",
    workingHours: "Ish vaqti",
    notWorking: "Qabul qilmaydi",
    nearestFree: "Eng yaqin boʻsh vaqt",
    noFree:
      "Yaqin kunlarda boʻsh vaqt yoʻq. Bizga qoʻngʻiroq qiling — variantni qoʻlda tanlaymiz.",
    allDates: "Barcha boʻsh sanalar",
    bookAt: "Yozilish:",
  },

  servicesPage: {
    eyebrow: "Bizning xizmatlar",
    title: "Nimani davolaymiz",
    description:
      "Yoʻnalishlar vazifasiga qarab guruhlangan: davolash, tiklash, tishlashni toʻgʻrilash yoki muammoning oldini olish. Har biri bilan profil mutaxassisi shugʻullanadi.",
  },

  servicePage: {
    allServices: "Barcha xizmatlar",
    duration: "Qabul taxminan {minutes} daqiqa",
    price: "Narxi",
    book: "Qabulga yozilish",
    about: "Xizmat haqida",
    includes: "Nimalar kiradi",
    stages: "Davolash qanday oʻtadi",
    doctors: "Shu yoʻnalish boʻyicha shifokorlar",
    related: "Shuningdek qarang",
  },

  appointment: {
    eyebrow: "Onlayn yozuv",
    title: "Qabulga yozilish",
    byPhoneTitle: "Telefon orqali qulayroqmi?",
    byPhoneText:
      "Qoʻngʻiroq qiling — administrator vaqt tanlaydi va davolash boʻyicha savollarga javob beradi.",
    howTitle: "Bu qanday ishlaydi",
    how1: "Siz xizmat, shifokor va vaqtni tanlaysiz.",
    how2: "Biz qoʻngʻiroq qilib yozuvni tasdiqlaymiz.",
    how3: "Belgilangan vaqtga kelasiz — navbatsiz.",
    addressTitle: "Manzil",
  },

  booking: {
    modalTitle: "Shifokorga yozilish",
    aboutDoctor: "Shifokor haqida",
    direction: "Yoʻnalish",
    directionOne: "Yoʻnalish:",
    stepsNav: "Yozilish bosqichlari",
    back: "Orqaga",
    done: "Tayyor",
  },

  steps: {
    service: "Xizmat",
    doctor: "Shifokor",
    datetime: "Sana va vaqt",
    date: "Sana",
    time: "Vaqt",
    patient: "Maʼlumotlar",
    confirm: "Tasdiqlash",
    confirmShort: "Tayyor",
  },

  stepService: {
    title: "Sizni nima bezovta qilyapti?",
    subtitle:
      "Yoʻnalishni tanlang. Ishonchingiz komil boʻlmasa — diagnostikadan boshlang, davolash hajmini shifokor qabulda aniqlaydi.",
    duration: "qabul taxminan {minutes} daqiqa",
    legend: "Xizmatni tanlash",
  },

  stepDoctor: {
    title: "Qaysi shifokorga?",
    subtitle: "Tanlangan yoʻnalish boʻyicha ishlaydigan mutaxassislar koʻrsatilgan.",
    any: "Mos keladigan istalgan shifokor",
    anyHint: "Tanlangan vaqtga mutaxassis tanlab beramiz",
    anyResult: "Mutaxassis tanlab beramiz",
    experience: "tajriba",
    empty:
      "Bu yoʻnalish boʻyicha hozircha biriktirilgan shifokor yoʻq. «Mos keladigan istalgan shifokor»ni tanlang — mutaxassis tanlab, qoʻngʻiroq qilamiz.",
    legend: "Shifokorni tanlash",
  },

  stepDate: {
    title: "Qachon sizga qulay?",
    subtitle:
      "Kunni tanlang — boʻsh vaqt darhol taqvim ostida chiqadi. Yozuv {days} oldinga ochiq.",
    prevMonth: "Oldingi oy",
    nextMonth: "Keyingi oy",
    legendFree: "Boʻsh vaqt bor",
    legendNone: "Yozuv yoʻq",
    dayFree: "{day}-sana, boʻsh {count}",
    dayBusy: "{day}-sana, yozuv yoʻq",
    noSchedule:
      "Jadval mavjud emas. Bizga qoʻngʻiroq qiling — vaqtni qoʻlda tanlaymiz.",
    legend: "Sanani tanlash",
  },

  stepTime: {
    title: "Soat nechada?",
    summary: "{weekday}, {date} — {total} dan {free} tasi boʻsh",
    morning: "Ertalab",
    day: "Kunduzi",
    evening: "Kechqurun",
    chooseDate: "Taqvimdan kunni tanlang.",
    heading: "Boʻsh vaqt",
    allBooked:
      "Bu kuni hammasi band. Boshqa sanani tanlang — bir qadam orqaga qaytish mumkin.",
    legend: "Vaqtni tanlash",
  },

  stepPatient: {
    title: "Siz bilan qanday bogʻlanamiz?",
    subtitle: "Yozuvni tasdiqlash uchun administrator qoʻngʻiroq qiladi.",
    name: "Ism",
    nameHint: "Sizga qanday murojaat qilaylik",
    phone: "Telefon",
    phoneHint: "Tasdiqlash uchun shu raqamga qoʻngʻiroq qilamiz",
    comment: "Izoh",
    commentHint: "Majburiy emas. Nima bezovta qilyapti, qabulga oid istaklar",
    submit: "Tasdiqlashga oʻtish",
  },

  stepConfirm: {
    title: "Yozuvni tekshiring",
    hintAll: "Istalgan bandni oʻzgartirish mumkin — yonidagi qalamchani bosing.",
    hintLimited:
      "Sana, vaqt va maʼlumotlaringizni oʻzgartirish mumkin — band yonidagi qalamchani bosing.",
    service: "Xizmat",
    doctor: "Shifokor",
    date: "Sana",
    time: "Vaqt",
    patient: "Bemor",
    phone: "Telefon",
    comment: "Izoh",
    edit: "Oʻzgartirish",
    submit: "Yozuvni tasdiqlash",
    consent:
      "Tugmani bosish orqali siz qabulga yozilish uchun shaxsiy maʼlumotlaringizni qayta ishlashga rozilik bildirasiz.",
  },

  success: {
    title: "Siz yozildingiz",
    text: "Yozuvni tasdiqlash uchun {phone} raqami orqali siz bilan bogʻlanamiz.",
    doctor: "Shifokor",
    service: "Xizmat",
    date: "Sana",
    time: "Vaqt",
    home: "Bosh sahifaga",
    again: "Yana yozilish",
    reschedule: "Qabulni koʻchirish yoki bekor qilish kerakmi? Bizga qoʻngʻiroq qiling:",
    rescheduleShort: "Qabulni koʻchirish yoki bekor qilish:",
  },

  validation: {
    nameRequired: "Ismingizni kiriting — sizga qanday murojaat qilaylik",
    nameTooLong: "{max} belgidan oshmasin",
    phoneInvalid: "Raqamni +998 90 123 45 67 koʻrinishida kiriting",
    commentTooLong: "{max} belgidan oshmasin",
    incomplete: "Yozuvning barcha maydonlari toʻldirilmagan",
    failed: "Yozuvni yuborib boʻlmadi. Qaytadan urinib koʻring.",
    serviceRequired: "Xizmat tanlanmagan",
    dateRequired: "Sana tanlanmagan",
    timeRequired: "Vaqt tanlanmagan",
    phoneRequired: "Telefon koʻrsatilmagan",
  },

  aboutPage: {
    eyebrow: "Klinika haqida",
    title: "Qaytishdan qoʻrqilmaydigan stomatologiya",
    lead: "{company} — Toshkent markazidagi klinika. Kattalar va bolalarni davolaymiz, buzilgan va yoʻqolgan tishlarni tiklaymiz, tishlashni toʻgʻrilaymiz va profilaktika bilan shugʻullanamiz.",
    approachTitle: "Bizning yondashuv",
    approach1:
      "Koʻpchilik stomatologga ikki qoʻrquv bilan keladi: ogʻriydi va ortiqcha narsa tayinlanadi. Qabulni shu ikkalasini ham yoʻqotadigan qilib qurdik.",
    approach2:
      "Birinchisi texnika va surʼat bilan hal boʻladi: ogʻriqsizlantirish holatga qarab tanlanadi, murakkab davolash zarur boʻlsa bir necha qisqa tashrifga boʻlinadi. Ikkinchisi — davolash rejasi: siz ishlar roʻyxatini navbati bilan koʻrasiz va nima hozir zarur, nimani keyinga qoldirish mumkinligini tushunasiz.",
    approach3:
      "Shifokorlar bemorni birgalikda olib boradi. Jarroh implant qoʻysa, unga koronkani ortoped rejalashtiradi — ikkalasi ham holat tarixini boshidan biladi, begona kartadan oʻqib emas.",
    valuesTitle: "Bizning qadriyatlar",
    values: [
      {
        title: "Avval diagnostika",
        text: "Hech qanday «yoʻl-yoʻlakay» davolash yoʻq. Avval suratga olish va koʻrik, keyin bosqichlari navbati bilan reja, va faqat shundan keyin ish.",
      },
      {
        title: "Tushunarli suhbat",
        text: "Nima boʻlayotganini lotincha atamalarsiz va qoʻrqitmasdan tushuntiramiz. Siz nima uchun toʻlayotganingizni va bu nimaga kerakligini bilishingiz kerak.",
      },
      {
        title: "Rad etish huquqi",
        text: "Bemor soddaroq davolash variantini tanlash huquqiga ega. Bizning vazifamiz — sotish emas, oqibatlari haqida halol aytish.",
      },
      {
        title: "Qabulga vaqt",
        text: "Yozuv asosida ishlaymiz va qabullarni ketma-ket tiqishtirmaymiz. Holat kutilganidan murakkabroq boʻlsa, qabul yarmida uzilmaydi.",
      },
    ],
  },

  contactsPage: {
    eyebrow: "Aloqa",
    title: "Biz bilan qanday bogʻlanasiz",
    description:
      "Qoʻngʻiroq qiling yoki onlayn yoziling — administrator vaqtni tasdiqlaydi va davolash boʻyicha savollarga javob beradi.",
    book: "Qabulga yozilish",
  },

  privacyPage: {
    title: "Maxfiylik siyosati",
    lead: "{company} sayti qabulga yozilishda qoldirgan maʼlumotlaringiz bilan qanday ishlaydi.",
    sections: [
      {
        title: "Qanday maʼlumotlarni yigʻamiz",
        body: "Onlayn yozilishda siz ism, telefon raqami va istasangiz qabulga izoh koʻrsatasiz. Boshqa maʼlumotlarni forma soʻramaydi. Tibbiy maʼlumotlar sayt orqali uzatilmaydi.",
      },
      {
        title: "Ular nima uchun kerak",
        body: "Faqat siz bilan bogʻlanish va qabulga yozuvni tasdiqlash uchun. Bu maʼlumotlar tarqatma va reklama uchun ishlatilmaydi.",
      },
      {
        title: "Kimga uzatamiz",
        body: "Yozuv maʼlumotlari klinika administratoriga ochiq. Uchinchi shaxslarga uzatilmaydi va sotilmaydi, Oʻzbekiston Respublikasi qonunchiligida nazarda tutilgan hollar bundan mustasno.",
      },
      {
        title: "Qancha vaqt saqlaymiz",
        body: "Yozuv arizasi qabulni tashkil qilish va keyingi xizmat koʻrsatish uchun qancha kerak boʻlsa, shuncha saqlanadi. Siz maʼlumotlaringizni oʻchirishni soʻrash huquqiga egasiz — bizga qoʻngʻiroq qiling.",
      },
      {
        title: "Biz bilan qanday bogʻlanish",
        body: "Maʼlumotlarni qayta ishlash boʻyicha har qanday savol bilan {phone} raqamiga qoʻngʻiroq qiling yoki manzilga keling: {address}.",
      },
    ],
  },

  notFound: {
    eyebrow: "404-xatolik",
    title: "Sahifa topilmadi",
    text: "Ehtimol sahifa oʻchirilgan yoki manzilda xato bor. Bosh sahifadan boshlang yoki darhol qabulga yoziling.",
    home: "Bosh sahifaga",
    book: "Qabulga yozilish",
  },

  meta: {
    siteTitle: "{company} — Toshkentdagi stomatologiya",
    siteDescription:
      "Toshkentdagi {company} stomatologiya klinikasi: terapiya, implantatsiya, ortodontiya, bolalar qabuli. Shifokorga onlayn yozilish. {address}.",
    ogDescription:
      "Terapiya, implantatsiya, ortodontiya va bolalar qabuli. Shifokorga onlayn yozilish.",
    keywords: [
      "Toshkent stomatologiya",
      "stomatologiya klinikasi",
      "Toshkentda tish implantatsiyasi",
      "Toshkent ortodont",
      "bolalar stomatologi",
      "Dentos Medical",
    ],
    doctorsTitle: "Shifokorlar",
    doctorsDescription:
      "Toshkentdagi Dentos Medical klinikasi mutaxassislari: terapevtlar, jarroh-implantolog, ortodont, ortoped, bolalar stomatologi va gigiyenist. Shifokorga onlayn yozilish.",
    servicesTitle: "Xizmatlar",
    servicesDescription:
      "Toshkentdagi Dentos Medical stomatologiyasi xizmatlari: terapiya, jarrohlik, implantatsiya, protezlash, ortodontiya, bolalar qabuli, professional gigiyena va diagnostika.",
    appointmentTitle: "Onlayn yozuv",
    appointmentDescription:
      "Toshkentdagi Dentos Medical stomatologiyasiga yoziling: xizmat, shifokor, sana va qulay vaqtni tanlang. Tasdiqlash telefon orqali.",
    aboutTitle: "Klinika haqida",
    aboutDescription:
      "Toshkentdagi {company} stomatologiyasi: davolashga yondashuv, klinika qadriyatlari va qabul shartlari. {address}.",
    contactsTitle: "Aloqa",
    contactsDescription:
      "{company} stomatologiyasi aloqa maʼlumotlari: {address}, telefon {phone}. Ish vaqti va yoʻl sxemasi.",
    privacyTitle: "Maxfiylik siyosati",
    privacyDescription:
      "Dentos Medical sayti onlayn yozilishda qanday maʼlumotlarni yigʻadi va ulardan qanday foydalanadi.",
    doctorNotFound: "Shifokor topilmadi",
    serviceNotFound: "Xizmat topilmadi",
    doctorDescription:
      "{name}, {specialty}. Tajriba {experience}. {summary} Dentos Medical klinikasiga onlayn yozilish.",
    serviceDescription:
      "Toshkentdagi Dentos Medical stomatologiyasida {title}. {summary} Shifokorga onlayn yozilish.",
  },

  units: {
    // В узбекском число не меняет форму слова, поэтому все три варианта совпадают.
    years: ["yil", "yil", "yil"],
    days: ["kun", "kun", "kun"],
    minutes: "daqiqa",
  },

  calendar: {
    monthsNominative: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
    ],
    monthsGenitive: [
      "yanvar", "fevral", "mart", "aprel", "may", "iyun",
      "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
    ],
    weekdaysShort: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
    weekdaysFull: [
      "Dushanba", "Seshanba", "Chorshanba", "Payshanba",
      "Juma", "Shanba", "Yakshanba",
    ],
  },
};
