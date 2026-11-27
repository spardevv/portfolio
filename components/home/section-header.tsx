"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionDiv, fadeInUp } from "@/components/motion";
import { GreekMeander } from "@/components/greek-meander";
import { toRoman } from "@/lib/roman";

interface SectionHeaderProps {
  index: number;
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

const EASE = [0.2, 0.7, 0.2, 1] as const;
const LETTER = {
  hidden: { y: "105%" },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Cabeçalho padrão das seções: rótulo numerado (I · KICKER), título editorial e ação opcional à direita. */
export function SectionHeader({ index, kicker, title, description, action }: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const chars = Array.from(title);

  return (
    <MotionDiv variants={fadeInUp} className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div>
        <span className="label-caps flex items-center gap-3 text-accent-soft">
          <span>
            {toRoman(index)} · {kicker}
          </span>
          <GreekMeander className="w-14 shrink-0 opacity-70" height={8} />
        </span>
        <h2
          aria-label={title}
          className="poster mt-2 text-[clamp(48px,min(14vw,7.5svh),96px)] text-foreground lg:mt-3 lg:text-[min(8.5vw,12vh,136px)]"
        >
          {/* Máscara: cada letra sobe de dentro da linha. O padding extra evita cortar acentos (Ó, É). */}
          {/* O gatilho fica no contêiner: as letras começam fora da máscara (recortadas) e nunca
              seriam consideradas "visíveis" sozinhas. */}
          <motion.span
            aria-hidden="true"
            className="-mt-[0.16em] inline-flex overflow-hidden pt-[0.16em]"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.035 }}
          >
            {chars.map((c, i) => (
              <motion.span key={i} variants={LETTER} className="inline-block whitespace-pre">
                {c}
              </motion.span>
            ))}
            <motion.span variants={LETTER} className="inline-block text-primary dark:text-accent-soft">
              .
            </motion.span>
          </motion.span>
        </h2>
        {/* No celular e em telas baixas o subtítulo sai, para a seção caber inteira na tela */}
        {description && (
          <p className="mt-4 hidden max-w-xl text-[15px] leading-[1.7] text-muted-foreground lg:block lg:[@media(max-height:820px)]:hidden">
            {description}
          </p>
        )}
      </div>
      {action}
    </MotionDiv>
  );
}
