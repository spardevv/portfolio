"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";

/**
 * Botão fixo no canto. No topo da página (hero) ele é um indicativo escuro, com a seta para baixo
 * pulando, para se destacar sobre a foto azul. Ao rolar, o fundo faz uma transição em degradê
 * para o azul e a seta gira para cima, virando o "voltar ao topo".
 */
export function BackToTop() {
  const { locale } = useLocale();
  const a11y = content[locale].a11y;
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={a11y.backToTop}
      aria-hidden={!scrolled}
      tabIndex={scrolled ? 0 : -1}
      style={{
        // Degradê largo deslizando: escuro → azul
        backgroundImage: "linear-gradient(135deg, #07071a 0%, #07071a 38%, var(--primary) 62%, var(--primary) 100%)",
        backgroundSize: "300% 300%",
        backgroundPosition: scrolled ? "100% 100%" : "0% 0%",
      }}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-[3px] text-white transition-[background-position,opacity,transform] duration-500 ${
        scrolled ? "" : "pointer-events-none max-lg:translate-y-3 max-lg:opacity-0"
      }`}
    >
      <motion.span
        className="flex"
        animate={reduceMotion || scrolled ? { y: 0 } : { y: [-2, 3, -2] }}
        transition={scrolled ? { duration: 0.3 } : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* A seta aponta para baixo no topo e gira para cima ao rolar */}
        <ArrowUp className={`h-4 w-4 transition-transform duration-500 ${scrolled ? "rotate-0" : "rotate-180"}`} />
      </motion.span>
    </button>
  );
}
