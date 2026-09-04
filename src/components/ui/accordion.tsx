"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** Та же кривая, что и у остального движения на сайте. */
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const OPEN_MS = 420;
const CLOSE_MS = 320;

/**
 * Раскрывающийся вопрос.
 *
 * Разметка остаётся родной — `<details>` и `<summary>`, — поэтому без
 * скриптов вопрос всё равно открывается, а поиск по странице находит текст
 * внутри свёрнутых ответов.
 *
 * Само раскрытие ведёт JS. Высоту от нуля до «сколько получится» браузер
 * средствами CSS не тянет: `::details-content` для этого и придуман, но
 * поддержан ещё неровно — там, где она частичная, ответ вовсе перестаёт
 * открываться. Здесь высота считается по факту и анимируется от текущей
 * до нужной, поэтому створка едет в обе стороны и не дёргается, если
 * нажать второй раз посреди движения.
 */
export function Accordion({
  question,
  answer,
  className,
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  // Отдельное состояние нужно стрелке: при закрытии `details.open` держится
  // до конца анимации, и стрелка разворачивалась бы с опозданием.
  const [open, setOpen] = useState(false);

  function onSummaryClick(event: React.MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const body = bodyRef.current;
    if (!details || !body) return;

    // Без Web Animations API или при выключенном движении в системе
    // отдаём управление браузеру: откроется мгновенно, как обычно.
    if (
      typeof body.animate !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOpen(!details.open);
      return;
    }

    event.preventDefault();
    animationRef.current?.cancel();

    const from = body.getBoundingClientRect().height;

    if (!details.open) {
      // Открываем сразу, иначе содержимое скрыто и его нечем измерить.
      details.open = true;
      setOpen(true);

      animationRef.current = body.animate(
        { height: [`${from}px`, `${body.scrollHeight}px`], opacity: [0, 1] },
        { duration: OPEN_MS, easing: EASE },
      );
      return;
    }

    setOpen(false);
    animationRef.current = body.animate(
      { height: [`${from}px`, "0px"], opacity: [1, 0] },
      { duration: CLOSE_MS, easing: EASE },
    );

    // Содержимое прячем только когда створка доехала. Если анимацию
    // отменили новым нажатием, `onfinish` не сработает и вопрос останется
    // открытым — это и нужно.
    animationRef.current.onfinish = () => {
      details.open = false;
    };
  }

  return (
    <details ref={detailsRef} className={cn("group", className)}>
      <summary
        onClick={onSummaryClick}
        className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-[16px] font-medium text-ink transition-colors hover:text-accent sm:px-7"
      >
        {question}
        <ChevronDown
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </summary>

      {/* overflow скрыт постоянно: во время анимации по нему обрезается
          выезжающий текст. */}
      <div ref={bodyRef} className="overflow-hidden">
        <p className="max-w-2xl px-5 pb-6 text-[15px] leading-relaxed text-ink-2 sm:px-7">
          {answer}
        </p>
      </div>
    </details>
  );
}
