"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarPlus, Phone } from "lucide-react";
import { company } from "@/data/company";

/**
 * Нижняя панель на мобильном (раздел 22 ТЗ): позвонить и записаться всегда
 * под большим пальцем. На самой странице записи панель скрыта — там уже
 * есть кнопки формы, и дублировать их значит спорить с ней за внимание.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/appointment")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-80 border-t border-line bg-paper md:hidden">
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <a
          href={`tel:${company.phoneRaw}`}
          className="flex h-12 items-center justify-center gap-2 rounded-pill border border-line-strong text-sm font-medium text-ink"
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden />
          Позвонить
        </a>
        <Link
          href="/appointment"
          className="flex h-12 items-center justify-center gap-2 rounded-pill bg-accent text-sm font-medium text-white"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden />
          Записаться
        </Link>
      </div>
    </div>
  );
}
