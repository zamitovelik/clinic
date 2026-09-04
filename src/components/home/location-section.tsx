import { AtSign, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { ClinicMap } from "@/components/shared/clinic-map";
import { company } from "@/data/company";

/** Блок «Мы находимся здесь» (раздел 18 ТЗ). */
export function LocationSection() {
  const routeUrl = `https://yandex.uz/maps/?text=${encodeURIComponent(company.addressFull)}`;

  return (
    <Section id="location">
      <div className="container-page">
        <SectionHeading
          eyebrow="Как нас найти"
          title="Мы находимся здесь"
          description="Клиника в центре Ташкента. Приезжайте к назначенному времени — ждать в коридоре не придётся."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ClinicMap className="aspect-16/10 lg:aspect-auto lg:min-h-[420px]" />

          <div className="flex flex-col gap-6 rounded-card border border-line bg-milk p-7">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[13px] text-ink-3">Адрес</p>
                  <p className="text-[15px] text-ink">{company.addressFull}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[13px] text-ink-3">Телефон</p>
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="text-[15px] text-ink tabular transition-colors hover:text-accent"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AtSign className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[13px] text-ink-3">Instagram</p>
                  <a
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink transition-colors hover:text-accent"
                  >
                    {company.instagram}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="w-full">
                  <p className="mb-1.5 text-[13px] text-ink-3">Часы работы</p>
                  <ul className="flex flex-col gap-1">
                    {company.workingHours.map((day) => (
                      <li
                        key={day.dayOfWeek}
                        className="flex justify-between gap-4 text-[14px]"
                      >
                        <span className="text-ink-2">{day.label}</span>
                        <span className="text-ink tabular">{day.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button asChild variant="outline" className="mt-auto">
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4" aria-hidden />
                Построить маршрут
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
