import { MOCK_LATENCY_MS } from "@/lib/config";

/**
 * Слой доступа к данным (раздел 13 ТЗ).
 *
 * Сейчас функции читают локальные файлы из `src/data`, но подписи у них такие
 * же, как будут у настоящих запросов. Подключение CRM сводится к замене тела
 * каждой функции на `fetch` — интерфейс об этом не узнает, потому что нигде
 * не обращается к данным напрямую.
 *
 * Пример будущей реализации:
 *   export async function createAppointment(input: CreateAppointmentInput) {
 *     const response = await fetch(`${API_URL}/appointments`, {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(input),
 *     });
 *     if (!response.ok) throw new ApiError(await response.text());
 *     return response.json();
 *   }
 */

/** Базовый адрес будущего API. Пока не используется. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Ошибка обращения к данным. Тип общий для мока и будущего API. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: string = "unknown",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Задержка мок-ответа. На сервере пропускается: замедлять отрисовку страницы
 * ради имитации сети незачем — это ухудшило бы реальные показатели.
 */
export async function delay(ms: number = MOCK_LATENCY_MS): Promise<void> {
  if (typeof window === "undefined") return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/** Возвращает копию данных, чтобы вызывающий код не менял исходный массив. */
export function clone<T>(value: T): T {
  return structuredClone(value);
}
