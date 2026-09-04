"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";

/**
 * Галерея с просмотром во весь экран (раздел 17 ТЗ).
 *
 * Внутри модального окна работают стрелки клавиатуры — так листать быстрее,
 * чем целиться мышью в кнопки.
 */
export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openIndex, step]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <Section tone="milk" id="gallery">
      <div className="container-page">
        <SectionHeading
          eyebrow="Галерея"
          title="Как выглядит клиника"
          description="Кабинеты, оборудование и зоны, где вы проведёте время до и во время приёма."
        />

        {/* Первая карточка шире остальных: сетка не выглядит однообразной,
            и взгляд получает точку входа. Соотношение у всех одинаковое —
            иначе кадрирование срезало бы края фотографии. */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Открыть фотографию: ${item.caption}`}
              className={cn(
                "group relative aspect-4/3 overflow-hidden rounded-card bg-mist",
                index === 0 && "col-span-2",
              )}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-3 text-left text-[13px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={active !== null}
        onClose={close}
        title={active?.caption ?? "Фотография"}
      >
        {active && (
          <figure className="flex flex-col items-center gap-4">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-card bg-milk">
              <Image
                src={active.src}
                alt={active.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <figcaption className="flex items-center gap-6 text-sm text-white/80">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Предыдущая фотография"
                className="rounded-pill bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <span className="tabular">
                {active.caption} · {(openIndex ?? 0) + 1} из {items.length}
              </span>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Следующая фотография"
                className="rounded-pill bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </figcaption>
          </figure>
        )}
      </Modal>
    </Section>
  );
}
