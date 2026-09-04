import type { Appointment, CreateAppointmentInput } from "@/types/appointment";
import { ApiError, delay } from "./client";

/**
 * Создание записи.
 *
 * Сейчас запись никуда не уходит: функция проверяет данные и возвращает
 * объект с идентификатором, как это будет делать CRM. Заменить нужно будет
 * только тело функции — форма и экран подтверждения останутся прежними.
 *
 * Будущий эндпоинт: POST /appointments
 */
export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  await delay(600);

  // Те же проверки повторяет форма, но полагаться только на неё нельзя:
  // слой данных должен отвергать некорректный вызов независимо от интерфейса.
  if (!input.serviceSlug) throw new ApiError("Не выбрана услуга", "service_required");
  if (!input.date) throw new ApiError("Не выбрана дата", "date_required");
  if (!input.time) throw new ApiError("Не выбрано время", "time_required");
  if (!input.patientName.trim()) throw new ApiError("Не указано имя", "name_required");
  if (!input.patientPhone.trim()) throw new ApiError("Не указан телефон", "phone_required");

  return {
    ...input,
    id: `demo-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
}
