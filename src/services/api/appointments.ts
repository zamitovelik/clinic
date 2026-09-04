import type { Appointment, CreateAppointmentInput } from "@/types/appointment";
import { rememberAppointment } from "@/data/appointments";
import { ApiError, delay } from "./client";

/**
 * Создание записи.
 *
 * Сейчас запись никуда не уходит: функция проверяет данные и возвращает
 * объект с идентификатором, как это будет делать CRM. Заменить нужно будет
 * только тело функции — форма и экран подтверждения останутся прежними.
 *
 * Ошибки несут код, а не текст: сайт двуязычный, и фразу подбирает интерфейс.
 * Коды совпадают с ключами раздела `validation` в словаре.
 *
 * Будущий эндпоинт: POST /appointments
 */
export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  await delay(600);

  // Те же проверки повторяет форма, но полагаться только на неё нельзя:
  // слой данных должен отвергать некорректный вызов независимо от интерфейса.
  if (!input.serviceSlug) throw new ApiError("service", "serviceRequired");
  if (!input.date) throw new ApiError("date", "dateRequired");
  if (!input.time) throw new ApiError("time", "timeRequired");
  if (!input.patientName.trim()) throw new ApiError("name", "nameRequired");
  if (!input.patientPhone.trim()) throw new ApiError("phone", "phoneRequired");

  const appointment: Appointment = {
    ...input,
    id: `demo-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  // Отправлять пока некуда, поэтому запись остаётся в памяти процесса —
  // так на демонстрации видно, что форма собрала все поля.
  rememberAppointment(appointment);

  return appointment;
}
