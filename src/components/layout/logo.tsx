import { Link } from "@/i18n/link";
import { cn } from "@/lib/cn";
import { company } from "@/data/company";

/**
 * Знак клиники: коронка на импланте.
 *
 * Векторная версия логотипа, присланного заказчиком (исходник —
 * `public/images/logo-source.jpg`, растр 150×150). Тот же контур лежит
 * в `public/logo-mark.svg` и `public/logo.svg` — для визиток, документов
 * и всего, что делается вне сайта.
 *
 * Здесь знак вставлен разметкой, а не картинкой: так он красится через
 * `currentColor` и в тёмном подвале становится светлым без второго файла.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 128" className={className} aria-hidden focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Коронка: две незамкнутые дуги, снизу открыта — как в оригинале. */}
        <path d="M 34 68 C 23 57 19 43 21 32 C 23 19 35 12 42 18.5 C 46 21.5 48.5 25.5 50 29.5" />
        <path d="M 50 29.5 C 51.5 25.5 54 21.5 58 18.5 C 65 12 77 19 79 32 C 81 43 77 57 66 68" />

        {/* Витки резьбы: провисают в середине и подскакивают справа. */}
        <path d="M 31 76 Q 48 78.72 65 73.28" />
        <path d="M 33.5 87 Q 48 89.32 62.5 84.68" />
        <path d="M 36 97 Q 48 98.92 60 95.08" />
        <path d="M 38.5 106 Q 48 107.52 57.5 104.48" />
        <path d="M 41 114 Q 48 115.12 55 112.88" />
        <path d="M 43.5 121 Q 48 121.72 52.5 120.28" />
      </g>
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
      {/* В светлом варианте знак наследует цвет ссылки, в обычном берёт
          собственный цвет логотипа. */}
      <Mark
        className={cn("h-9 w-[27px] shrink-0", tone === "dark" && "text-brand")}
      />
      {/* Начертание повторяет логотип заказчика: одна строка, без разрядки. */}
      <span className="text-[19px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap">
        Dentos Medical
      </span>
    </Link>
  );
}
