import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/** Короткий рассказ о клинике со ссылкой на подробную страницу (раздел 15 ТЗ). */
export function AboutPreview() {
  return (
    <Section>
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-milk">
            <Image
              src="/images/about-clinic.svg"
              alt="Интерьер клиники Dentos Medical"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <p className="eyebrow">О клинике</p>
          <h2 className="display text-[30px] sm:text-[40px] lg:text-[46px]">
            Стоматология без спешки и лишних слов
          </h2>

          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            <p>
              Мы строим приём вокруг одной мысли: пациент должен понимать, что
              с ним происходит. Поэтому лечение начинается с диагностики
              и плана, а не с предложения «давайте посмотрим по ходу».
            </p>
            <p>
              Работаем строго по записи — без очередей в коридоре. На каждый
              приём отводится столько времени, сколько нужно, чтобы сделать
              работу спокойно и качественно.
            </p>
          </div>

          <Button asChild variant="outline" className="self-start">
            <Link href="/about">
              Подробнее о клинике
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
