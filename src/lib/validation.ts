/**
 * Проверка данных пациента (раздел 26 ТЗ).
 *
 * Правил всего три, поэтому проверка написана вручную, без схемной
 * библиотеки: тянуть её в клиентский бандл ради длины имени и формата
 * телефона дороже, чем эти двадцать строк.
 *
 * Возвращаются коды, а не готовые фразы: сайт двуязычный, и текст ошибки
 * подставляет уже интерфейс из словаря нужного языка.
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

/** Код ошибки. Совпадает с ключом в словаре `validation`. */
export type PatientErrorCode =
  | "nameRequired"
  | "nameTooLong"
  | "phoneInvalid"
  | "commentTooLong";

export type PatientErrors = Partial<Record<keyof PatientInput, PatientErrorCode>>;

export function validatePatient(input: PatientInput): PatientErrors {
  const errors: PatientErrors = {};

  const name = input.patientName.trim();
  if (name.length < NAME_MIN) {
    errors.patientName = "nameRequired";
  } else if (name.length > NAME_MAX) {
    errors.patientName = "nameTooLong";
  }

  if (normalizePhone(input.patientPhone) === null) {
    errors.patientPhone = "phoneInvalid";
  }

  if ((input.comment?.trim().length ?? 0) > COMMENT_MAX) {
    errors.comment = "commentTooLong";
  }

  return errors;
}

/** Предел длины для сообщения об ошибке поля. */
export const ERROR_LIMITS: Record<PatientErrorCode, number | undefined> = {
  nameRequired: undefined,
  nameTooLong: NAME_MAX,
  phoneInvalid: undefined,
  commentTooLong: COMMENT_MAX,
};
