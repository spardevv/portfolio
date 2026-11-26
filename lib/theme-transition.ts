"use client";

/**
 * Troca o tema com uma revelação circular saindo do ponto do clique (View Transitions API).
 * Sem suporte no navegador ou com "reduzir movimento" ativo, troca direto.
 */
export function switchThemeAnimated(
  next: "light" | "dark",
  setTheme: (t: string) => void,
  origin?: { x: number; y: number },
) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const apply = () => {
    // Aplica a classe na hora (o next-themes só aplica num efeito), para o snapshot "novo" já sair no tema certo
    const root = document.documentElement;
    root.classList.remove(next === "dark" ? "light" : "dark");
    root.classList.add(next);
    root.style.colorScheme = next;
    setTheme(next);
  };

  if (!doc.startViewTransition || reduce) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 36;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = doc.startViewTransition(apply);
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}
