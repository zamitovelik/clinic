"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import type { Certificate } from "@/types/doctor";

/**
 * Сертификаты и дипломы (раздел 10 ТЗ).
 * Документ открывается во весь экран — иначе мелкий текст не прочитать.
 */
export function CertificatesGallery({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [active, setActive] = useState<Certificate | null>(null);

  if (certificates.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="display text-[28px] sm:text-[34px]">Сертификаты и дипломы</h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <button
              type="button"
              onClick={() => setActive(certificate)}
              className="group flex w-full flex-col gap-3 text-left"
            >
              <span className="relative block aspect-3/4 overflow-hidden rounded-card border border-line bg-mist transition-colors group-hover:border-accent-line">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] leading-snug text-ink transition-colors group-hover:text-accent">
                  {certificate.title}
                </span>
                <span className="text-[12px] text-ink-3 tabular">
                  {certificate.year}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? "Документ"}
        className="max-w-2xl"
      >
        {active && (
          <figure className="flex flex-col gap-4">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-card bg-milk">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="text-center text-sm text-white/80">
              {active.title} · {active.year}
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
