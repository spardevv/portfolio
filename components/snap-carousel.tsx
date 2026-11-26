"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Estado de um carrossel horizontal com scroll-snap: qual item está centralizado e como ir até outro. */
export function useSnapCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const items = [...el.children] as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    items.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      const bd = Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - center);
      if (d < bd) best = i;
    });
    setActive(best);
  };

  const goTo = (i: number) => {
    const item = trackRef.current?.children[i] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return { trackRef, active, onScroll, goTo };
}

/** Indicadores do carrossel: contador, pontos clicáveis e dica "Deslize →" (some no último item). */
export function CarouselDots({
  count,
  active,
  onSelect,
  labels,
  swipeLabel,
  className = "",
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  labels: string[];
  swipeLabel: string;
  className?: string;
}) {
  if (count < 2) return null;
  const total = String(count).padStart(2, "0");

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="label-caps tabular-nums text-foreground">
        {String(active + 1).padStart(2, "0")} <span className="text-muted-foreground">/ {total}</span>
      </span>
      <div className="flex items-center gap-1.5">
        {labels.map((label, i) => (
          <button
            key={label + i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={label}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary dark:bg-accent-soft" : "w-1.5 bg-border-strong"
            }`}
          />
        ))}
      </div>
      <span
        className={`label-caps ml-auto flex items-center gap-1.5 text-muted-foreground transition-opacity duration-300 ${
          active === count - 1 ? "opacity-0" : "opacity-100"
        }`}
      >
        {swipeLabel}
        <ArrowRight className="h-3.5 w-3.5 animate-[swipe-hint_1.4s_ease-in-out_infinite] motion-reduce:animate-none" />
      </span>
    </div>
  );
}

/** Classes do trilho: deslize horizontal com snap no celular; vira layout normal a partir de `md`. */
export const SNAP_TRACK =
  "-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none]";
