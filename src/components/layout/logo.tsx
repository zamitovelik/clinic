import { Link } from "@/i18n/link";
import { cn } from "@/lib/cn";
import { company } from "@/data/company";

/**
 * Знак клиники: две дуги, складывающиеся в силуэт улыбки.
 * Собственная фигура вместо иконки-зуба из набора — ТЗ прямо просит уйти
 * от шаблонной стоматологической символики.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden focusable="false">
      <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <path
        d="M7.5 12.5c0-3.1 2.9-5.5 6.5-5.5s6.5 2.4 6.5 5.5c0 4.6-3.2 8.5-6.5 8.5S7.5 17.1 7.5 12.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 7v14" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.45" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label={company.name}
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-70",
        tone === "light" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <Mark className="h-7 w-7 text-accent" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.14em] uppercase">
          Dentos
        </span>
        <span
          className={cn(
            "text-[10px] font-medium tracking-[0.28em] uppercase",
            tone === "light" ? "text-paper/60" : "text-ink-3",
          )}
        >
          Medical
        </span>
      </span>
    </Link>
  );
}
