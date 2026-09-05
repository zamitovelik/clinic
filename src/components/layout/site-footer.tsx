import { AtSign, MapPin, Phone } from "lucide-react";
import NextLink from "next/link";
import { Logo } from "./logo";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { getDictionary, localizedPath, pick, type Locale } from "@/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  // Подвал — серверный компонент, поэтому язык подставляем сами,
  // а не через клиентскую обёртку Link.
  const href = (path: string) => localizedPath(path, locale);

  const sections = [
    { href: "/about", label: dict.nav.about },
    { href: "/services", label: dict.nav.services },
    { href: "/prices", label: dict.nav.prices },
    { href: "/doctors", label: dict.nav.doctors },
    { href: "/#reviews", label: dict.nav.reviews },
    { href: "/contacts", label: dict.nav.contacts },
  ];

  return (
    <footer className="border-t border-line bg-milk">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-2">
            {dict.footer.tagline}
          </p>
        </div>

        <nav aria-label={dict.footer.sitemapNav}>
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            {dict.footer.sections}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {sections.map((link) => (
              <li key={link.href}>
                <NextLink
                  href={href(link.href)}
                  className="text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.services}>
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            {dict.footer.services}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <NextLink
                  href={href(`/services/${service.slug}`)}
                  className="text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  {pick(service.title, locale)}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-[13px] font-semibold tracking-wide text-ink">
            {dict.footer.contacts}
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-ink-2">
            {company.phones.map((item, index) => (
              <li key={item.raw}>
                <a
                  href={`tel:${item.raw}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  {/* Значок только у первого номера: два телефона подряд
                      с одинаковой иконкой читаются как два разных пункта. */}
                  {index === 0 ? (
                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  ) : (
                    <span className="h-4 w-4 shrink-0" aria-hidden />
                  )}
                  <span className="tabular">{item.display}</span>
                </a>
              </li>
            ))}
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
              {pick(company.addressFull, locale)}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}
          </p>
          <NextLink
            href={href("/privacy")}
            className="transition-colors hover:text-accent"
          >
            {dict.footer.privacy}
          </NextLink>
        </div>
      </div>
    </footer>
  );
}
