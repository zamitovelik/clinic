import { Rating } from "@/components/ui/rating";
import type { Review } from "@/types/review";
import { cn } from "@/lib/cn";
import { getDictionary, pick, type Locale } from "@/i18n";
import { formatDateFull } from "@/i18n/format";

export function ReviewCard({
  review,
  locale,
  doctorName,
  className,
}: {
  review: Review;
  locale: Locale;
  /** Подпись «о враче» — показывается в общей ленте отзывов. */
  doctorName?: string;
  className?: string;
}) {
  const dict = getDictionary(locale);

  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-4 rounded-card border border-line bg-paper p-6",
        className,
      )}
    >
      <Rating value={review.rating} />

      <blockquote className="flex-1 text-[15px] leading-relaxed text-ink-2">
        {pick(review.text, locale)}
      </blockquote>

      <figcaption className="flex flex-col gap-0.5 border-t border-line pt-4">
        <span className="text-sm font-medium text-ink">{review.authorName}</span>
        <span className="text-[13px] text-ink-3">
          {formatDateFull(review.date, dict)}
          {doctorName ? ` · ${doctorName}` : ""}
          {review.source ? ` · ${review.source}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
