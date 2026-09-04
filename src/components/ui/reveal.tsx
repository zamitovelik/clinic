"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Плавное появление блока при прокрутке (раздел 23 ТЗ).
 *
 * Один общий приём на весь сайт вместо россыпи разных эффектов: элемент
 * поднимается и проявляется один раз, наблюдатель после этого отключается.
 * При включённом системном «уменьшении движения» анимация не применяется —
 * это делает CSS в globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  /** Задержка в миллисекундах — для последовательного появления карточек. */
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
