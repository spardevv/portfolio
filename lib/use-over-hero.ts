"use client";

import { useEffect, useState } from "react";

/**
 * Diz se o elemento fixo (avaliado em `referenceY`, relativo ao topo do viewport)
 * ainda está sobre a zona clara do hero (`#hero-light`).
 *
 * Evita `mix-blend-mode` em elementos `position:fixed`: em alguns navegadores essa
 * combinação faz o blend usar um snapshot de scroll desatualizado e "fantasma" o
 * elemento numa posição errada.
 */
export function useOverHero(referenceY: number | (() => number) = 80) {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById("hero-light");
      if (!el) {
        setOverHero(false);
        return;
      }
      const y = typeof referenceY === "function" ? referenceY() : referenceY;
      setOverHero(el.getBoundingClientRect().bottom > y);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return overHero;
}
