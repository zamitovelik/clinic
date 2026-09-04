import type { WorkExperienceItem } from "@/types/doctor";
import { getDictionary, pick, type Locale } from "@/i18n";

/** Опыт работы в виде временной шкалы (раздел 10 ТЗ). */
export function DoctorTimeline({
  items,
  locale,
}: {
  items: WorkExperienceItem[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="display text-[28px] sm:text-[34px]">
        {dict.doctorPage.workExperience}
      </h2>

      <ol className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={`${pick(item.period, locale)}-${index}`}
            className="relative flex gap-5 pb-7 last:pb-0"
          >
            {/* Линия шкалы не рисуется у последнего пункта, иначе она
                повисает в воздухе. */}
            {index < items.length - 1 && (
              <span
                aria-hidden
                className="absolute top-4 left-[5px] h-full w-px bg-line"
              />
            )}

            <span
              aria-hidden
              className="relative mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent bg-paper"
            />

            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] text-accent tabular">
                {pick(item.period, locale)}
              </span>
              <span className="text-[16px] font-medium text-ink">
                {pick(item.place, locale)}
              </span>
              <span className="text-sm text-ink-2">{pick(item.role, locale)}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
