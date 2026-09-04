import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Пометка «это демонстрационные данные» (раздел 28 ТЗ).
 *
 * Пока заказчик не прислал настоящие цены и фотографии работ, посетитель
 * должен видеть, что перед ним образец, а не обещание. Плашка намеренно
 * заметная: спрятанная сноска эту задачу не решает.
 *
 * Компонент вызывается только там, где данные помечены как демонстрационные,
 * поэтому после замены содержимого он исчезает со страниц сам.
 */
export function DemoNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-card border border-dashed border-line-strong",
        "bg-milk px-4 py-3 text-[13px] leading-relaxed text-ink-2",
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" aria-hidden />
      {children}
    </p>
  );
}
