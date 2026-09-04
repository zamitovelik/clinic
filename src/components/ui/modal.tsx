"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Модальное окно двух видов:
 *
 * - `lightbox` — просмотр фотографий и документов во весь экран. Содержимое
 *   лежит прямо на затемнении, кнопка закрытия в углу экрана.
 * - `panel` — диалог со своим содержимым: белая карточка с шапкой, в которой
 *   стоят заголовок и кнопка закрытия. На узком экране разворачивается почти
 *   во весь экран, потому что иначе форма записи не помещается.
 *
 * Оба вида закрываются по Escape и по клику вне содержимого, возвращают фокус
 * на элемент, с которого были открыты, и блокируют прокрутку под собой.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  variant = "lightbox",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: "lightbox" | "panel";
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    // Место под полосу прокрутки зарезервировано в globals.css
    // (scrollbar-gutter), поэтому блокировка прокрутки не меняет ширину окна
    // и закреплённая шапка не дёргается вбок.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const isPanel = variant === "panel";

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex justify-center bg-deep/95",
        // Затемнение проявляется, содержимое приезжает следом — окно
        // не выпрыгивает на человека целиком.
        "animate-fade-in",
        isPanel ? "items-end p-0 sm:items-center sm:p-6" : "items-center p-4 sm:p-8",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {!isPanel && (
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 rounded-pill bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:top-6 sm:right-6"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      )}

      {isPanel ? (
        <div
          className={cn(
            "flex max-h-[92dvh] w-full flex-col overflow-hidden bg-paper",
            "rounded-t-[20px] sm:max-h-[88dvh] sm:max-w-2xl sm:rounded-card",
            // На телефоне панель выезжает снизу, на широком экране —
            // проявляется по центру: движение совпадает с тем, откуда она берётся.
            "animate-slide-up sm:animate-zoom-in",
            className,
          )}
        >
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
            <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="-mr-2 rounded-pill p-2 text-ink-3 transition-colors hover:bg-milk hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            {children}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "max-h-full w-full max-w-4xl animate-zoom-in overflow-auto",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
