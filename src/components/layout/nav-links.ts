"use client";

import { useI18n } from "@/i18n/context";

/**
 * Пункты основной навигации — один источник для шапки, мобильного меню
 * и подвала. Адреса пишутся без языкового префикса: его подставит `Link`.
 */
export function useNavLinks() {
  const { dict } = useI18n();

  return [
    { href: "/about", label: dict.nav.about },
    { href: "/services", label: dict.nav.services },
    { href: "/doctors", label: dict.nav.doctors },
    { href: "/#reviews", label: dict.nav.reviews },
    { href: "/contacts", label: dict.nav.contacts },
  ];
}
