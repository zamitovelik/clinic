import { Hero } from "@/components/home/hero";
import { Advantages } from "@/components/home/advantages";
import { ServicesPreview } from "@/components/home/services-preview";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { BeforeAfterSection } from "@/components/home/before-after-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { GallerySection } from "@/components/home/gallery-section";
import { LocationSection } from "@/components/home/location-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { BookingProvider } from "@/components/appointment/booking-provider";
import {
  ClinicStructuredData,
  FaqStructuredData,
} from "@/components/shared/structured-data";
import { gallery } from "@/data/gallery";
import {
  getBookingDataFor,
  getDoctors,
  getReviews,
  getServices,
} from "@/services/api";
import { pick, type Locale } from "@/i18n";

/**
 * Главная страница.
 *
 * Данные берутся через слой `services/api`, а не из файлов напрямую:
 * при подключении CRM меняется только он, а страница остаётся прежней.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [services, doctors, reviews] = await Promise.all([
    getServices(),
    getDoctors(),
    getReviews(),
  ]);

  // На главной показываем троих врачей — окно записи готовим только для них.
  const featured = doctors.slice(0, 3);
  const bookings = getBookingDataFor(
    featured.map((doctor) => doctor.slug),
    locale,
  );

  const photos = gallery.map((item) => ({
    id: item.id,
    src: item.src,
    caption: pick(item.caption, locale),
  }));

  return (
    <BookingProvider bookings={bookings}>
      <ClinicStructuredData locale={locale} />
      <FaqStructuredData locale={locale} />
      <Hero locale={locale} />
      <Advantages locale={locale} />
      <ServicesPreview services={services.slice(0, 6)} locale={locale} />
      <DoctorsPreview doctors={featured} locale={locale} />
      <AboutPreview locale={locale} />
      <BeforeAfterSection tone="milk" />
      <ReviewsSection
        reviews={reviews.slice(0, 6)}
        doctors={doctors}
        locale={locale}
      />
      <GallerySection items={photos} />
      <LocationSection locale={locale} />
      <FaqSection locale={locale} tone="milk" />
      <CtaSection locale={locale} />
    </BookingProvider>
  );
}
