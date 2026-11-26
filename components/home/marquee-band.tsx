"use client";

import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { Marquee } from "@/components/marquee";

/** Fita inclinada de pôster que abre a seção de contato. Decorativa. */
export function MarqueeBand() {
  const { locale } = useLocale();
  const items = content[locale].marquee;

  return (
    <div aria-hidden="true" className="relative -mx-[5%] -rotate-[1.5deg] bg-primary py-4 text-primary-foreground md:py-5">
      <Marquee
        items={items}
        durationSeconds={40}
        textClassName="poster pt-[0.12em] !leading-[1.1] text-[clamp(28px,3.6vw,52px)] after:content-['/'] after:ml-6 after:opacity-50"
      />
    </div>
  );
}
