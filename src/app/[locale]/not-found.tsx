import { headers } from "next/headers";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localizedPath,
  LOCALE_HEADER,
} from "@/i18n";

/**
 * Страница 404.
 *
 * Next.js отрисовывает этот файл вне сегмента с параметром, поэтому язык
 * обычным способом сюда не попадает. Его передаёт middleware заголовком —
 * иначе узбекский посетитель на несуществующем адресе видел бы русский
 * текст и русские ссылки.
 */
export default async function NotFound() {
  const requestHeaders = await headers();
  const value = requestHeaders.get(LOCALE_HEADER);
  const locale = value && isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="eyebrow">{dict.notFound.eyebrow}</p>
      <h1 className="display text-[36px] sm:text-[48px]">{dict.notFound.title}</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
        {dict.notFound.text}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <NextLink href={localizedPath("/", locale)}>
            {dict.notFound.home}
          </NextLink>
        </Button>
        <Button asChild size="lg" variant="outline">
          <NextLink href={localizedPath("/appointment", locale)}>
            {dict.notFound.book}
          </NextLink>
        </Button>
      </div>
    </div>
  );
}
