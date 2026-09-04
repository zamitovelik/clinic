import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Склеивает классы Tailwind и разрешает конфликты в пользу последнего:
 * `cn("px-4", condition && "px-6")` даст `px-6`, а не оба класса сразу.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
