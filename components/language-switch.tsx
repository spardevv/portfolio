"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

/** Seletor PT / EN compacto, usado no header e no menu mobile. O fundo da opção ativa desliza entre PT e EN. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();
  // layoutId único por instância: o seletor aparece no header e no menu mobile ao mesmo tempo
  const pillId = useId();
  const options = [
    { id: "pt-BR", label: "PT" },
    { id: "en-US", label: "EN" },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`flex h-[38px] items-center rounded-[3px] border border-border-strong bg-background p-[3px] transition-colors duration-300 hover:border-accent-soft ${className}`}
    >
      {options.map((o) => {
        const active = locale === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => !active && toggleLocale()}
            aria-pressed={active}
            className={`label-caps relative h-full rounded-[2px] px-2.5 transition-colors duration-300 ${
              active ? "text-background" : "text-muted-foreground hover:bg-foreground/10 hover:text-accent-soft"
            }`}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                aria-hidden="true"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-[2px] bg-foreground"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
