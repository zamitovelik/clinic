import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DoctorCard } from "@/components/shared/doctor-card";
import type { Doctor } from "@/types/doctor";

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  return (
    <Section tone="milk" id="doctors">
      <div className="container-page">
        <SectionHeading
          eyebrow="Специалисты"
          title="Врачи, которым доверяют"
          description="У каждого врача — своя страница с биографией, образованием и графиком приёма. Записаться можно к конкретному специалисту."
          action={
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/doctors">
                Все врачи
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 60} className="h-full">
              <DoctorCard doctor={doctor} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
          <Link href="/doctors">
            Посмотреть всех врачей
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
