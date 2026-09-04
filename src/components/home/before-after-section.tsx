"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CompareSlider } from "@/components/shared/compare-slider";
import { DemoNotice } from "@/components/shared/demo-notice";
import { beforeAfter } from "@/data/before-after";
import { useI18n } from "@/i18n/context";
import { localizedPath, pick } from "@/i18n";
import { cn } from "@/lib/cn";

/**
 * Раздел «До и после» (раздел 17 ТЗ).
 *
 * Случаи переключаются вкладками, а не выкладываются подряд: четыре шторки
 * на одной странице соревновались бы друг с другом, и человек не понял бы,
 * с какой начинать. Активный случай показан один и занимает всю ширину.
 */
export function BeforeAfterSection({ tone = "paper" }: { tone?: "paper" | "milk" }) {
  const { dict, locale } = useI18n();
  const [activeId, setActiveId] = useState(beforeAfter[0]?.id);

  const active = beforeAfter.find((item) => item.id === activeId);
  if (!active) return null;

  const title = pick(active.title, locale);

  return (
    <Section tone={tone} id="before-after">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.beforeAfter.eyebrow}
          title={dict.beforeAfter.title}
          description={dict.beforeAfter.description}
        />

        <Reveal
          as="div"
          role="tablist"
          aria-label={dict.beforeAfter.title}
          className="mt-10 flex flex-wrap gap-2"
        >
          {beforeAfter.map((item) => {
            const selected = item.id === active.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ba-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`ba-panel-${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "rounded-pill border px-4 py-2 text-sm transition-colors",
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-paper text-ink-2 hover:border-accent-line hover:bg-accent-soft hover:text-accent",
                )}
              >
                {pick(item.title, locale)}
              </button>
            );
          })}
        </Reveal>

        <div
          // Ключ по случаю: при переключении вкладки панель появляется
          // заново, а не подменяет содержимое на месте.
          key={active.id}
          role="tabpanel"
          id={`ba-panel-${active.id}`}
          aria-labelledby={`ba-tab-${active.id}`}
          className="mt-6 grid animate-fade-in gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"
        >
          <CompareSlider
            // Ключ по случаю: при переключении вкладки шторка возвращается
            // в середину, иначе новый снимок открывался бы наполовину скрытым.
            key={active.id}
            before={active.before}
            after={active.after}
            beforeLabel={dict.beforeAfter.before}
            afterLabel={dict.beforeAfter.after}
            handleLabel={dict.beforeAfter.handle}
            alt={title}
          />

          <div className="flex flex-col gap-5">
            <h3 className="display text-[24px] sm:text-[28px]">{title}</h3>

            <p className="text-[15px] leading-relaxed text-ink-2">
              {pick(active.description, locale)}
            </p>

            <p className="flex items-center gap-2 text-[14px] text-ink-2">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {dict.beforeAfter.duration}{" "}
              <span className="text-ink">{pick(active.duration, locale)}</span>
            </p>

            <NextLink
              href={localizedPath(`/services/${active.serviceSlug}`, locale)}
              className="inline-flex items-center gap-1.5 self-start text-sm text-accent transition-colors hover:text-accent-hover"
            >
              {dict.beforeAfter.aboutService}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </NextLink>

            {active.demo && (
              <DemoNotice className="mt-auto">
                {dict.beforeAfter.demoNotice}
              </DemoNotice>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
