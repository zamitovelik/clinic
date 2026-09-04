import { ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { company } from "@/data/company";
import { faq } from "@/data/faq";
import { getDictionary, pick, type Locale } from "@/i18n";

/**
 * Частые вопросы.
 *
 * Собран на `<details>`, а не на состоянии React: раскрытие работает до
 * загрузки скриптов, поиск по странице находит текст внутри свёрнутых
 * ответов, а с клавиатуры всё уже доступно без нашей помощи. Секция
 * серверная, поэтому в бандл ничего не добавляет.
 */
export function FaqSection({
  locale,
  tone = "paper",
}: {
  locale: Locale;
  /** На страницах, где соседняя секция белая, фон переключают на молочный. */
  tone?: "paper" | "milk";
}) {
  const dict = getDictionary(locale);

  return (
    <Section tone={tone} id="faq">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.faq.eyebrow}
          title={dict.faq.title}
          description={dict.faq.description}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <ul className="overflow-hidden rounded-card border border-line bg-paper">
            {faq.map((item) => (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-[16px] font-medium text-ink transition-colors hover:text-accent sm:px-7">
                    {pick(item.question, locale)}
                    <ChevronDown
                      className="mt-0.5 h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>

                  {/* details-body — зацепка для анимации раскрытия
                      из globals.css, а не оформление. */}
                  <div className="details-body px-5 pb-6 sm:px-7">
                    <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">
                      {pick(item.answer, locale)}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>

          <aside className="flex h-fit flex-col gap-4 rounded-card border border-line bg-milk p-7">
            <p className="text-[17px] font-semibold text-ink">
              {dict.faq.stillQuestions}
            </p>
            <p className="text-[14px] leading-relaxed text-ink-2">
              {dict.faq.asideText}
            </p>
            <Button asChild variant="outline" className="self-start">
              <a href={`tel:${company.phoneRaw}`} aria-label={dict.faq.callUs}>
                <Phone className="h-4 w-4" aria-hidden />
                {company.phone}
              </a>
            </Button>
          </aside>
        </div>
      </div>
    </Section>
  );
}
