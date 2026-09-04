export interface EducationItem {
  year: string;
  institution: string;
  specialty: string;
}

export interface WorkExperienceItem {
  /** «2020 — 2022» либо «2022 — н. в.» */
  period: string;
  place: string;
  role: string;
}

export interface Certificate {
  id: string;
  title: string;
  year: string;
  /** Изображение документа для просмотра во весь экран. */
  image: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  /** Стаж в годах. */
  experience: number;
  /** Квалификационная категория. */
  category: string;
  photo: string;
  /** Одна фраза для карточки. */
  shortDescription: string;
  /** Развёрнутая биография для страницы врача. */
  biography: string[];
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  certificates: Certificate[];
  /** Услуги, которые ведёт врач. */
  serviceSlugs: string[];
  /** Направления для подписи под именем. */
  specializations: string[];
  demo?: boolean;
}
