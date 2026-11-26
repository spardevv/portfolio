"use client";

import { useLocale } from "@/lib/locale-context";

/** Seletor PT / EN compacto, usado no header e no menu mobile. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();
  const options = [
    { id: "pt-BR", label: "PT" },
    { id: "en-US", label: "EN" },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`flex h-[38px] items-center rounded-[3px] border border-border-strong bg-background p-[3px] ${className}`}
    >
      {options.map((o) => {
        const active = locale === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => !active && toggleLocale()}
            aria-pressed={active}
            className={`label-caps h-full rounded-[2px] px-2.5 transition-colors ${
              active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
