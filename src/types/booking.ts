import type { DoctorSchedule } from "./schedule";

/**
 * Всё, что нужно, чтобы записаться к конкретному врачу, не уходя со страницы.
 *
 * Намеренно урезано до минимума: окну записи не нужны биография, дипломы
 * и опыт работы, а на странице со списком врачей эти данные пришлось бы
 * передать в разметку по разу на каждого. Тексты здесь уже на нужном языке —
 * выбор делает сервер, клиенту незачем возить оба варианта.
 */

export interface BookingDoctor {
  slug: string;
  name: string;
  specialty: string;
  photo: string;
}

export interface BookingService {
  slug: string;
  title: string;
}

export interface BookingData {
  doctor: BookingDoctor;
  /** Направления, которые ведёт этот врач. */
  services: BookingService[];
  schedule: DoctorSchedule;
}
