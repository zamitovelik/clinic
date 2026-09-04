import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { I18nProvider } from "@/i18n/context";
import {
  fill,
  getDictionary,
  isLocale,
  locales,
  localizedPath,
  pick,
  type Locale,
} from "@/i18n";
import { company } from "@/data/company";
import "../globals.css";

/**
 * Пара шрифтов: антиква Cormorant для крупных заголовков и гротеск Onest
 * для всего остального. Оба поддерживают кириллицу и латиницу — это
 * обязательное условие для двуязычного сайта, иначе один из языков молча
 * уедет на системный запасной шрифт.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentosmedical.uz";

/** Обе языковые версии собираются заранее. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const vars = {
    company: company.name,
    address: pick(company.addressFull, locale),
    phone: company.phone,
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: fill(dict.meta.siteTitle, vars),
      template: `%s — ${company.name}`,
    },
    description: fill(dict.meta.siteDescription, vars),
    keywords: [...dict.meta.keywords],
    // Поисковым системам нужно знать про обе версии страницы,
    // иначе они сочтут их дублями.
    alternates: {
      canonical: localizedPath("/", locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, localizedPath("/", item)]),
      ),
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "uz_UZ",
      siteName: company.name,
      title: fill(dict.meta.siteTitle, vars),
      description: dict.meta.ogDescription,
      url: `${siteUrl}${localizedPath("/", locale)}`,
      // Без картинки ссылка приходит в мессенджер голым текстом, а в Узбекистане
      // ссылками делятся почти только там.
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: fill(dict.meta.siteTitle, vars),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fill(dict.meta.siteTitle, vars),
      description: dict.meta.ogDescription,
      images: [`/og-${locale}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${cormorant.variable} ${onest.variable}`}>
      <body className="min-h-dvh">
        <I18nProvider locale={locale as Locale} dict={dict}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-pill focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
          >
            {dict.header.skipToContent}
          </a>

          <SiteHeader />
          {/* Нижняя панель на мобильном перекрывает контент — компенсируем отступом. */}
          <main id="content" className="pb-20 md:pb-0">
            {children}
          </main>
          <SiteFooter locale={locale as Locale} />
          <MobileActionBar />
        </I18nProvider>
      </body>
    </html>
  );
}

/** Других языков, кроме описанных, не существует — 404 вместо генерации. */
export const dynamicParams = false;
