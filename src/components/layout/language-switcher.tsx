"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useI18n } from "@/i18n/context";
import {
  localeLabels,
  locales,
  localizedPath,
  stripLocale,
} from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Переключатель языка.
 *
 * Ведёт на ту же самую страницу, а не на главную: человек, читающий карточку
 * врача, должен остаться на ней. Это обычные ссылки, а не кнопки, поэтому
 * они видны поисковым системам как связь между языковыми версиями.
 *
 * Параметры адреса (`?doctor=…`) при смене языка не переносятся: чтобы их
 * прочитать, нужен `useSearchParams`, а он переводит каждую страницу сайта
 * в динамическую отрисовку. Ради редкого случая это слишком дорого.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const bare = stripLocale(pathname);

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={dict.header.language}
    >
      <Globe className="mr-1 h-4 w-4 shrink-0 text-ink-3" aria-hidden />

      {locales.map((item) => {
        const current = item === locale;

        return (
          <NextLink
            key={item}
            href={localizedPath(bare, item)}
            hrefLang={item}
            aria-current={current ? "true" : undefined}
            className={cn(
              "rounded-md px-1.5 py-1 text-[13px] font-medium transition-colors",
              current
                ? "bg-accent-soft text-accent"
                : "text-ink-3 hover:bg-milk hover:text-ink",
            )}
          >
            {localeLabels[item]}
          </NextLink>
        );
      })}
    </div>
  );
}
