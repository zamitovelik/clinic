import type { Metadata } from "next";
import { ServiceCard } from "@/components/shared/service-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { getServiceCategories, getServices } from "@/services/api";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Услуги стоматологии Dentos Medical в Ташкенте: терапия, хирургия, имплантация, протезирование, ортодонтия, детский приём, профессиональная гигиена и диагностика.",
};

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  return (
    <>
      <section className="border-b border-line bg-milk py-14 sm:py-20">
        <div className="container-page flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">Наши услуги</p>
          <h1 className="display text-[36px] sm:text-[50px]">Что мы лечим</h1>
          <p className="text-[16px] leading-relaxed text-ink-2">
            Направления сгруппированы по задаче: вылечить, восстановить,
            исправить прикус или не допустить проблемы. Каждым занимается
            профильный специалист.
          </p>
        </div>
      </section>

      <div className="container-page flex flex-col gap-14 py-14 sm:gap-20 sm:py-20">
        {categories.map((category) => {
          const items = services.filter(
            (service) => service.categorySlug === category.slug,
          );
          if (items.length === 0) return null;

          return (
            <section key={category.slug} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-b border-line pb-5">
                <h2 className="display text-[28px] sm:text-[34px]">
                  {category.title}
                </h2>
                <p className="text-[15px] text-ink-2">{category.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, index) => (
                  <Reveal key={service.slug} delay={index * 50} className="h-full">
                    <ServiceCard service={service} className="h-full" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaSection />
    </>
  );
}
