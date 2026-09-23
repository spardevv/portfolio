"use client";

import { useLocale } from "@/lib/locale-context";

export function LanguageTab() {
  const { locale, toggleLocale } = useLocale();

  return (
    <div className="fixed right-0 top-[44%] z-[45] flex w-12 -translate-y-1/2 flex-col items-center gap-3 rounded-l-md bg-white py-3.5 text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <button
        type="button"
        onClick={() => locale !== "pt-BR" && toggleLocale()}
        aria-pressed={locale === "pt-BR"}
        className={`px-1 text-xs font-semibold tracking-[0.08em] transition-opacity ${
          locale === "pt-BR" ? "opacity-100" : "opacity-40"
        }`}
      >
        PT
      </button>
      <i className="h-px w-4 bg-black/25" />
      <button
        type="button"
        onClick={() => locale !== "en-US" && toggleLocale()}
        aria-pressed={locale === "en-US"}
        className={`px-1 text-xs font-semibold tracking-[0.08em] transition-opacity ${
          locale === "en-US" ? "opacity-100" : "opacity-40"
        }`}
      >
        EN
      </button>
    </div>
  );
}
