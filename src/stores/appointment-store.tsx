"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { createAppointment } from "@/services/api";
import type { Appointment, AppointmentDraft } from "@/types/appointment";

/**
 * Состояние мастера записи (раздел 12 ТЗ).
 *
 * Вынесено в отдельный store, потому что шаги должны видеть общий черновик,
 * а экран подтверждения — всё сразу. Держать это в пропсах пришлось бы
 * протаскивать через каждый шаг.
 */

export const STEPS = [
  { id: 1, title: "Услуга" },
  { id: 2, title: "Врач" },
  { id: 3, title: "Дата" },
  { id: 4, title: "Время" },
  { id: 5, title: "Данные" },
  { id: 6, title: "Подтверждение" },
] as const;

export const FIRST_STEP = 1;
export const LAST_STEP = STEPS.length;

interface State {
  step: number;
  draft: AppointmentDraft;
  submitting: boolean;
  error: string | null;
  result: Appointment | null;
}

type Action =
  | { type: "service"; slug: string; keepDoctor?: boolean }
  | { type: "doctor"; slug: string | null; anyDoctor: boolean }
  | { type: "date"; date: string }
  | { type: "time"; time: string }
  | { type: "patient"; patch: Partial<AppointmentDraft> }
  | { type: "goto"; step: number }
  | { type: "next" }
  | { type: "back" }
  | { type: "submitting" }
  | { type: "submitted"; appointment: Appointment }
  | { type: "failed"; message: string }
  | { type: "reset" };

const emptyDraft: AppointmentDraft = {
  serviceSlug: null,
  doctorSlug: null,
  anyDoctor: false,
  date: null,
  time: null,
  patientName: "",
  patientPhone: "",
  comment: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "service":
      // Запись к конкретному врачу: направление меняется, но врач и уже
      // выбранное время остаются — уводить человека назад незачем.
      if (action.keepDoctor) {
        return {
          ...state,
          draft: { ...state.draft, serviceSlug: action.slug },
        };
      }

      // Обычный порядок: смена услуги может сделать выбранного врача
      // неподходящим, поэтому дальнейшие шаги сбрасываются.
      return {
        ...state,
        step: 2,
        draft: {
          ...state.draft,
          serviceSlug: action.slug,
          doctorSlug: null,
          anyDoctor: false,
          date: null,
          time: null,
        },
      };

    case "doctor":
      // У другого врача своё расписание — выбранные дата и время недействительны.
      return {
        ...state,
        step: 3,
        draft: {
          ...state.draft,
          doctorSlug: action.slug,
          anyDoctor: action.anyDoctor,
          date: null,
          time: null,
        },
      };

    case "date":
      return {
        ...state,
        step: 4,
        draft: { ...state.draft, date: action.date, time: null },
      };

    case "time":
      return { ...state, step: 5, draft: { ...state.draft, time: action.time } };

    case "patient":
      return { ...state, draft: { ...state.draft, ...action.patch } };

    case "goto":
      return { ...state, step: action.step, error: null };

    case "next":
      return { ...state, step: Math.min(state.step + 1, LAST_STEP), error: null };

    case "back":
      return { ...state, step: Math.max(state.step - 1, FIRST_STEP), error: null };

    case "submitting":
      return { ...state, submitting: true, error: null };

    case "submitted":
      return { ...state, submitting: false, result: action.appointment };

    case "failed":
      return { ...state, submitting: false, error: action.message };

    case "reset":
      return { step: FIRST_STEP, draft: emptyDraft, submitting: false, error: null, result: null };

    default:
      return state;
  }
}

interface Store extends State {
  setService: (slug: string) => void;
  /** Сменить направление, не сбрасывая выбранного врача, дату и время. */
  setServiceKeepingDoctor: (slug: string) => void;
  setDoctor: (slug: string | null, anyDoctor?: boolean) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setPatient: (patch: Partial<AppointmentDraft>) => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  submit: () => Promise<void>;
  reset: () => void;
  /** До какого шага можно перейти по клику в индикаторе прогресса. */
  maxReachableStep: number;
}

const AppointmentContext = createContext<Store | null>(null);

export function AppointmentProvider({
  children,
  initialDraft,
}: {
  children: React.ReactNode;
  /** Предзаполнение из адреса страницы: ?service=…&doctor=…&date=…&time= */
  initialDraft?: Partial<AppointmentDraft>;
}) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const draft = { ...emptyDraft, ...initialDraft };

    // Начинаем с первого незаполненного шага, чтобы переход со страницы
    // врача или услуги не заставлял выбирать заново.
    const step = !draft.serviceSlug
      ? 1
      : !draft.doctorSlug && !draft.anyDoctor
        ? 2
        : !draft.date
          ? 3
          : !draft.time
            ? 4
            : 5;

    return { step, draft, submitting: false, error: null, result: null };
  });

  const submit = useCallback(async () => {
    const { draft } = state;
    if (!draft.serviceSlug || !draft.date || !draft.time) {
      dispatch({ type: "failed", message: "Заполнены не все поля записи" });
      return;
    }

    dispatch({ type: "submitting" });

    try {
      const appointment = await createAppointment({
        serviceSlug: draft.serviceSlug,
        doctorSlug: draft.anyDoctor ? null : draft.doctorSlug,
        date: draft.date,
        time: draft.time,
        patientName: draft.patientName.trim(),
        patientPhone: draft.patientPhone.trim(),
        comment: draft.comment.trim() || undefined,
      });

      dispatch({ type: "submitted", appointment });
    } catch (error) {
      dispatch({
        type: "failed",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось отправить запись. Попробуйте ещё раз.",
      });
    }
  }, [state]);

  const value = useMemo<Store>(() => {
    const { draft } = state;

    const maxReachableStep = !draft.serviceSlug
      ? 1
      : !draft.doctorSlug && !draft.anyDoctor
        ? 2
        : !draft.date
          ? 3
          : !draft.time
            ? 4
            : draft.patientName && draft.patientPhone
              ? 6
              : 5;

    return {
      ...state,
      maxReachableStep,
      setService: (slug) => dispatch({ type: "service", slug }),
      setServiceKeepingDoctor: (slug) =>
        dispatch({ type: "service", slug, keepDoctor: true }),
      setDoctor: (slug, anyDoctor = false) =>
        dispatch({ type: "doctor", slug, anyDoctor }),
      setDate: (date) => dispatch({ type: "date", date }),
      setTime: (time) => dispatch({ type: "time", time }),
      setPatient: (patch) => dispatch({ type: "patient", patch }),
      goTo: (step) => dispatch({ type: "goto", step }),
      next: () => dispatch({ type: "next" }),
      back: () => dispatch({ type: "back" }),
      reset: () => dispatch({ type: "reset" }),
      submit,
    };
  }, [state, submit]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment(): Store {
  const store = useContext(AppointmentContext);
  if (!store) {
    throw new Error("useAppointment используется вне AppointmentProvider");
  }
  return store;
}
