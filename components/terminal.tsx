"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TABS = [
  {
    id: "web",
    label: "Web",
    cmd: "cat stack/web.txt",
    out: "React · Vue.js · Angular · TypeScript · Tailwind",
  },
  {
    id: "mobile",
    label: "Mobile",
    cmd: "cat stack/mobile.txt",
    out: "Kotlin · Jetpack Compose · Room",
  },
  {
    id: "api",
    label: "API",
    cmd: "cat stack/api.txt",
    out: "C# · .NET · Entity Framework · MSSQL · PostgreSQL",
  },
] as const;

const MARBLE = "color-mix(in srgb, var(--foreground) 70%, transparent)";
const MARBLE_DIM = "color-mix(in srgb, var(--foreground) 35%, transparent)";

/** Terminal com abas, desenhado como a fachada de um templo grego. */
export function Terminal({ className }: { className?: string }) {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("web");
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const reduceMotion = useReducedMotion();
  // Digita o comando letra a letra a cada troca de aba; a saída aparece quando termina
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(tab.cmd.length);
      return;
    }
    setTyped(0);
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= tab.cmd.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 32);
    return () => clearInterval(id);
  }, [tab.cmd, reduceMotion]);

  const done = typed >= tab.cmd.length;

  return (
    <div className={className}>
      {/* Templo grego: frontão com o título, friso com as abas (tríglifos), colunas dóricas
          ladeando o "cella" onde roda o terminal, e o estilóbato em degraus. */}
      <div className="px-1">
        {/* Frontão */}
        <div className="relative h-8" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: MARBLE, clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
          <div
            className="absolute inset-x-[3px] bottom-0 top-[3px] bg-[#0b0b6e] dark:bg-[#0a0a5c]"
            style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
          />
        </div>
        <p className="label-caps relative z-10 -mt-3 mb-1 text-center text-[11px] text-white/75" style={{ textShadow: "0 0 6px #0b0b6e" }}>
          whoami --stack
        </p>
        {/* Cornija */}
        <div className="-mx-1 h-1.5" style={{ background: MARBLE }} aria-hidden="true" />
        {/* Friso: as abas separadas por tríglifos */}
        <div
          role="tablist"
          className="grid grid-cols-3 border-y bg-[#0b0b6e] dark:bg-[#0a0a5c]"
          style={{ borderColor: MARBLE_DIM }}
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={`label-caps relative py-2.5 transition-colors ${
                t.id === active ? "bg-primary text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[7px] opacity-60"
                  style={{ backgroundImage: `repeating-linear-gradient(90deg, ${MARBLE} 0 1px, transparent 1px 3px)` }}
                />
              )}
              {t.label}
            </button>
          ))}
        </div>
        {/* Arquitrave */}
        <div className="-mx-0.5 h-1" style={{ background: MARBLE_DIM }} aria-hidden="true" />

        {/* Colunas + cella */}
        <div className="flex items-stretch text-[13px] text-white">
          <Column />
          <div role="tabpanel" className="min-w-0 flex-1 space-y-1.5 bg-[#0b0b6e] px-4 py-4 font-mono leading-relaxed dark:bg-[#0a0a5c]">
            <p>
              <span className="text-[#8a8aff]">~ $</span> {tab.cmd.slice(0, typed)}
              {!done && <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-white/80" />}
            </p>
            {/* Reserva a altura das linhas para o layout não pular durante a digitação */}
            <p key={tab.id} className={`text-white/80 transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`}>
              {tab.out}
            </p>
            <p className={done ? "" : "invisible"}>
              <span className="text-[#8a8aff]">~ $</span>{" "}
              <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-white/80" />
            </p>
          </div>
          <Column />
        </div>

        {/* Estilóbato: três degraus */}
        <div aria-hidden="true">
          <div className="-mx-0.5 h-1" style={{ background: MARBLE }} />
          <div className="-mx-1.5 mt-px h-1" style={{ background: MARBLE_DIM }} />
          <div className="-mx-2.5 mt-px h-1" style={{ background: MARBLE_DIM, opacity: 0.6 }} />
        </div>
      </div>
    </div>
  );
}

/** Coluna dórica: capitel (equino + ábaco), fuste canelado e base. */
function Column() {
  return (
    <div aria-hidden="true" className="flex w-4 shrink-0 flex-col items-stretch">
      <div className="-mx-[3px] h-1" style={{ background: MARBLE }} />
      <div className="-mx-px h-0.5" style={{ background: MARBLE_DIM }} />
      <div
        className="flex-1"
        style={{ backgroundImage: `repeating-linear-gradient(90deg, ${MARBLE} 0 2px, ${MARBLE_DIM} 2px 4px)` }}
      />
      <div className="-mx-px h-0.5" style={{ background: MARBLE_DIM }} />
      <div className="-mx-[3px] h-1" style={{ background: MARBLE }} />
    </div>
  );
}
