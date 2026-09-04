import { getScheduleByDoctor } from "@/data/schedule";
import {
  buildDemoBookedSlots,
  buildScheduleDays,
  combineScheduleDays,
} from "@/lib/schedule";
import type { DoctorSchedule, ScheduleDay } from "@/types/schedule";
import { clone, delay } from "./client";

/**
 * График врача в исходном виде — рабочие дни и занятые слоты.
 * Будущий эндпоинт: GET /doctors/:slug/schedule
 */
export async function getDoctorSchedule(
  doctorSlug: string,
): Promise<DoctorSchedule | null> {
  await delay();

  const schedule = getScheduleByDoctor(doctorSlug);
  if (!schedule) return null;

  // Занятость демонстрационная; из CRM она придёт уже заполненной.
  return {
    ...clone(schedule),
    bookedSlots: buildDemoBookedSlots(doctorSlug, schedule),
  };
}

/**
 * Готовая сетка приёма по дням — то, что показывают календарь и страница врача.
 * Отдельная функция нужна, чтобы компоненты не занимались расчётом слотов.
 */
export async function getDoctorScheduleDays(
  doctorSlug: string,
  days?: number,
): Promise<ScheduleDay[]> {
  const schedule = await getDoctorSchedule(doctorSlug);
  if (!schedule) return [];
  return buildScheduleDays(schedule, new Date(), days);
}

/**
 * Сетка приёма для варианта «любой подходящий врач»: день считается свободным,
 * если свободен хотя бы у одного из врачей, ведущих услугу.
 */
export async function getCombinedScheduleDays(
  doctorSlugs: string[],
  days?: number,
): Promise<ScheduleDay[]> {
  const schedules = await Promise.all(
    doctorSlugs.map((slug) => getDoctorScheduleDays(slug, days)),
  );
  return combineScheduleDays(schedules);
}
