/** Черновик записи, который собирается по шагам мастера. */
export interface AppointmentDraft {
  serviceSlug: string | null;
  /** `null` означает «любой подходящий врач». */
  doctorSlug: string | null;
  anyDoctor: boolean;
  /** `2026-09-12` */
  date: string | null;
  /** `09:30` */
  time: string | null;
  patientName: string;
  patientPhone: string;
  comment: string;
}

/** Данные, уходящие в API при подтверждении. */
export interface CreateAppointmentInput {
  serviceSlug: string;
  doctorSlug: string | null;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  comment?: string;
}

export interface Appointment extends CreateAppointmentInput {
  /** Идентификатор, который в будущем вернёт CRM. */
  id: string;
  createdAt: string;
  status: "pending";
}
