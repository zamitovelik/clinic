import type { Appointment } from "@/types/appointment";

/**
 * Записи, созданные через сайт (раздел 14 ТЗ).
 *
 * Пока нет CRM, отправлять запись некуда, поэтому мок складывает её сюда —
 * в память процесса. Это не хранилище: при перезапуске сервера список
 * очищается, и полагаться на него нельзя. Нужен он ровно для двух вещей:
 * посмотреть, в каком виде запись уходит в CRM, и проверить на демонстрации,
 * что форма действительно собрала все поля.
 *
 * Когда появится CRM, `createAppointment` начнёт делать POST, а этот файл
 * можно удалить.
 */
export const createdAppointments: Appointment[] = [];

/** Записывает созданную заявку в память. */
export function rememberAppointment(appointment: Appointment): void {
  createdAppointments.push(appointment);
}

/** Все записи, созданные с момента запуска сервера. Новые — первыми. */
export function listAppointments(): Appointment[] {
  return [...createdAppointments].reverse();
}
