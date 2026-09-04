import { serviceCategories, services } from "@/data/services";
import type { Service, ServiceCategory } from "@/types/service";
import { clone, delay } from "./client";

/** Все услуги. Будущий эндпоинт: GET /services */
export async function getServices(): Promise<Service[]> {
  await delay();
  return clone(services);
}

/** Услуга по адресу страницы. Будущий эндпоинт: GET /services/:slug */
export async function getService(slug: string): Promise<Service | null> {
  await delay();
  return clone(services.find((service) => service.slug === slug) ?? null);
}

/** Разделы каталога услуг. */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  await delay();
  return clone(serviceCategories);
}
