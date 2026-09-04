import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { defaultLocale, getDictionary, localizedPath } from "@/i18n";

/**
 * Страница 404.
 *
 * Язык здесь недоступен: Next.js отрисовывает этот файл вне сегмента
 * с параметром, поэтому берём язык по умолчанию.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="eyebrow">{dict.notFound.eyebrow}</p>
      <h1 className="display text-[36px] sm:text-[48px]">{dict.notFound.title}</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
        {dict.notFound.text}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <NextLink href={localizedPath("/", defaultLocale)}>
            {dict.notFound.home}
          </NextLink>
        </Button>
        <Button asChild size="lg" variant="outline">
          <NextLink href={localizedPath("/appointment", defaultLocale)}>
            {dict.notFound.book}
          </NextLink>
        </Button>
      </div>
    </div>
  );
}
