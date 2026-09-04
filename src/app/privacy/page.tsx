import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Какие данные собирает сайт Dentos Medical при онлайн-записи и как они используются.",
  robots: { index: false, follow: true },
};

/*
 * Черновик политики. Описывает то, что сайт делает на самом деле, и ничего
 * сверх этого: юридические реквизиты клиники и ссылку на согласие заказчик
 * добавляет перед запуском вместе с юристом.
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: "Какие данные мы собираем",
      body: "При онлайн-записи вы указываете имя, номер телефона и, по желанию, комментарий к приёму. Других данных форма не запрашивает. Медицинские сведения через сайт не передаются.",
    },
    {
      title: "Зачем они нужны",
      body: "Только для того, чтобы связаться с вами и подтвердить запись на приём. Для рассылок и рекламы эти данные не используются.",
    },
    {
      title: "Кому мы их передаём",
      body: "Данные записи доступны администратору клиники. Третьим лицам они не передаются и не продаются, за исключением случаев, предусмотренных законодательством Республики Узбекистан.",
    },
    {
      title: "Сколько мы их храним",
      body: "Заявка на запись хранится столько, сколько нужно для организации приёма и последующего обслуживания. Вы вправе попросить удалить свои данные — позвоните нам.",
    },
    {
      title: "Как с нами связаться",
      body: `По любым вопросам об обработке данных звоните ${company.phone} или приходите по адресу: ${company.addressFull}.`,
    },
  ];

  return (
    <div className="container-page flex max-w-3xl flex-col gap-8 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <h1 className="display text-[34px] sm:text-[44px]">
          Политика конфиденциальности
        </h1>
        <p className="text-[15px] text-ink-2">
          Как сайт {company.name} обращается с данными, которые вы оставляете
          при записи на приём.
        </p>
      </header>

      <div className="flex flex-col gap-7">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-[18px] font-semibold text-ink">{section.title}</h2>
            <p className="text-[15px] leading-relaxed text-ink-2">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
