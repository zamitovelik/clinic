import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ReviewCard } from "@/components/shared/review-card";
import type { Review } from "@/types/review";
import type { Doctor } from "@/types/doctor";

export function ReviewsSection({
  reviews,
  doctors,
}: {
  reviews: Review[];
  doctors: Doctor[];
}) {
  const nameBySlug = new Map(doctors.map((doctor) => [doctor.slug, doctor.name]));

  return (
    <Section id="reviews">
      <div className="container-page">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят пациенты"
          description="Отзывы публикуются с указанием источника. Мы не удаляем и не редактируем их."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 50} className="h-full">
              <ReviewCard
                review={review}
                doctorName={
                  review.doctorSlug ? nameBySlug.get(review.doctorSlug) : undefined
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
