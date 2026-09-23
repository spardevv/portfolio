"use client";

import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { Marquee } from "@/components/marquee";

export function MarqueeBand() {
  const { locale } = useLocale();
  const items = content[locale].marquee;

  return (
    <div className="relative z-[2] bg-primary py-6 text-primary-foreground md:py-8" aria-hidden="true">
      <Marquee
        items={items}
        durationSeconds={26}
        textClassName="font-display text-2xl font-light md:text-4xl after:content-['✦'] after:ml-4 after:text-base after:align-middle"
      />
    </div>
  );
}
