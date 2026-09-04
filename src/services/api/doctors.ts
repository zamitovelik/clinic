import { doctors } from "@/data/doctors";
import type { Doctor } from "@/types/doctor";
import { clone, delay } from "./client";

/** Все врачи клиники. Будущий эндпоинт: GET /doctors */
export async function getDoctors(): Promise<Doctor[]> {
  await delay();
  return clone(doctors);
}

/** Врач по адресу страницы. Будущий эндпоинт: GET /doctors/:slug */
export async function getDoctor(slug: string): Promise<Doctor | null> {
  await delay();
  return clone(doctors.find((doctor) => doctor.slug === slug) ?? null);
}

/** Врачи, ведущие услугу. Будущий эндпоинт: GET /doctors?service=:slug */
export async function getDoctorsByService(serviceSlug: string): Promise<Doctor[]> {
  await delay();
  return clone(doctors.filter((doctor) => doctor.serviceSlugs.includes(serviceSlug)));
}
