import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DoctorCard } from "@/components/shared/doctor-card";
import { Link } from "@/i18n/link";
import type { Doctor } from "@/types/doctor";
import { getDictionary, type Locale } from "@/i18n";

export function DoctorsPreview({
  doctors,
  locale,
}: {
  doctors: Doctor[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <Section tone="milk" id="doctors">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.doctorsPreview.eyebrow}
          title={dict.doctorsPreview.title}
          description={dict.doctorsPreview.description}
          action={
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/doctors">
                {dict.doctorsPreview.all}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 60} className="h-full">
              <DoctorCard doctor={doctor} locale={locale} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-8 w-full sm:hidden">
          <Link href="/doctors">
            {dict.doctorsPreview.allMobile}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
