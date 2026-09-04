"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { navLinks } from "./nav-links";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

/**
 * Закреплённая шапка (раздел 5 ТЗ).
 *
 * При прокрутке становится компактнее: уменьшается высота и появляется
 * граница. Порог намеренно небольшой — переход должен ощущаться сразу,
 * но не дёргаться при мелких движениях.
 */
export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Переход на другую страницу должен закрывать меню.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-90 border-b bg-paper",
        "transition-[height,border-color] duration-300",
        compact ? "border-line" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-[height] duration-300",
          compact ? "h-16" : "h-20 lg:h-24",
        )}
      >
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href.startsWith("/") &&
                !link.href.includes("#") &&
                pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-pill px-4 py-2 text-sm transition-colors",
                      active
                        ? "text-accent"
                        : "text-ink-2 hover:bg-milk hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${company.phoneRaw}`}
            className="hidden items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent xl:flex"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden />
            <span className="tabular">{company.phone}</span>
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/appointment">Записаться</Link>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="rounded-pill p-2.5 text-ink transition-colors hover:bg-milk lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-90 overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Мобильная навигация" className="container-page py-6">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-line py-4 text-lg text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild size="lg">
                <Link href="/appointment">Записаться на приём</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${company.phoneRaw}`}>{company.phone}</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
