"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { useI18n } from "@/i18n/context";
import { pick } from "@/i18n";
import { cn } from "@/lib/cn";

/**
 * Карта расположения клиники (раздел 18 ТЗ).
 *
 * Виджет Яндекс Карт грузится не сразу, а по нажатию. Причины две: он тянет
 * около мегабайта чужих скриптов и заметно портит показатели загрузки, а ещё
 * ставит свои cookie до того, как человек вообще решил смотреть карту.
 * До нажатия на его месте лежит статичная подложка того же размера —
 * страница не дёргается, когда карта появляется.
 *
 * Ключ API виджету не нужен: `map-widget/v1` — публичная вставка.
 */
export function ClinicMap({ className }: { className?: string }) {
  const { dict, locale } = useI18n();
  const [loaded, setLoaded] = useState(false);

  const address = pick(company.addressFull, locale);
  const { latitude, longitude } = company.coordinates;

  // Яндекс принимает координаты в порядке «долгота, широта».
  const point = `${longitude},${latitude}`;
  const widgetUrl =
    `https://yandex.uz/map-widget/v1/?ll=${encodeURIComponent(point)}` +
    `&z=17&pt=${encodeURIComponent(`${point},pm2rdm`)}&lang=${locale === "uz" ? "uz_UZ" : "ru_RU"}`;
  const externalUrl = `https://yandex.uz/maps/?text=${encodeURIComponent(address)}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-line bg-mist",
        className,
      )}
    >
      {loaded ? (
        <iframe
          src={widgetUrl}
          title={`${dict.location.mapAlt}: ${address}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`${dict.location.mapShow}: ${address}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Подложка нарисована под эту кнопку: схема кварталов, свободная
              середина и никакого знака, с которым текст мог бы столкнуться. */}
          <Image
            src="/images/map-facade.svg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover"
          />

          {/* Нижний отступ держит кнопку выше карточки с адресом: на узком
              экране карта невысокая, и по центру кнопка легла бы прямо под неё. */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 pb-28 sm:pb-32">
            <span className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors group-hover:bg-accent-hover">
              <MapPin className="h-4 w-4" aria-hidden />
              {dict.location.mapShow}
            </span>
            <span className="hidden max-w-[17rem] text-center text-[12px] leading-relaxed text-ink-2 sm:block">
              {dict.location.mapHint}
            </span>
          </span>
        </button>
      )}

      {/* Карточка адреса остаётся поверх карты: на виджете подпись мелкая,
          а адрес — то, ради чего сюда смотрят. */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-1 rounded-card border border-line bg-paper p-4 sm:inset-x-6 sm:bottom-6 sm:max-w-xs">
        <p className="text-sm font-semibold text-ink">{company.name}</p>
        <p className="text-[13px] text-ink-2">{address}</p>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto mt-1 inline-flex items-center gap-1.5 text-[13px] text-accent transition-colors hover:text-accent-hover"
        >
          {dict.location.mapOpen}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
