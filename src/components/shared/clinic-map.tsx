import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";
import { getDictionary, pick, type Locale } from "@/i18n";

/**
 * Карта расположения клиники.
 *
 * Провайдер карт заказчиком пока не выбран, поэтому здесь заглушка с ровно
 * тем же соотношением сторон, что и будущая карта (раздел 18 ТЗ). Чтобы
 * подключить Yandex или Google Maps, достаточно заменить содержимое этого
 * компонента — все страницы используют его, а не вставляют карту у себя.
 */
export function ClinicMap({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const address = pick(company.addressFull, locale);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-line bg-mist",
        className,
      )}
      role="img"
      aria-label={`${dict.location.mapAlt}: ${address}`}
    >
      <Image
        src="/images/map-placeholder.svg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 640px"
        className="object-cover"
      />

      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1 rounded-card border border-line bg-paper p-4 sm:inset-x-6 sm:bottom-6 sm:max-w-xs">
        <p className="text-sm font-semibold text-ink">{company.name}</p>
        <p className="text-[13px] text-ink-2">{address}</p>
      </div>
    </div>
  );
}
