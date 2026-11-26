"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionBackdropProps {
  /** Imagem em tons de cinza (public/images/bg). */
  src: string;
  /** Lado da seção onde a imagem fica. */
  side?: "left" | "right";
  /** Ponto focal da imagem (CSS object-position). */
  position?: string;
  /** Classes extras no contêiner (ex.: opacidade menor atrás de texto). */
  className?: string;
}

/**
 * Fundo decorativo de seção no estilo gravura/scanner: a foto em cinza é tingida de azul,
 * recortada em linhas horizontais (como uma impressão de TV/xerox) e some suavemente
 * em direção ao conteúdo. Fica atrás de tudo e não recebe cliques.
 */
export function SectionBackdrop({ src, side = "right", position = "center", className = "" }: SectionBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Leve parallax: a imagem anda um pouco mais devagar que a seção
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);

  const fade = side === "right" ? "to left" : "to right";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`section-backdrop pointer-events-none absolute inset-y-0 -z-10 w-full md:w-[58%] lg:w-[48%] ${
        side === "right" ? "right-0" : "left-0"
      } ${className}`}
      style={{
        // Linhas horizontais (scanline) cruzadas com um degradê que apaga a imagem em direção ao texto
        WebkitMaskImage: `repeating-linear-gradient(to bottom, #000 0 2px, transparent 2px 4px), linear-gradient(${fade}, #000 15%, transparent 92%)`,
        maskImage: `repeating-linear-gradient(to bottom, #000 0 2px, transparent 2px 4px), linear-gradient(${fade}, #000 15%, transparent 92%)`,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0 bg-primary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover mix-blend-multiply"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
