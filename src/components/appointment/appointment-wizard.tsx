"use client";

import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Stepper } from "./stepper";
import { StepService } from "./step-service";
import { StepDoctor } from "./step-doctor";
import { StepDate } from "./step-date";
import { StepTime } from "./step-time";
import { StepPatient } from "./step-patient";
import { StepConfirm } from "./step-confirm";
import { SuccessScreen } from "./success-screen";
import { FIRST_STEP, useAppointment } from "@/stores/appointment-store";
import { buildScheduleDays, combineScheduleDays } from "@/lib/schedule";
import { useI18n } from "@/i18n/context";
import { pick } from "@/i18n";
import type { Doctor } from "@/types/doctor";
import type { Service } from "@/types/service";
import type { DoctorSchedule, ScheduleDay } from "@/types/schedule";

/**
 * Мастер записи целиком (раздел 12 ТЗ).
 *
 * Все расписания приходят с сервера в компактном виде, поэтому переключение
 * шагов происходит мгновенно — ждать загрузки между шагами не приходится.
 */
export function AppointmentWizard({
  services,
  doctors,
  schedules,
  now,
}: {
  services: Service[];
  doctors: Doctor[];
  /** Ключ — адрес врача, значение — его график: рабочие дни и занятые слоты. */
  schedules: Record<string, DoctorSchedule>;
  /**
   * Момент, от которого отсчитывается расписание. Приходит с сервера, чтобы
   * первая отрисовка на сервере и на клиенте совпала: иначе разница в часах
   * между ними разошлась бы на границе «прошедшего» слота.
   */
  now: string;
}) {
  const { step, draft, back, result } = useAppointment();
  const { dict, locale } = useI18n();
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // При смене шага возвращаем взгляд к началу мастера: иначе после выбора
  // даты на мобильном человек оказывается посреди следующего шага.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const element = topRef.current;
    if (!element) return;
    if (element.getBoundingClientRect().top >= 0) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, result]);

  // Сетка времени строится здесь, а не на сервере: передавать тысячи готовых
  // слотов в разметке дороже, чем посчитать их из компактного графика.
  const scheduleDays = useMemo(() => {
    const at = new Date(now);
    return Object.fromEntries(
      Object.entries(schedules).map(([slug, schedule]) => [
        slug,
        buildScheduleDays(schedule, at),
      ]),
    ) as Record<string, ScheduleDay[]>;
  }, [schedules, now]);

  const doctorsForService = useMemo(() => {
    if (!draft.serviceSlug) return doctors;
    return doctors.filter((doctor) =>
      doctor.serviceSlugs.includes(draft.serviceSlug!),
    );
  }, [doctors, draft.serviceSlug]);

  // Для «любого подходящего врача» дни собираются из расписаний всех
  // подходящих специалистов.
  const activeDays = useMemo<ScheduleDay[]>(() => {
    if (draft.anyDoctor) {
      return combineScheduleDays(
        doctorsForService
          .map((doctor) => scheduleDays[doctor.slug])
          .filter((days): days is ScheduleDay[] => Boolean(days)),
      );
    }

    return draft.doctorSlug ? (scheduleDays[draft.doctorSlug] ?? []) : [];
  }, [draft.anyDoctor, draft.doctorSlug, doctorsForService, scheduleDays]);

  // Экраны подтверждения и успеха показывают только названия,
  // поэтому язык выбираем один раз здесь.
  const flatServices = useMemo(
    () =>
      services.map((service) => ({
        slug: service.slug,
        title: pick(service.title, locale),
      })),
    [services, locale],
  );

  const flatDoctors = useMemo(
    () => doctors.map((doctor) => ({ slug: doctor.slug, name: doctor.name })),
    [doctors],
  );

  if (result) {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <SuccessScreen services={flatServices} doctors={flatDoctors} />
      </div>
    );
  }

  return (
    <div ref={topRef} className="flex scroll-mt-28 flex-col gap-8">
      <Stepper />

      <div className="flex flex-col gap-6">
        {step === 1 && <StepService services={services} />}
        {step === 2 && <StepDoctor doctors={doctorsForService} />}
        {step === 3 && <StepDate days={activeDays} />}
        {step === 4 && <StepTime days={activeDays} />}
        {step === 5 && <StepPatient />}
        {step === 6 && (
          <StepConfirm services={flatServices} doctors={flatDoctors} />
        )}

        {step > FIRST_STEP && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 self-start text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {dict.common.back}
          </button>
        )}
      </div>
    </div>
  );
}
