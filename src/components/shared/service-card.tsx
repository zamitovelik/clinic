import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/service";
import { cn } from "@/lib/cn";

/** Карточка услуги для сетки каталога (раздел 8 ТЗ). */
export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-card border border-line bg-paper p-6",
        "transition-colors duration-300 hover:border-accent-line hover:bg-accent-soft/40",
        className,
      )}
    >
      <h3 className="text-[19px] font-semibold text-ink">
        <Link href={`/services/${service.slug}`} className="before:absolute before:inset-0">
          {service.title}
        </Link>
      </h3>

      <p className="text-sm leading-relaxed text-ink-2">{service.summary}</p>

      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[13px] font-medium text-accent">
        Подробнее
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </article>
  );
}
