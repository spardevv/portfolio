# Temática grega (ornamentos) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar a linguagem de cerâmica grega (meandro, numerais romanos) para as seções, o rodapé, o hero e o pre-loader, sem mudar paleta, tipografia ou imagens.

**Architecture:** Um componente SVG `GreekMeander` (faixa repetível em `currentColor`) é a única peça nova; `SectionHeader`, as divisórias de seção, o hero, o rodapé e o `PageLoader` passam a usá-lo. Numerais romanos vêm de um helper puro.

**Tech Stack:** Next.js (App Router), React, Tailwind v4, framer-motion. O projeto não tem suíte de testes; a verificação é `npx tsc --noEmit` + checagem visual no navegador (desktop ≥1024 e celular; tema claro e escuro).

**Spec:** `docs/superpowers/specs/2026-11-26-greek-theme-design.md`

## Global Constraints

- Opção A: não trocar paleta, fontes, logo, favicon, banner nem imagens.
- Faixas decorativas com altura ≤ 10px; cada seção continua cabendo em uma tela (`section-screen`, hero 100svh).
- Tudo decorativo com `aria-hidden="true"`; qualquer animação respeita `prefers-reduced-motion`.
- Cores só via tokens do tema (`currentColor`, `var(--foreground)`, `var(--accent-soft)`, `var(--border)`), para funcionar em claro e escuro.
- Numerais romanos I–V nos rótulos (`#01` → `I`, …, rodapé `V`); o hero não usa numeral (romano não tem zero).
- Textos em português; commits com `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Review Focus

- Seção que passa de uma tela por causa da faixa nova (telas baixas, 820px de altura): a faixa não pode empurrar o conteúdo.
- Troca de idioma (typing animation): o texto novo `I`/`II`… do rótulo não pode quebrar a animação de digitação.
- Tema claro: a faixa de meandro precisa continuar visível, mas discreta, sobre o fundo claro.
- Celular estreito (375px): faixa não gera rolagem horizontal.
- `prefers-reduced-motion`: barra de meandro do pre-loader preenche sem transição suave de largura (ou sem animação).

---

### Task 1: Componente `GreekMeander` e helper de numerais romanos

**Files:**
- Create: `components/greek-meander.tsx`
- Create: `lib/roman.ts`

**Interfaces:**
- Produces: `GreekMeander({ className?: string; height?: number }): JSX.Element` — faixa SVG `width: 100%`, repetindo o padrão de chave grega horizontalmente (`<pattern>` em SVG, traço em `currentColor`, `aria-hidden`, `height` padrão 8, `preserveAspectRatio="none"` não usado: o padrão repete, não estica).
- Produces: `toRoman(n: number): string` em `lib/roman.ts` — suporta inteiros 1–10 (`I, II, III, IV, V, VI, VII, VIII, IX, X`); fora disso devolve `String(n)`.

- [ ] **Step 1: Implementar `toRoman(n: number): string`** em `lib/roman.ts` (tabela de 1–10; fallback `String(n)`).
- [ ] **Step 2: Implementar `GreekMeander`** em `components/greek-meander.tsx`: `<svg width="100%" height={height}>` com `<pattern>` de largura `height * 2` desenhando o meandro (linha contínua em espiral quadrada) com `stroke="currentColor"`, `strokeWidth` ~1.25, `fill="none"`; `className` repassado ao `<svg>`; `aria-hidden="true"`.
- [ ] **Step 3: Verificar** — `npx tsc --noEmit` sem erros. Renderizar o componente temporariamente no hero e confirmar visualmente que o padrão repete sem emendas e fica visível nos dois temas; remover o uso temporário.
- [ ] **Step 4: Commit** — `git add components/greek-meander.tsx lib/roman.ts && git commit -m "feat: add GreekMeander and roman numeral helper"`.

### Task 2: `SectionHeader` e rodapé com numeral romano e meandro curto

**Files:**
- Modify: `components/home/section-header.tsx` (rótulo `#{index}` → `toRoman(index)`; meandro curto ao lado do rótulo)
- Modify: `components/footer.tsx:48` (`#05` → `toRoman(5)` + meandro curto)

**Interfaces:**
- Consumes: `GreekMeander`, `toRoman` (Task 1).

- [ ] **Step 1: No `SectionHeader`**, trocar o texto `#{String(index).padStart(2,"0")} · {kicker}` por `{toRoman(index)} · {kicker}` e, na mesma linha do rótulo, adicionar `<GreekMeander className="w-14 text-accent-soft/70" height={8} />` (inline ao lado, alinhado ao centro vertical).
- [ ] **Step 2: No rodapé**, mesmo tratamento: `{toRoman(5)} · {t.kicker}` + meandro curto.
- [ ] **Step 3: Verificar** — `npx tsc --noEmit`; no navegador, as quatro seções mostram `I`–`IV`, o rodapé `V`; trocar PT↔EN e confirmar que a digitação do rótulo funciona e o meandro (decorativo, `aria-hidden`) não é afetado; checar 375px sem rolagem horizontal.
- [ ] **Step 4: Commit** — `git commit -m "feat: roman numerals and meander accent on section labels"`.

### Task 3: Divisórias de seção em meandro e hero

**Files:**
- Modify: `components/home/projects-section.tsx:108`, `skills-section.tsx:44`, `about-section.tsx:31`, `experience-section.tsx:29`, `components/footer.tsx:37` (remover `border-t border-border` da `<section>` e inserir, como primeiro filho decorativo, `<GreekMeander className="absolute inset-x-0 top-0 text-foreground/25" height={8} />`)
- Modify: `components/home/hero-section.tsx:111,127` (`#00` → trecho curto de meandro)

**Interfaces:**
- Consumes: `GreekMeander` (Task 1).

- [ ] **Step 1: Substituir a borda superior** das quatro seções e do rodapé pela faixa de meandro posicionada no topo (`absolute inset-x-0 top-0`, `pointer-events-none`), sem aumentar a altura da seção.
- [ ] **Step 2: No hero**, trocar `<span>#00</span>` (duas ocorrências: rótulo visível e a cópia branca invisível) por `<GreekMeander className="w-10 text-accent-soft" height={8} />`, mantendo a mesma largura nas duas para o alinhamento da cópia branca.
- [ ] **Step 3: Verificar** — `npx tsc --noEmit`; no navegador (1280×720 e 1440×820) nenhuma seção ficou mais alta que a tela por causa das faixas; tema claro e escuro; a cópia branca do título do hero continua alinhada.
- [ ] **Step 4: Commit** — `git commit -m "feat: meander dividers between sections and hero label"`.

### Task 4: Pre-loader com barra de meandro

**Files:**
- Modify: `components/page-loader.tsx` (a barra `h-px w-56` com preenchimento)

**Interfaces:**
- Consumes: `GreekMeander` (Task 1).

- [ ] **Step 1: Substituir a barra fina** por duas camadas sobrepostas de largura `w-56`: o `GreekMeander` apagado (`text-border`) ao fundo e outro em `text-accent-soft` por cima, recortado por `clip-path`/`width` conforme `progress` (usando `motion.div` com `overflow-hidden` e `width: ${Math.min(progress,100)}%`); com `useReducedMotion`, sem `transition` na largura.
- [ ] **Step 2: Verificar** — `npx tsc --noEmit`; recarregar a página e ver o meandro preenchendo até 100% antes da cortina subir; o texto "Loading 000%" continua; sem erros de console.
- [ ] **Step 3: Commit** — `git commit -m "feat: meander progress bar in page loader"`.

### Task 5: Verificação final

- [ ] **Step 1: Conferência visual** — desktop e 375px, claro e escuro, PT e EN, sem rolagem horizontal e sem seção maior que uma tela; `npx tsc --noEmit` sem erros.
- [ ] **Step 2: Atualizar** `docs/superpowers/specs/2026-11-26-greek-theme-design.md` (status: implementado) e commitar junto com este plano.
