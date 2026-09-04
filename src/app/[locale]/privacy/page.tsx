import type { Metadata } from "next";
import { company } from "@/data/company";
import { fill, getDictionary, pick, type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    robots: { index: false, follow: true },
  };
}

/*
 * Черновик политики. Описывает то, что сайт делает на самом деле, и ничего
 * сверх этого: юридические реквизиты клиники и ссылку на согласие заказчик
 * добавляет перед запуском вместе с юристом.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const vars = {
    company: company.name,
    phone: company.phone,
    address: pick(company.addressFull, locale),
  };

  return (
    <div className="container-page flex max-w-3xl flex-col gap-8 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <h1 className="display text-[34px] sm:text-[44px]">
          {dict.privacyPage.title}
        </h1>
        <p className="text-[15px] text-ink-2">
          {fill(dict.privacyPage.lead, vars)}
        </p>
      </header>

      <div className="flex flex-col gap-7">
        {dict.privacyPage.sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-[18px] font-semibold text-ink">{section.title}</h2>
            <p className="text-[15px] leading-relaxed text-ink-2">
              {fill(section.body, vars)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
