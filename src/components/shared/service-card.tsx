import NextLink from "next/link";
import {
  ArrowRight,
  Baby,
  Bolt,
  Brush,
  Crown,
  Ruler,
  ScanLine,
  Scissors,
  Sparkles,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types/service";
import { cn } from "@/lib/cn";
import { getDictionary, localizedPath, pick, type Locale } from "@/i18n";

/** Имена иконок из данных сопоставляются с компонентами здесь, а не в data. */
const ICONS: Record<string, LucideIcon> = {
  syringe: Syringe,
  scissors: Scissors,
  crown: Crown,
  bolt: Bolt,
  sparkles: Sparkles,
  ruler: Ruler,
  baby: Baby,
  brush: Brush,
  "scan-line": ScanLine,
};

/** Карточка услуги для сетки каталога (раздел 8 ТЗ). */
export function ServiceCard({
  service,
  locale,
  className,
}: {
  service: Service;
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const Icon = ICONS[service.icon] ?? Sparkles;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-card border border-line bg-paper p-6",
        "transition-colors duration-300 hover:border-accent-line hover:bg-accent-soft/40",
        className,
      )}
    >
      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-pill bg-accent-soft text-accent transition-colors group-hover:bg-paper">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>

      <h3 className="text-[19px] font-semibold text-ink">
        <NextLink
          href={localizedPath(`/services/${service.slug}`, locale)}
          className="before:absolute before:inset-0"
        >
          {pick(service.title, locale)}
        </NextLink>
      </h3>

      <p className="text-sm leading-relaxed text-ink-2">
        {pick(service.summary, locale)}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[13px] font-medium text-accent">
        {dict.common.more}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </article>
  );
}
