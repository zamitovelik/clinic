"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { StepDateTime } from "./step-datetime";
import { StepPatient } from "./step-patient";
import { StepConfirm } from "./step-confirm";
import { AppointmentProvider, useAppointment } from "@/stores/appointment-store";
import { buildDemoBookedSlots, buildScheduleDays } from "@/lib/schedule";
import { Link } from "@/i18n/link";
import { useI18n } from "@/i18n/context";
import { fill } from "@/i18n";
import { formatDate } from "@/i18n/format";
import { company } from "@/data/company";
import { Button } from "@/components/ui/button";
import type { BookingData } from "@/types/booking";
import { cn } from "@/lib/cn";

/**
 * Запись к конкретному врачу — модальное окно.
 *
 * Врач уже выбран, поэтому шагов «услуга» и «врач» здесь нет: человек
 * попадает сразу на календарь. Направление приёма выбирается строкой сверху
 * и заранее подставлено — оно нужно администратору, но не должно превращаться
 * в отдельный шаг и уводить со страницы врача.
 */

/** Шаги внутри окна: нумерация общего мастера, подписи — короткие. */
const MODAL_STEPS = [
  { id: 3, key: "datetime" },
  { id: 4, key: "patient" },
  { id: 5, key: "confirmShort" },
] as const;

export function BookingModal({
  booking,
  initialDate,
  initialTime,
  open,
  onClose,
}: {
  booking: BookingData;
  initialDate?: string;
  initialTime?: string;
  open: boolean;
  onClose: () => void;
}) {
  const { doctor, services } = booking;
  const { dict } = useI18n();

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="panel"
      title={dict.booking.modalTitle}
    >
      <AppointmentProvider
        initialDraft={{
          doctorSlug: doctor.slug,
          // Направление подставляем сразу: без него мастер начал бы
          // с выбора услуги, ради которой человек сюда и не заходил.
          serviceSlug: services[0]?.slug ?? null,
          date: initialDate ?? null,
          time: initialTime ?? null,
        }}
      >
        <BookingFlow booking={booking} onClose={onClose} />
      </AppointmentProvider>
    </Modal>
  );
}

function BookingFlow({
  booking,
  onClose,
}: {
  booking: BookingData;
  onClose: () => void;
}) {
  const { doctor, services, schedule } = booking;
  const { step, draft, back, result, setServiceKeepingDoctor, goTo } =
    useAppointment();
  const { dict } = useI18n();

  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  /*
   * Расписание считается здесь, при открытии окна, а не на сервере: страница
   * со списком врачей может быть отдана из кэша, и вшитое в неё время
   * устарело бы. Окно открывается по клику — значит, время всегда текущее.
   *
   * Занятые слоты пока демонстрационные и восстанавливаются из графика.
   * Когда данные пойдут из CRM, они придут заполненными и будут взяты как
   * есть — эта ветка просто перестанет срабатывать.
   */
  const days = useMemo(() => {
    const at = new Date();
    const filled =
      schedule.bookedSlots.length > 0
        ? schedule
        : {
            ...schedule,
            bookedSlots: buildDemoBookedSlots(doctor.slug, schedule, at),
          };

    return buildScheduleDays(filled, at);
  }, [schedule, doctor.slug]);

  // Окно прокручивается внутри себя, поэтому при смене шага возвращаем
  // его содержимое к началу.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ block: "start" });
  }, [step, result]);

  if (result) {
    const service = services.find((item) => item.slug === result.serviceSlug);

    return (
      <div
        ref={topRef}
        className="flex flex-col items-center gap-6 py-2 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="h-7 w-7" strokeWidth={1.6} aria-hidden />
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="display text-[28px]">{dict.success.title}</h3>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-2">
            {fill(dict.success.text, { phone: result.patientPhone })}
          </p>
        </div>

        <dl className="w-full overflow-hidden rounded-card border border-line text-left">
          {[
            { label: dict.success.doctor, value: doctor.name },
            { label: dict.success.service, value: service?.title ?? "—" },
            { label: dict.success.date, value: formatDate(result.date, dict) },
            { label: dict.success.time, value: result.time },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-baseline gap-4 border-b border-line px-4 py-3 last:border-b-0"
            >
              <dt className="w-20 shrink-0 text-[13px] text-ink-3">{row.label}</dt>
              <dd className="text-[15px] text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Button size="lg" onClick={onClose} className="w-full sm:w-auto">
          {dict.booking.done}
        </Button>

        <p className="text-[13px] text-ink-3">
          {dict.success.rescheduleShort}{" "}
          <a
            href={`tel:${company.phoneRaw}`}
            className="text-accent tabular hover:underline"
          >
            {company.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div ref={topRef} className="flex flex-col gap-6">
      <div className="flex items-center gap-3.5 rounded-card border border-line bg-milk p-3.5">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist">
          <Image
            src={doctor.photo}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </span>

        <span className="flex min-w-0 flex-col gap-0.5">
          {/* Имя переносим, а не обрезаем: это главное, что подтверждает
              человеку, что он записывается именно к тому врачу. */}
          <span className="text-[15px] leading-snug font-semibold text-ink">
            {doctor.name}
          </span>
          <span className="text-[13px] text-accent">{doctor.specialty}</span>
        </span>

        <Link
          href={`/doctors/${doctor.slug}`}
          className="ml-auto shrink-0 text-[13px] text-ink-3 transition-colors hover:text-accent"
        >
          {dict.booking.aboutDoctor}
        </Link>
      </div>

      {/* Направление приёма. Когда врач ведёт одно — показываем строкой,
          выбирать не из чего. */}
      {services.length > 1 ? (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-[13px] font-semibold tracking-wide text-ink-3 uppercase">
            {dict.booking.direction}
          </legend>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => {
              const selected = draft.serviceSlug === service.slug;

              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => setServiceKeepingDoctor(service.slug)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-pill border px-3.5 py-1.5 text-[13px] transition-colors",
                    selected
                      ? "border-accent bg-accent text-white"
                      : "border-line text-ink-2 hover:border-accent-line hover:bg-accent-soft hover:text-accent",
                  )}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        services[0] && (
          <p className="text-[13px] text-ink-3">
            {dict.booking.directionOne}{" "}
            <span className="text-ink">{services[0].title}</span>
          </p>
        )
      )}

      <ProgressLine step={step} onGoTo={goTo} draft={draft} />

      {/* Ключ по шагу: содержимое проявляется заново при переходе. */}
      <div key={step} className="flex animate-fade-in flex-col gap-6">
        {step === 3 && <StepDateTime days={days} />}
        {step === 4 && <StepPatient />}
        {step === 5 && (
          <StepConfirm
            services={services}
            doctors={[doctor]}
            // Услугу меняем строкой выше, врач здесь один — править нечего.
            editableSteps={[3, 4]}
          />
        )}
      </div>

      {step > 3 && (
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 self-start text-sm text-ink-2 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {dict.booking.back}
        </button>
      )}
    </div>
  );
}

/** Короткая полоса прогресса на четыре шага. */
function ProgressLine({
  step,
  draft,
  onGoTo,
}: {
  step: number;
  draft: { date: string | null; time: string | null };
  onGoTo: (step: number) => void;
}) {
  const { dict } = useI18n();
  const reachable = !draft.date || !draft.time ? 3 : 5;

  return (
    <nav aria-label={dict.booking.stepsNav}>
      <ol className="flex items-center gap-1.5">
        {MODAL_STEPS.map((item) => {
          const done = item.id < step;
          const current = item.id === step;

          return (
            <li key={item.id} className="flex flex-1 items-center gap-1.5">
              <button
                type="button"
                onClick={() => item.id <= reachable && onGoTo(item.id)}
                disabled={item.id > reachable}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex flex-1 flex-col gap-1.5 text-left text-[12px] transition-colors",
                  current ? "text-accent" : done ? "text-ink-2" : "text-ink-3",
                  item.id > reachable && "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "h-1 w-full rounded-full transition-colors",
                    current || done ? "bg-accent" : "bg-line",
                  )}
                />
                {dict.steps[item.key]}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
