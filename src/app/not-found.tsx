import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="display text-[36px] sm:text-[48px]">Страница не найдена</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
        Возможно, страницу удалили или в адресе опечатка. Начните с главной или
        сразу запишитесь на приём.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">На главную</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/appointment">Записаться на приём</Link>
        </Button>
      </div>
    </div>
  );
}
