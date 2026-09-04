import { cn } from "@/lib/cn";

/**
 * Шапка секции: короткий надзаголовок, заголовок в антикве и подпись.
 * Один компонент на весь сайт — так вертикальный ритм страниц совпадает.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-3",
          align === "center" && "items-center",
        )}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display text-[30px] sm:text-[40px] lg:text-[46px]">{title}</h2>
        {description && (
          <p className="text-[15px] leading-relaxed text-ink-2">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Вертикальные отступы секции. Вынесены сюда, чтобы не расходились по страницам. */
export function Section({
  className,
  tone = "paper",
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: "paper" | "milk" | "deep" }) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "milk" && "bg-milk",
        tone === "deep" && "bg-deep text-paper",
        className,
      )}
      {...props}
    />
  );
}
