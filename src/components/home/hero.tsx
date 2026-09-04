import Image from "next/image";
import { Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/link";
import { company } from "@/data/company";
import { getDictionary, pick, type Locale } from "@/i18n";

/**
 * Первый экран (раздел 6 ТЗ).
 *
 * Числовые показатели показываются только если заказчик их заполнил
 * в `company.stats`. Пока значений нет, вместо них идут качественные
 * утверждения — выдумывать опыт и количество пациентов нельзя.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const filledStats = company.stats.filter((stat) => stat.value.length > 0);
  const showStats = filledStats.length > 0;

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Мягкое пятно акцента за фотографией — единственный декоративный
          элемент первого экрана, чтобы фон не был плоским. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-18%] right-[-12%] hidden h-[560px] w-[560px] rounded-full bg-accent-soft blur-3xl lg:block"
      />

      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">{company.name}</p>

          <h1 className="display text-[38px] sm:text-[54px] lg:text-[64px]">
            {dict.hero.title}
          </h1>

          <p className="max-w-lg text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/appointment">{dict.hero.ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/doctors">{dict.hero.ctaSecondary}</Link>
            </Button>
          </div>

          {showStats ? (
            <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-line pt-7">
              {filledStats.map((stat) => (
                <div key={stat.key} className="flex flex-col gap-1">
                  <dt className="sr-only">{pick(stat.label, locale)}</dt>
                  <dd className="display text-[34px] text-ink tabular">
                    {stat.value}
                  </dd>
                  <p className="text-[13px] text-ink-3">
                    {pick(stat.label, locale)}
                  </p>
                </div>
              ))}
            </dl>
          ) : (
            <ul className="mt-2 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {company.heroBadges.map((badge) => (
                <li
                  key={badge.key}
                  className="flex items-center gap-2.5 text-sm text-ink-2"
                >
                  <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {pick(badge.title, locale)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-card bg-milk">
            <Image
              src="/images/hero-clinic.svg"
              alt={dict.hero.photoAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>

          {/* Плавающие карточки: адрес и режим работы — то, что действительно
              известно о клинике, без выдуманных цифр. */}
          <div className="absolute -bottom-5 left-4 flex flex-col gap-2 rounded-card border border-line bg-paper p-4 shadow-lift sm:left-6">
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              {pick(company.address, locale)}
            </p>
            <p className="flex items-center gap-2 text-[13px] text-ink-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden />
              {dict.hero.workdays}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
