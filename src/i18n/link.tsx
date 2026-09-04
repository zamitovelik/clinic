"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "./context";
import { localizedPath } from "./config";

type NextLinkProps = ComponentProps<typeof NextLink>;

/**
 * Ссылка, которая сама подставляет язык.
 *
 * Внутри кода адреса пишутся без префикса (`/doctors`), поэтому ни одна
 * ссылка не может «потерять» язык при переходе — это самая частая ошибка
 * в многоязычных сайтах.
 */
export function Link({ href, ...props }: NextLinkProps) {
  const { locale } = useI18n();
  const target =
    typeof href === "string" && href.startsWith("/")
      ? localizedPath(href, locale)
      : href;

  return <NextLink href={target} {...props} />;
}
