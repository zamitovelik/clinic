"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useBooking } from "./booking-provider";
import { Link } from "@/i18n/link";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

/**
 * Кнопка «Записаться» рядом с врачом.
 *
 * Если страница обёрнута `BookingProvider`, открывает окно записи прямо здесь.
 * Если нет — ведёт на страницу записи ссылкой, чтобы кнопка работала всегда,
 * даже там, где окно не подключено.
 */
export function BookingTrigger({
  doctorSlug,
  date,
  time,
  children,
  className,
  variant,
  size = "sm",
}: {
  doctorSlug: string;
  date?: string;
  time?: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) {
  const booking = useBooking();

  if (!booking?.available.has(doctorSlug)) {
    const params = new URLSearchParams({ doctor: doctorSlug });
    if (date) params.set("date", date);
    if (time) params.set("time", time);

    return (
      <Button asChild size={size} variant={variant} className={className}>
        <Link href={`/appointment?${params.toString()}`}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={className}
      onClick={() => booking.open(doctorSlug, { date, time })}
    >
      {children}
    </Button>
  );
}

/** Тот же запуск окна, но оформленный как слот времени в расписании. */
export function SlotTrigger({
  doctorSlug,
  date,
  time,
  className,
}: {
  doctorSlug: string;
  date: string;
  time: string;
  className?: string;
}) {
  const booking = useBooking();
  const { dict } = useI18n();

  const classes = cn(
    "rounded-md border border-accent-line bg-accent-soft px-2 py-0.5 text-[13px] text-accent tabular transition-colors hover:bg-accent hover:text-white",
    className,
  );

  const label = `${dict.schedule.bookAt} ${time}`;

  if (!booking?.available.has(doctorSlug)) {
    return (
      <Link
        href={`/appointment?doctor=${doctorSlug}&date=${date}&time=${time}`}
        className={classes}
        aria-label={label}
      >
        {time}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => booking.open(doctorSlug, { date, time })}
      className={classes}
      aria-label={label}
    >
      {time}
    </button>
  );
}
