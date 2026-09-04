import { AtSign, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { ClinicMap } from "@/components/shared/clinic-map";
import { company } from "@/data/company";
import { getDictionary, pick, type Locale } from "@/i18n";
import { weekdayFull } from "@/i18n/format";

/** Блок «Мы находимся здесь» (раздел 18 ТЗ). */
export function LocationSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const address = pick(company.addressFull, locale);
  const routeUrl = `https://yandex.uz/maps/?text=${encodeURIComponent(address)}`;

  return (
    <Section id="location">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.location.eyebrow}
          title={dict.location.title}
          description={dict.location.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* h-full на обёртке и на карте: иначе карта перестала бы
              растягиваться на высоту соседней колонки. */}
          <Reveal className="h-full">
            <ClinicMap className="h-full aspect-16/10 lg:aspect-auto lg:min-h-[420px]" />
          </Reveal>

          <Reveal
            delay={80}
            className="flex flex-col gap-6 rounded-card border border-line bg-milk p-7"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[13px] text-ink-3">{dict.location.address}</p>
                  <p className="text-[15px] text-ink">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[13px] text-ink-3">{dict.location.phone}</p>
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
                  <p className="text-[13px] text-ink-3">{dict.location.instagram}</p>
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
                  <p className="mb-1.5 text-[13px] text-ink-3">
                    {dict.location.hours}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {company.workingHours.map((day) => (
                      <li
                        key={day.dayOfWeek}
                        className="flex justify-between gap-4 text-[14px]"
                      >
                        <span className="text-ink-2">
                          {weekdayFull(day.dayOfWeek, dict)}
                        </span>
                        <span className="text-ink tabular">
                          {day.hours ?? dict.location.dayOff}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Button asChild variant="outline" className="mt-auto self-start">
              <a href={routeUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4" aria-hidden />
                {dict.location.route}
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
