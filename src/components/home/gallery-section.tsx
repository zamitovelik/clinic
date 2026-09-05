"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";

/** Снимок галереи с подписью уже на нужном языке. */
export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
}

/**
 * Галерея с просмотром во весь экран (раздел 17 ТЗ).
 *
 * Внутри модального окна работают стрелки клавиатуры — так листать быстрее,
 * чем целиться мышью в кнопки.
 */
export function GallerySection({ items }: { items: GalleryPhoto[] }) {
  const { dict } = useI18n();
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
          eyebrow={dict.gallery.eyebrow}
          title={dict.gallery.title}
          description={dict.gallery.description}
        />

        {/*
          Все плитки одинаковые.

          Первая была шире остальных — «чтобы взгляд получил точку входа», —
          но широкая плитка при том же соотношении сторон вдвое выше соседних.
          Строка вытягивалась под неё, а под соседними плитками оставалась
          пустота. Ровная сетка и выглядит спокойнее, и не сломается, когда
          заказчик пришлёт не восемь фотографий, а пять или двенадцать.
        */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`${dict.gallery.open}: ${item.caption}`}
                className="group relative block aspect-4/3 w-full overflow-hidden rounded-card bg-mist"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/70 to-transparent p-3 text-left text-[13px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={active !== null}
        onClose={close}
        title={active?.caption ?? dict.gallery.photo}
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
                aria-label={dict.gallery.prev}
                className="rounded-pill bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <span className="tabular">
                {active.caption} ·{" "}
                {fill(dict.gallery.counter, {
                  index: (openIndex ?? 0) + 1,
                  total: items.length,
                })}
              </span>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label={dict.gallery.next}
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
