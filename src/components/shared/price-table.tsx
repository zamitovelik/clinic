import { fill, getDictionary, pick, type Locale } from "@/i18n";
import type { PriceItem } from "@/data/prices";
import { cn } from "@/lib/cn";

/** Одна цена строкой: «от 350 000 сум» или «по итогам осмотра». */
export function formatPrice(item: PriceItem, locale: Locale): string {
  const dict = getDictionary(locale);
  if (!item.price) return dict.prices.onRequest;

  const template = item.price.from ? dict.prices.from : dict.prices.exact;
  return fill(template, {
    amount: item.price.amount,
    currency: dict.prices.currency,
  });
}

/**
 * Таблица цен.
 *
 * Это список, а не `<table>`: колонок всего две, и на телефоне список
 * переносится, тогда как таблица начала бы разъезжаться по горизонтали.
 * Цены без суммы («по итогам осмотра») набраны тем же кеглем, но приглушённо,
 * чтобы строка не выглядела пустой.
 */
export function PriceTable({
  items,
  locale,
  className,
}: {
  items: PriceItem[];
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-line bg-paper",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-milk px-5 py-3">
        <span className="text-[12px] font-semibold tracking-wide text-ink-3 uppercase">
          {dict.prices.service}
        </span>
        <span className="text-[12px] font-semibold tracking-wide text-ink-3 uppercase">
          {dict.prices.price}
        </span>
      </div>

      <ul>
        {items.map((item) => {
          const title = pick(item.title, locale);
          const value = formatPrice(item, locale);

          return (
            <li
              key={title}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 last:border-b-0"
            >
              <span className="min-w-0 text-[15px] leading-snug text-ink">
                {title}
              </span>
              <span
                className={cn(
                  "shrink-0 text-[15px] whitespace-nowrap tabular",
                  item.price ? "font-medium text-ink" : "text-ink-3",
                )}
              >
                {value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
