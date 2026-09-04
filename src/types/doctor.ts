import type { Localized } from "@/i18n/config";

export interface EducationItem {
  year: string;
  institution: Localized;
  specialty: Localized;
}

export interface WorkExperienceItem {
  /** «2020 — 2022» либо «2022 — н. в.» */
  period: Localized;
  place: Localized;
  role: Localized;
}

export interface Certificate {
  id: string;
  title: Localized;
  year: string;
  /** Изображение документа для просмотра во весь экран. */
  image: string;
}

export interface Doctor {
  id: string;
  slug: string;
  /** Имя не переводится: оно одинаково на обоих языках. */
  name: string;
  specialty: Localized;
  /** Стаж в годах. */
  experience: number;
  /** Квалификационная категория. */
  category: Localized;
  photo: string;
  /** Одна фраза для карточки. */
  shortDescription: Localized;
  /** Развёрнутая биография для страницы врача. */
  biography: Localized<string[]>;
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  certificates: Certificate[];
  /** Услуги, которые ведёт врач. */
  serviceSlugs: string[];
  /** Направления для подписи под именем. */
  specializations: Localized<string[]>;
  demo?: boolean;
}
