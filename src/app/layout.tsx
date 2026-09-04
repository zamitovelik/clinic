import type { Metadata } from "next";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { company } from "@/data/company";
import "./globals.css";

/**
 * Пара шрифтов: антиква Cormorant для крупных заголовков и гротеск Onest
 * для всего остального. Оба поддерживают кириллицу — это обязательное
 * условие, иначе заголовки молча уедут на системный запасной шрифт.
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — стоматология в Ташкенте`,
    template: `%s — ${company.name}`,
  },
  description: `Стоматологическая клиника ${company.name} в Ташкенте: терапия, имплантация, ортодонтия, детский приём. Онлайн-запись к врачу. ${company.addressFull}.`,
  keywords: [
    "стоматология Ташкент",
    "стоматологическая клиника",
    "имплантация зубов Ташкент",
    "ортодонт Ташкент",
    "детский стоматолог",
    "Dentos Medical",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
    title: `${company.name} — стоматология в Ташкенте`,
    description: `Терапия, имплантация, ортодонтия и детский приём. Онлайн-запись к врачу.`,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${onest.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-pill focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Перейти к содержимому
        </a>

        <SiteHeader />
        {/* Нижняя панель на мобильном перекрывает контент — компенсируем отступом. */}
        <main id="content" className="pb-20 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
