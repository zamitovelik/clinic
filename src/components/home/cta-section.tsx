import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

/** Финальный призыв к записи. Единственная тёмная секция на странице. */
export function CtaSection() {
  return (
    <section className="bg-deep py-16 text-paper sm:py-20 lg:py-24">
      <div className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="display text-[32px] sm:text-[42px]">
            Запишитесь на приём онлайн
          </h2>
          <p className="text-[15px] leading-relaxed text-paper/70">
            Выберите услугу, врача и удобное время. Мы перезвоним, чтобы
            подтвердить запись.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" variant="light">
            <Link href="/appointment">Записаться на приём</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 text-paper hover:border-white hover:bg-white/10"
          >
            <a href={`tel:${company.phoneRaw}`}>
              <Phone className="h-4 w-4" aria-hidden />
              {company.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
