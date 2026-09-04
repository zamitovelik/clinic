import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClinicMap } from "@/components/shared/clinic-map";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты стоматологии ${company.name}: ${company.addressFull}, телефон ${company.phone}. Часы работы и схема проезда.`,
};

export default function ContactsPage() {
  const routeUrl = `https://yandex.uz/maps/?text=${encodeURIComponent(company.addressFull)}`;

  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">Контакты</p>
          <h1 className="display text-[36px] sm:text-[50px]">Как с нами связаться</h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            Позвоните или запишитесь онлайн — администратор подтвердит время
            и ответит на вопросы о лечении.
          </p>
        </div>
      </section>

      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-8">
            <dl className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] text-ink-3">Телефон</dt>
                  <dd>
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="text-[18px] text-ink tabular transition-colors hover:text-accent"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AtSign className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] text-ink-3">Instagram</dt>
                  <dd>
                    <a
                      href={company.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[18px] text-ink transition-colors hover:text-accent"
                    >
                      {company.instagram}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] text-ink-3">Адрес</dt>
                  <dd className="text-[18px] text-ink">{company.addressFull}</dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="flex w-full flex-col gap-1.5">
                  <dt className="text-[13px] text-ink-3">Часы работы</dt>
                  <dd>
                    <ul className="flex flex-col gap-1">
                      {company.workingHours.map((day) => (
                        <li
                          key={day.dayOfWeek}
                          className="flex justify-between gap-6 border-b border-line py-1.5 text-[15px] last:border-b-0"
                        >
                          <span className="text-ink-2">{day.label}</span>
                          <span className="text-ink tabular">{day.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/appointment">Записаться на приём</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4" aria-hidden />
                  Маршрут
                </a>
              </Button>
            </div>
          </div>

          <ClinicMap className="aspect-4/3 lg:aspect-auto lg:min-h-[540px]" />
        </div>
      </div>
    </>
  );
}
