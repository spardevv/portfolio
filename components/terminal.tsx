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

/** Janela de terminal com abas, no papel do "install via terminal" da referência. */
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
      <p className="label-caps mb-3 text-muted-foreground">whoami --stack</p>
      <div className="overflow-hidden rounded-[4px] border border-primary/60 bg-[#0b0b6e] text-[13px] text-white dark:bg-[#0a0a5c]">
        <div role="tablist" className="grid grid-cols-3 border-b border-white/15">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={`label-caps py-2.5 transition-colors ${
                t.id === active ? "bg-primary text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="space-y-1.5 px-4 py-4 font-mono leading-relaxed">
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
      </div>
    </div>
  );
}
