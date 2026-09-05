import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, LOCALE_HEADER } from "@/i18n/config";

/**
 * Языковая маршрутизация.
 *
 * Страницы физически лежат в `app/[locale]/`, но русская версия должна
 * открываться без префикса. Поэтому обычные адреса подменяются на русские
 * внутри (`/doctors` → `/ru/doctors`), адрес в строке браузера при этом
 * не меняется. Узбекские адреса с `/uz` идут как есть.
 *
 * Явный `/ru/...` перенаправляется на адрес без префикса: две ссылки на одну
 * и ту же страницу поисковым системам не нужны.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const prefixed = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  /*
   * Язык кладётся в заголовок запроса.
   *
   * Он нужен странице 404: Next.js отрисовывает её вне сегмента с параметром,
   * поэтому обычным способом язык туда не попадает, и узбекский посетитель
   * видел бы русский текст.
   */
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, prefixed ?? defaultLocale);

  if (prefixed) return NextResponse.next({ request: { headers } });

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  /*
   * Обработчики API, статика и файлы с расширением (robots.txt, sitemap.xml)
   * языка не имеют и через middleware не проходят.
   *
   * Точка в шаблоне экранирована двумя слэшами: строка сначала читается как
   * строковый литерал, и только потом — как регулярное выражение. С одним
   * слэшем «\.» превращается в обычную точку, шаблон начинает отбрасывать
   * вообще все адреса длиннее одного символа, и подмена языка молча
   * перестаёт работать везде, кроме главной.
   */
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
