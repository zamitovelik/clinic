import Link from "next/link";
import { AtSign, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { navLinks } from "./nav-links";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-milk">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-2">
            Стоматологическая клиника в Ташкенте. Лечение, восстановление
            и профилактика для взрослых и детей.
          </p>
        </div>

        <nav aria-label="Разделы сайта">
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            Разделы
          </h2>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Услуги">
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            Услуги
          </h2>
          <ul className="flex flex-col gap-2.5">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            Контакты
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-ink-2">
            <li>
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span className="tabular">{company.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={company.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <AtSign className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {company.instagram}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {company.addressFull}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}
          </p>
          <Link href="/privacy" className="transition-colors hover:text-accent">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
