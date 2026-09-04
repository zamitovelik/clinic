"use client";

import { Children, isValidElement } from "react";
import { Reveal } from "./reveal";

/**
 * Контейнер, в котором каждый блок появляется при прокрутке отдельно.
 *
 * Нужен там, где страница собрана из нескольких крупных разделов подряд:
 * оборачивать каждый вручную — значит повторять одно и то же по десять раз
 * и однажды забыть. Задержки здесь нет намеренно: разделы стоят далеко
 * друг от друга, и каждый показывается тогда, когда до него дошли, —
 * лесенка из задержек имеет смысл только для карточек в одной сетке.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child) =>
        isValidElement(child) ? <Reveal>{child}</Reveal> : child,
      )}
    </div>
  );
}
