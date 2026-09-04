import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/shared/service-card";
import type { Service } from "@/types/service";

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <Section id="services">
      <div className="container-page">
        <SectionHeading
          eyebrow="Наши услуги"
          title="Что мы лечим"
          description="От разовой чистки до полного восстановления зубного ряда. Каждым направлением занимается профильный специалист."
          action={
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/services">
                Все услуги
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 50} className="h-full">
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
          <Link href="/services">
            Посмотреть все услуги
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
