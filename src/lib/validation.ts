/**
 * Проверка данных пациента (раздел 26 ТЗ).
 *
 * Правил всего три, поэтому проверка написана вручную, без схемной
 * библиотеки: тянуть её в клиентский бандл ради длины имени и формата
 * телефона дороже, чем эти двадцать строк.
 *
 * Тексты ошибок объясняют, что именно исправить, а не сообщают «ошибка
 * валидации»: человек должен понять, что от него хотят, с первого раза.
 */

export const NAME_MIN = 2;
export const NAME_MAX = 80;
export const COMMENT_MAX = 500;

/** Оставляет от введённого номера только цифры. */
export function phoneDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Приводит номер к виду `998901234567`.
 * Возвращает `null`, если это не похоже на узбекский номер.
 */
export function normalizePhone(input: string): string | null {
  const digits = phoneDigits(input);

  if (digits.length === 9) return `998${digits}`;
  if (digits.length === 12 && digits.startsWith("998")) return digits;
  if (digits.length === 13 && digits.startsWith("8998")) return digits.slice(1);

  return null;
}

/** `998901234567` → `+998 90 123 45 67`. */
export function formatPhone(input: string): string {
  const digits = phoneDigits(input);
  const local = digits.startsWith("998") ? digits.slice(3) : digits;
  const parts = [
    local.slice(0, 2),
    local.slice(2, 5),
    local.slice(5, 7),
    local.slice(7, 9),
  ].filter(Boolean);

  return parts.length > 0 ? `+998 ${parts.join(" ")}` : "+998 ";
}

export interface PatientInput {
  patientName: string;
  patientPhone: string;
  comment?: string;
}

/** Карта «поле → сообщение». Пустая, если всё в порядке. */
export type PatientErrors = Partial<Record<keyof PatientInput, string>>;

export function validatePatient(input: PatientInput): PatientErrors {
  const errors: PatientErrors = {};

  const name = input.patientName.trim();
  if (name.length < NAME_MIN) {
    errors.patientName = "Укажите имя — как к вам обращаться";
  } else if (name.length > NAME_MAX) {
    errors.patientName = `Не длиннее ${NAME_MAX} знаков`;
  }

  if (normalizePhone(input.patientPhone) === null) {
    errors.patientPhone = "Введите номер в формате +998 90 123 45 67";
  }

  if ((input.comment?.trim().length ?? 0) > COMMENT_MAX) {
    errors.comment = `Не длиннее ${COMMENT_MAX} знаков`;
  }

  return errors;
}
