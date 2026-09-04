"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingModal } from "./booking-modal";
import type { BookingData } from "@/types/booking";

/**
 * Одно окно записи на всю страницу.
 *
 * Кнопок «Записаться» на странице может быть много — в каждой карточке врача
 * и у каждого свободного времени в расписании. Держать модальное окно и его
 * данные в каждой кнопке значило бы дублировать расписание в разметке столько
 * же раз, поэтому окно здесь одно, а кнопки только просят его открыться.
 */

interface BookingContextValue {
  /** Открыть запись к врачу, при желании — сразу на нужные дату и время. */
  open: (doctorSlug: string, preset?: { date?: string; time?: string }) => void;
  /** К каким врачам запись доступна на этой странице. */
  available: Set<string>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

interface ActiveBooking {
  slug: string;
  date?: string;
  time?: string;
}

export function BookingProvider({
  bookings,
  children,
}: {
  bookings: BookingData[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<ActiveBooking | null>(null);

  const byDoctor = useMemo(
    () => new Map(bookings.map((booking) => [booking.doctor.slug, booking])),
    [bookings],
  );

  const open = useCallback(
    (doctorSlug: string, preset?: { date?: string; time?: string }) => {
      setActive({ slug: doctorSlug, date: preset?.date, time: preset?.time });
    },
    [],
  );

  const value = useMemo<BookingContextValue>(
    () => ({ open, available: new Set(byDoctor.keys()) }),
    [open, byDoctor],
  );

  const booking = active ? byDoctor.get(active.slug) : undefined;

  return (
    <BookingContext.Provider value={value}>
      {children}

      {booking && active && (
        <BookingModal
          // Новый набор дата/время должен открывать окно с чистого листа.
          key={`${active.slug}:${active.date ?? ""}:${active.time ?? ""}`}
          booking={booking}
          initialDate={active.date}
          initialTime={active.time}
          open
          onClose={() => setActive(null)}
        />
      )}
    </BookingContext.Provider>
  );
}

/**
 * Доступ к окну записи. Возвращает `null`, если страница не обёрнута
 * провайдером — тогда кнопки ведут на страницу записи обычной ссылкой.
 */
export function useBooking(): BookingContextValue | null {
  return useContext(BookingContext);
}
