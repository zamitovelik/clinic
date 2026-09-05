import { Phone } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
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
          <Reveal>
            <ul className="overflow-hidden rounded-card border border-line bg-paper">
              {faq.map((item) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <Accordion
                    question={pick(item.question, locale)}
                    answer={pick(item.answer, locale)}
                  />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Карточка тянется на высоту списка вопросов, а кнопка прижата
              к низу: короткая карточка рядом с длинным списком оставляла
              справа пустое место и ряд выглядел неровным. */}
          <Reveal
            delay={80}
            as="aside"
            className="flex flex-col gap-4 rounded-card border border-line bg-milk p-7"
          >
            <p className="text-[17px] font-semibold text-ink">
              {dict.faq.stillQuestions}
            </p>
            <p className="text-[14px] leading-relaxed text-ink-2">
              {dict.faq.asideText}
            </p>
            <Button asChild variant="outline" className="mt-auto self-start">
              <a href={`tel:${company.phoneRaw}`} aria-label={dict.faq.callUs}>
                <Phone className="h-4 w-4" aria-hidden />
                {company.phone}
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
