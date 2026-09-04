import type { WorkExperienceItem } from "@/types/doctor";

/** Опыт работы в виде временной шкалы (раздел 10 ТЗ). */
export function DoctorTimeline({ items }: { items: WorkExperienceItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="display text-[28px] sm:text-[34px]">Опыт работы</h2>

      <ol className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={`${item.period}-${item.place}`}
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
              <span className="text-[13px] text-accent tabular">{item.period}</span>
              <span className="text-[16px] font-medium text-ink">{item.place}</span>
              <span className="text-sm text-ink-2">{item.role}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
