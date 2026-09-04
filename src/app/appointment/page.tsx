import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { AppointmentWizard } from "@/components/appointment/appointment-wizard";
import { AppointmentProvider } from "@/stores/appointment-store";
import { company } from "@/data/company";
import { getDoctors, getDoctorSchedule, getServices } from "@/services/api";
import { buildScheduleDay } from "@/lib/schedule";
import type { DoctorSchedule } from "@/types/schedule";

export const metadata: Metadata = {
  title: "Онлайн-запись",
  description:
    "Запишитесь на приём в стоматологию Dentos Medical в Ташкенте: выберите услугу, врача, дату и удобное время. Подтверждение по телефону.",
  robots: { index: true, follow: true },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AppointmentPage({ searchParams }: PageProps) {
  const query = await searchParams;

  const [services, doctors] = await Promise.all([getServices(), getDoctors()]);

  // Графики всех врачей отдаём сразу: их немного, а мастер за счёт этого
  // переключает шаги без единого запроса. В разметку уходит компактный
  // график, а не тысячи посчитанных слотов — сетку строит уже клиент.
  const scheduleEntries = await Promise.all(
    doctors.map(
      async (doctor) => [doctor.slug, await getDoctorSchedule(doctor.slug)] as const,
    ),
  );

  const schedules: Record<string, DoctorSchedule> = Object.fromEntries(
    scheduleEntries.filter(
      (entry): entry is [string, DoctorSchedule] => entry[1] !== null,
    ),
  );

  // Время отсчёта фиксируем на сервере, чтобы серверная и клиентская
  // отрисовка расписания совпали.
  const now = new Date();

  // Предзаполнение из ссылок «Записаться» на страницах врача и услуги.
  const doctorSlug = single(query.doctor);
  const serviceSlug = single(query.service);
  const knownDoctor = doctors.find((doctor) => doctor.slug === doctorSlug);

  /*
   * Если пришли от врача, направление подставляем сами — его первое.
   * Иначе мастер начинал бы с выбора услуги и врача, то есть ровно с того,
   * что человек уже сделал на предыдущей странице.
   */
  const knownService =
    services.find((service) => service.slug === serviceSlug) ??
    (knownDoctor
      ? services.find((service) => knownDoctor.serviceSlugs.includes(service.slug))
      : undefined);

  const date = single(query.date);
  const time = single(query.time);
  // Дату из ссылки принимаем, только если в этот день у врача правда есть
  // свободное время: иначе мастер открылся бы на пустом шаге выбора времени.
  const linkedSchedule = knownDoctor ? schedules[knownDoctor.slug] : undefined;
  const dayExists = Boolean(
    date &&
      linkedSchedule &&
      buildScheduleDay(linkedSchedule, date, now).freeCount > 0,
  );

  return (
    <div className="bg-milk">
      <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <p className="eyebrow">Онлайн-запись</p>
            <h1 className="display text-[34px] sm:text-[46px]">Запись на приём</h1>
          </header>

          <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
            <AppointmentProvider
              initialDraft={{
                serviceSlug: knownService?.slug ?? null,
                doctorSlug: knownDoctor?.slug ?? null,
                date: dayExists ? (date ?? null) : null,
                time: dayExists && time ? time : null,
              }}
            >
              <AppointmentWizard
                services={services}
                doctors={doctors}
                schedules={schedules}
                now={now.toISOString()}
              />
            </AppointmentProvider>
          </div>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-3 rounded-card border border-line bg-paper p-6">
            <h2 className="text-[15px] font-semibold text-ink">
              Удобнее по телефону?
            </h2>
            <p className="text-[14px] leading-relaxed text-ink-2">
              Позвоните — администратор подберёт время и ответит на вопросы
              о лечении.
            </p>
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-accent tabular hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {company.phone}
            </a>
          </div>

          <div className="flex flex-col gap-3 rounded-card border border-line bg-paper p-6">
            <h2 className="text-[15px] font-semibold text-ink">Как это работает</h2>
            <ol className="flex flex-col gap-2.5 text-[14px] text-ink-2">
              <li>Вы выбираете услугу, врача и время.</li>
              <li>Мы перезваниваем и подтверждаем запись.</li>
              <li>Приходите к назначенному времени — без очереди.</li>
            </ol>
          </div>

          <div className="flex flex-col gap-2 rounded-card border border-line bg-paper p-6">
            <h2 className="text-[15px] font-semibold text-ink">Адрес</h2>
            <p className="text-[14px] text-ink-2">{company.addressFull}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
