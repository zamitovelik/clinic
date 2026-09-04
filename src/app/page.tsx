import { Hero } from "@/components/home/hero";
import { Advantages } from "@/components/home/advantages";
import { ServicesPreview } from "@/components/home/services-preview";
import { DoctorsPreview } from "@/components/home/doctors-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { ReviewsSection } from "@/components/home/reviews-section";
import { GallerySection } from "@/components/home/gallery-section";
import { LocationSection } from "@/components/home/location-section";
import { CtaSection } from "@/components/home/cta-section";
import { ClinicStructuredData } from "@/components/shared/structured-data";
import { gallery } from "@/data/gallery";
import { BookingProvider } from "@/components/appointment/booking-provider";
import {
  getBookingDataFor,
  getDoctors,
  getReviews,
  getServices,
} from "@/services/api";

/**
 * Главная страница.
 *
 * Данные берутся через слой `services/api`, а не из файлов напрямую:
 * при подключении CRM меняется только он, а страница остаётся прежней.
 */
export default async function HomePage() {
  const [services, doctors, reviews] = await Promise.all([
    getServices(),
    getDoctors(),
    getReviews(),
  ]);

  // На главной показываем троих врачей — окно записи готовим только для них.
  const featured = doctors.slice(0, 3);
  const bookings = getBookingDataFor(featured.map((doctor) => doctor.slug));

  return (
    <BookingProvider bookings={bookings}>
      <ClinicStructuredData />
      <Hero />
      <Advantages />
      <ServicesPreview services={services.slice(0, 6)} />
      <DoctorsPreview doctors={featured} />
      <AboutPreview />
      <ReviewsSection reviews={reviews.slice(0, 6)} doctors={doctors} />
      <GallerySection items={gallery} />
      <LocationSection />
      <CtaSection />
    </BookingProvider>
  );
}
