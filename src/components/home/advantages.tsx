import {
  ClipboardList,
  HeartHandshake,
  Layers,
  Microscope,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { advantages } from "@/data/advantages";

/** Имена иконок из данных сопоставляются с компонентами здесь, а не в data. */
const ICONS: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  microscope: Microscope,
  "clipboard-list": ClipboardList,
  "heart-handshake": HeartHandshake,
  layers: Layers,
  "shield-check": ShieldCheck,
};

export function Advantages() {
  return (
    <Section tone="milk">
      <div className="container-page">
        <SectionHeading
          eyebrow="Почему Dentos Medical"
          title="Подход, из-за которого возвращаются"
          description="Мы не обещаем невозможного. Рассказываем, как устроена работа клиники, — а выводы делайте сами."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => {
            const Icon = ICONS[advantage.icon] ?? Stethoscope;

            return (
              <Reveal key={advantage.key} delay={index * 60}>
                <div className="flex h-full flex-col gap-4 bg-paper p-7 lg:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {advantage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-2">
                    {advantage.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
