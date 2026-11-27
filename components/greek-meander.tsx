"use client";

import { useId } from "react";

interface GreekMeanderProps {
  className?: string;
  /** Altura da faixa em px (o padrão repete na horizontal). */
  height?: number;
}

/**
 * Faixa de meandro (chave grega) repetível, desenhada em `currentColor`.
 * Decorativa: não entra na árvore de acessibilidade.
 */
export function GreekMeander({ className = "", height = 8 }: GreekMeanderProps) {
  const id = `meander-${useId().replace(/:/g, "")}`;
  const k = height / 8; // o motivo é desenhado numa grade 12×8 e escalado para a altura pedida

  return (
    <svg aria-hidden="true" focusable="false" width="100%" height={height} className={`block ${className}`}>
      <defs>
        <pattern id={id} width={12 * k} height={height} patternUnits="userSpaceOnUse">
          <g transform={`scale(${k})`} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter">
            {/* Onda quadrada que sobe da linha de base… */}
            <path d="M0 7 H2 V1 H10 V7 H12" />
            {/* …com o gancho em espiral por dentro */}
            <path d="M4 7 V3.5 H8 V5.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}
