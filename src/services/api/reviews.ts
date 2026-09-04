import { reviews } from "@/data/reviews";
import type { Review } from "@/types/review";
import { clone, delay } from "./client";

/** Отзывы о клинике и врачах. Будущий эндпоинт: GET /reviews */
export async function getReviews(): Promise<Review[]> {
  await delay();
  return clone(reviews);
}

/** Отзывы о конкретном враче. Будущий эндпоинт: GET /doctors/:slug/reviews */
export async function getDoctorReviews(doctorSlug: string): Promise<Review[]> {
  await delay();
  return clone(reviews.filter((review) => review.doctorSlug === doctorSlug));
}
