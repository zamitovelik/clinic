import type { Metadata } from "next";
import Image from "next/image";
import { Advantages } from "@/components/home/advantages";
import { GallerySection } from "@/components/home/gallery-section";
import { CtaSection } from "@/components/home/cta-section";
import { gallery } from "@/data/gallery";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "О клинике",
  description: `Стоматология ${company.name} в Ташкенте: подход к лечению, ценности клиники и условия приёма. ${company.addressFull}.`,
};

/** Ценности клиники. Формулировки о принципах работы, а не о достижениях. */
const values = [
  {
    title: "Сначала диагностика",
    text: "Никакого лечения «по ходу дела». Сначала снимок и осмотр, потом план с очерёдностью этапов, и только затем работа.",
  },
  {
    title: "Понятный разговор",
    text: "Мы объясняем, что происходит, без латыни и без запугивания. Вы должны понимать, за что платите и зачем это нужно.",
  },
  {
    title: "Право отказаться",
    text: "Пациент вправе выбрать более простой вариант лечения. Наша задача — честно рассказать о последствиях, а не продавать.",
  },
  {
    title: "Время на приём",
    text: "Работаем по записи и не ставим приёмы встык. Если случай сложнее, чем ожидали, приём не обрывается на середине.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">О клинике</p>
            <h1 className="display text-[36px] sm:text-[50px]">
              Стоматология, в которую не страшно возвращаться
            </h1>
            <p className="text-[16px] leading-relaxed text-ink-2">
              {company.name} — клиника в центре Ташкента. Мы лечим взрослых
              и детей, восстанавливаем зубы после разрушения и утраты, исправляем
              прикус и занимаемся профилактикой.
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-mist">
            <Image
              src="/images/about-clinic.svg"
              alt="Интерьер клиники Dentos Medical"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          <h2 className="display text-[30px] sm:text-[38px]">Наш подход</h2>

          <div className="flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            <p>
              Большинство людей приходит к стоматологу с двумя страхами: что
              будет больно и что назначат лишнего. Мы построили приём так, чтобы
              снять оба.
            </p>
            <p>
              Первый решается техникой и темпом: анестезия подбирается под
              случай, а сложное лечение при необходимости разбивается на
              несколько коротких визитов. Второй — планом лечения: вы видите
              список работ с очерёдностью и понимаете, что обязательно сейчас,
              а что можно отложить.
            </p>
            <p>
              Врачи ведут пациента совместно. Если хирург устанавливает имплант,
              коронку на него планирует ортопед — и оба знают историю случая
              с самого начала, а не узнают о ней из чужой карты.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-milk py-14 sm:py-20">
        <div className="container-page">
          <h2 className="display mb-10 text-[30px] sm:text-[38px]">Наши ценности</h2>

          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {values.map((value, index) => (
              <li key={value.title} className="flex flex-col gap-3 bg-paper p-7">
                <span className="text-[13px] text-accent tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[18px] font-semibold text-ink">{value.title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Advantages />
      <GallerySection items={gallery} />
      <CtaSection />
    </>
  );
}
