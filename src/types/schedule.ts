/** Рабочий день врача. Время — минуты от полуночи, чтобы не заводить строковую арифметику. */
export interface WorkingDay {
  /** 1 — понедельник, 7 — воскресенье. */
  dayOfWeek: number;
  startsAt: number;
  endsAt: number;
  breakStart?: number;
  breakEnd?: number;
}

export interface DoctorSchedule {
  doctorSlug: string;
  workingDays: WorkingDay[];
  /** Отпуск, обучение, выходные вне графика: даты в формате `2026-09-12`. */
  daysOff: string[];
  /** Уже занятые приёмы: `2026-09-12T09:30`. Придут из CRM, сейчас демонстрационные. */
  bookedSlots: string[];
}

export type SlotState = "free" | "booked" | "past";

export interface TimeSlot {
  /** Минуты от полуночи. */
  minutes: number;
  /** Подпись `09:30`. */
  label: string;
  state: SlotState;
}

export interface ScheduleDay {
  /** `2026-09-12` */
  date: string;
  dayOfWeek: number;
  isWorking: boolean;
  slots: TimeSlot[];
  freeCount: number;
}
