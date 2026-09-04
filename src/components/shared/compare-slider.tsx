"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Сравнение двух изображений шторкой.
 *
 * Верхний слой обрезается по позиции разделителя, поэтому меняется только
 * `clip-path` — браузер не перерисовывает сами картинки, и перетаскивание
 * остаётся плавным на слабом телефоне.
 *
 * Разделитель — настоящий `role="slider"`: с клавиатуры он двигается
 * стрелками, Home и End переводят его в крайние положения. Без этого
 * сравнить снимки без мыши было бы нельзя.
 */
export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  handleLabel,
  alt,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  handleLabel: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);
  // Во время перетаскивания плавность мешает: шторка отставала бы от пальца.
  // Зато при нажатии в стороне и при шаге стрелками она доезжает сама.
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const glide = dragging
    ? undefined
    : "transition-[clip-path,left] duration-300 ease-soft";

  const moveTo = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;

    const box = frame.getBoundingClientRect();
    const ratio = ((clientX - box.left) / box.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // Захват указателя: палец может уйти за пределы блока, а шторка
    // продолжит следовать за ним, пока его не отпустят.
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    // Плавность выключаем только когда палец действительно поехал:
    // от одиночного нажатия шторка должна доехать сама.
    if (!dragging) setDragging(true);
    moveTo(event.clientX);
  }

  function onPointerUp() {
    setDragging(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 2;

    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - step));
    else if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + step));
    else if (event.key === "Home") setPosition(0);
    else if (event.key === "End") setPosition(100);
    else return;

    event.preventDefault();
  }

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative aspect-4/3 w-full touch-pan-y overflow-hidden rounded-card border border-line bg-mist select-none"
    >
      <Image
        src={after}
        alt={`${alt} — ${afterLabel}`}
        fill
        sizes="(max-width: 1024px) 100vw, 760px"
        className="object-cover"
        priority={false}
      />

      {/* Слой «до» лежит поверх и обрезается по позиции разделителя. */}
      <div
        className={cn("absolute inset-0", glide)}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — ${beforeLabel}`}
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-pill bg-deep/70 px-3 py-1 text-[12px] font-medium text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-pill bg-accent/85 px-3 py-1 text-[12px] font-medium text-white">
        {afterLabel}
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label={handleLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}%`}
        onKeyDown={onKeyDown}
        className={cn(
          "absolute inset-y-0 -ml-5 flex w-10 cursor-ew-resize items-center justify-center rounded-card",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          glide,
        )}
        style={{ left: `${position}%` }}
      >
        <span aria-hidden className="absolute inset-y-0 w-0.5 bg-paper" />
        <span
          aria-hidden
          className="relative flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-paper text-ink shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
        >
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
