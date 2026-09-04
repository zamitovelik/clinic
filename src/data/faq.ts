import type { Localized } from "@/i18n/config";

/**
 * Частые вопросы.
 *
 * Отвечают на то, что человек спрашивает до звонка, и снимают возражения,
 * из-за которых визит откладывают. Ответы описывают либо общий порядок
 * стоматологического приёма, либо то, как на самом деле работает запись
 * на этом сайте, — ничего о самой клинике не выдумано (раздел 28 ТЗ).
 *
 * Заказчик может дописать свои вопросы: про оплату, рассрочку, гарантию
 * и возраст детского приёма. Это его данные, и придумывать их нельзя.
 */

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faq: FaqItem[] = [
  {
    id: "pain",
    question: {
      ru: "Будет ли больно?",
      uz: "Ogʻriydimi?",
    },
    answer: {
      ru: "Лечение проходит под местной анестезией: препарат и дозу врач подбирает под конкретный случай. Если вы плохо переносите визиты к стоматологу, скажите об этом на первом приёме — работу разбивают на короткие этапы с паузами, и вы в любой момент можете попросить остановиться.",
      uz: "Davolash mahalliy ogʻriqsizlantirish ostida oʻtadi: dori va uning miqdorini shifokor har bir holatga qarab tanlaydi. Stomatologga tashrifni ogʻir kechirsangiz, birinchi qabulda ayting — ish tanaffuslar bilan qisqa bosqichlarga boʻlinadi va siz istalgan payt toʻxtashni soʻrashingiz mumkin.",
    },
  },
  {
    id: "visits",
    question: {
      ru: "Сколько визитов займёт лечение?",
      uz: "Davolash necha tashrifni oladi?",
    },
    answer: {
      ru: "Зависит от объёма работы. Простое лечение кариеса обычно укладывается в один приём, лечение каналов — в один-два, протезирование и имплантация идут этапами с перерывами на изготовление конструкции или приживление. Точное число врач называет после диагностики, а не по телефону: без снимка это была бы догадка.",
      uz: "Ish hajmiga bogʻliq. Oddiy kariyesni davolash odatda bitta qabulga sigʻadi, kanallarni davolash — bir-ikkitasiga, protezlash va implantatsiya esa konstruksiyani tayyorlash yoki bitish uchun tanaffuslar bilan bosqichma-bosqich boradi. Aniq sonni shifokor diagnostikadan keyin aytadi, telefon orqali emas: rentgensiz bu taxmin boʻlardi.",
    },
  },
  {
    id: "booking",
    question: {
      ru: "Нужно ли записываться заранее?",
      uz: "Oldindan yozilish kerakmi?",
    },
    answer: {
      ru: "Да, клиника работает по записи — так на каждый приём хватает времени и не возникает очереди в коридоре. Свободные часы всех врачей видны на сайте: выберите специалиста, день и время, это занимает минуту.",
      uz: "Ha, klinika yozuv asosida ishlaydi — shunda har bir qabulga vaqt yetadi va koridorda navbat paydo boʻlmaydi. Barcha shifokorlarning boʻsh soatlari saytda koʻrinadi: mutaxassis, kun va vaqtni tanlang, bu bir daqiqa oladi.",
    },
  },
  {
    id: "confirmation",
    question: {
      ru: "Что происходит после записи на сайте?",
      uz: "Saytda yozilgandan keyin nima boʻladi?",
    },
    answer: {
      ru: "Заявка попадает администратору, и он перезванивает по указанному номеру, чтобы подтвердить время. До звонка запись считается предварительной — так мы избегаем накладок, если выбранный час заняли за минуту до вас.",
      uz: "Ariza administratorga tushadi va u vaqtni tasdiqlash uchun koʻrsatilgan raqamga qoʻngʻiroq qiladi. Qoʻngʻiroqqacha yozuv dastlabki hisoblanadi — shu tariqa tanlangan soat sizdan bir daqiqa oldin band qilingan boʻlsa, chalkashlikning oldi olinadi.",
    },
  },
  {
    id: "reschedule",
    question: {
      ru: "Как отменить или перенести приём?",
      uz: "Qabulni qanday bekor qilish yoki koʻchirish mumkin?",
    },
    answer: {
      ru: "Позвоните нам — администратор освободит время и подберёт новое. Предупредить лучше заранее: освободившийся час почти всегда занимает кто-то, кому нужно срочно.",
      uz: "Bizga qoʻngʻiroq qiling — administrator vaqtni boʻshatadi va yangisini tanlaydi. Oldindan ogohlantirgan maʼqul: boʻshagan soatni deyarli har doim shoshilinch kerak boʻlgan kimdir egallaydi.",
    },
  },
  {
    id: "urgent",
    question: {
      ru: "Болит прямо сейчас — что делать?",
      uz: "Hozir ogʻriyapti — nima qilish kerak?",
    },
    answer: {
      ru: "Позвоните, не откладывая на онлайн-запись: при острой боли администратор смотрит расписание вручную и ищет ближайшее окно. До приёма не грейте больное место и не кладите таблетки на десну — от этого становится хуже.",
      uz: "Onlayn yozuvni kutmasdan qoʻngʻiroq qiling: oʻtkir ogʻriqda administrator jadvalni qoʻlda koʻrib, eng yaqin boʻsh vaqtni qidiradi. Qabulgacha ogʻriyotgan joyni isitmang va milkka dori qoʻymang — bundan holat yomonlashadi.",
    },
  },
  {
    id: "bring",
    question: {
      ru: "Нужно ли что-то приносить с собой?",
      uz: "Oʻzim bilan nimadir olib kelishim kerakmi?",
    },
    answer: {
      ru: "Если у вас есть свежие снимки, выписки или план лечения из другой клиники — возьмите их. Это экономит время и иногда позволяет не делать повторную диагностику. Если ничего нет, ничего и не нужно.",
      uz: "Yaqinda olingan rentgen, koʻchirmalar yoki boshqa klinikadagi davolash rejasi boʻlsa, ularni oling. Bu vaqtni tejaydi va baʼzan takroriy diagnostikadan qutqaradi. Hech narsa boʻlmasa, hech narsa kerak emas.",
    },
  },
];
