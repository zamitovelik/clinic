import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingTrigger } from "@/components/appointment/booking-trigger";
import type { Doctor } from "@/types/doctor";
import { cn } from "@/lib/cn";
import { pluralYears } from "@/lib/format";

/**
 * Карточка врача (раздел 9 ТЗ).
 * Вся карточка кликабельна, а кнопка записи внутри — отдельная цель:
 * оба сценария из ТЗ работают без вложенных ссылок.
 */
export function DoctorCard({
  doctor,
  className,
}: {
  doctor: Doctor;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-line bg-paper",
        "transition-shadow duration-300 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-milk">
        <Image
          src={doctor.photo}
          alt={`${doctor.name} — ${doctor.specialty}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-semibold text-ink">
            <Link href={`/doctors/${doctor.slug}`} className="before:absolute before:inset-0">
              {doctor.name}
            </Link>
          </h3>
          <p className="text-sm text-accent">{doctor.specialty}</p>
        </div>

        <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-3">
          <div className="flex gap-1.5">
            <dt>Стаж</dt>
            <dd className="text-ink-2 tabular">{pluralYears(doctor.experience)}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="sr-only">Категория</dt>
            <dd className="text-ink-2">{doctor.category}</dd>
          </div>
        </dl>

        <p className="line-clamp-3 text-sm leading-relaxed text-ink-2">
          {doctor.shortDescription}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          {/* z-10 поднимает кнопку над растянутой ссылкой карточки: клик по
              «Записаться» должен открывать окно, а не уводить на профиль. */}
          <BookingTrigger doctorSlug={doctor.slug} className="relative z-10">
            Записаться
          </BookingTrigger>
          <span className="ml-auto text-ink-3 transition-colors group-hover:text-accent">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}
