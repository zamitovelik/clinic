import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/link";
import { company } from "@/data/company";
import { getDictionary, type Locale } from "@/i18n";

/** Финальный призыв к записи. Единственная тёмная секция на странице. */
export function CtaSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-deep py-16 text-paper sm:py-20 lg:py-24">
      <div className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="display text-[32px] sm:text-[42px]">{dict.cta.title}</h2>
          <p className="text-[15px] leading-relaxed text-paper/70">
            {dict.cta.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" variant="light">
            <Link href="/appointment">{dict.cta.book}</Link>
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
