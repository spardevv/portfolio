"use client";

import { useLayoutEffect, useRef } from "react";
import { useLocale } from "@/lib/locale-context";

const MAX_CHAR_MS = 22; // velocidade máxima de digitação por caractere
const MAX_NODE_MS = 650; // textos longos aceleram para caber nesse tempo
const WAVE_MS = 380; // atraso entre o texto do topo e o do pé da tela

type Item = { node: Text; len: number; delay: number; duration: number };

/**
 * Ao trocar o idioma, o texto visível das seções é "digitado" de cima para baixo.
 * Não altera o DOM: esconde o trecho ainda não digitado com a CSS Custom Highlight API
 * (cor transparente), então o layout não muda durante a animação.
 */
export function LocaleTyping() {
  const { changeId } = useLocale();
  const frame = useRef(0);

  useLayoutEffect(() => {
    if (changeId === 0) return;
    const css = window.CSS as unknown as { highlights?: Map<string, unknown> };
    if (!css.highlights || typeof Highlight === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const vh = window.innerHeight;
    const items: Item[] = [];
    const roots = document.querySelectorAll("main, #contact");
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const node = n as Text;
        const text = node.data;
        const parent = node.parentElement;
        if (!parent || !text.trim() || parent.closest("script,style,[aria-hidden='true'],.sr-only")) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rect = range.getBoundingClientRect();
        if (rect.height === 0 || rect.bottom < 0 || rect.top > vh) continue;
        items.push({
          node,
          len: text.length,
          delay: (Math.max(rect.top, 0) / vh) * WAVE_MS,
          duration: Math.min(MAX_NODE_MS, text.length * MAX_CHAR_MS),
        });
      }
    });
    if (items.length === 0) return;

    const highlights = css.highlights as Map<string, unknown>;
    const untyped = new Highlight();
    highlights.set("locale-untyped", untyped);
    const total = Math.max(...items.map((i) => i.delay + i.duration));
    const start = performance.now();
    cancelAnimationFrame(frame.current);

    const tick = (now: number) => {
      const t = now - start;
      untyped.clear();
      for (const it of items) {
        if (!it.node.isConnected) continue;
        const p = Math.min(1, Math.max(0, (t - it.delay) / it.duration));
        const typed = Math.floor(it.len * p);
        if (typed >= it.len) continue;
        const r = document.createRange();
        r.setStart(it.node, typed);
        r.setEnd(it.node, it.len);
        untyped.add(r);
      }
      if (t < total) frame.current = requestAnimationFrame(tick);
      else highlights.delete("locale-untyped");
    };
    // Esconde tudo já no primeiro frame, para o texto novo não aparecer inteiro antes de começar
    tick(start);
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      highlights.delete("locale-untyped");
    };
  }, [changeId]);

  // Injetado aqui (e com a string quebrada) porque o parser de CSS do build não reconhece ::highlight()
  // e o Tailwind tentaria gerar CSS a partir de qualquer texto parecido nos fontes.
  return <style>{["::high", "light(locale-untyped)", "{color:transparent;-webkit-text-fill-color:transparent}"].join("")}</style>;
}
