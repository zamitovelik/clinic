import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/link";
import { getDictionary, type Locale } from "@/i18n";

/** Короткий рассказ о клинике со ссылкой на подробную страницу (раздел 15 ТЗ). */
export function AboutPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <Section>
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-milk">
            <Image
              src="/images/about-clinic.svg"
              alt={dict.aboutPreview.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <p className="eyebrow">{dict.aboutPreview.eyebrow}</p>
          <h2 className="display text-[30px] sm:text-[40px] lg:text-[46px]">
            {dict.aboutPreview.title}
          </h2>

          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            <p>{dict.aboutPreview.text1}</p>
            <p>{dict.aboutPreview.text2}</p>
          </div>

          <Button asChild variant="outline" className="self-start">
            <Link href="/about">
              {dict.aboutPreview.more}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
