# Temática grega no portfólio — design (Opção A: ornamentos)

Data: 2026-11-26 · Status: revertido a pedido do usuário

## Intenção e porquê
O usuário quer que o site tenha uma estética de Grécia antiga, por razão **estética**: combinar com as gravuras de
cerâmica (ânforas, kylix, carruagem) que já são os fundos das seções e do pre-loader. O bloco "whoami --stack" já
virou uma fachada de templo; falta levar a linguagem para o resto do site.

## Metas
- O site parecer da mesma família visual das gravuras de ânfora, sem perder a identidade atual (azul elétrico sobre
  azul-marinho, fontes de pôster, logo SPAR.DEV_, favicon, banner do LinkedIn).
- Ornamentos leves, repetidos de forma consistente nas seções.

## Não metas
- Trocar paleta, tipografia, logo, favicon ou imagens (isso seria as opções B/C, descartadas por ora).
- Mexer em conteúdo/textos além dos rótulos numerados.

## Anti-metas (seria falha mesmo funcionando)
- Site "enfeitado demais" ou carnavalesco: ornamento que compete com o texto.
- Quebrar a regra de cada seção caber em uma tela (hero e seções têm `section-screen`/100svh).
- Peso ou custo de rolagem perceptível (nada de imagens novas; tudo em SVG/CSS).

## Restrições
- Next.js + Tailwind v4, framer-motion; estilos/tokens em `app/globals.css`; temas claro e escuro (cores via
  `var(--foreground)`, `--accent-soft`, `--border`).
- Faixas decorativas ficam finas (≤ 10px de altura) por causa do "uma tela por seção".
- Decorativo = `aria-hidden`; respeitar `prefers-reduced-motion` em qualquer animação.

## Abordagens consideradas
- **A. Só ornamentos (escolhida pelo usuário):** meandro, colunas/frontão, numerais romanos; mantém a identidade.
- B. Cerâmica de verdade (terracota/preto/creme, tipografia de inscrição): mais coerente, mas refaz a identidade.
- C. Híbrido com acento terracota/dourado: descartado por ora; pode ser uma evolução de A.

## Design (o que muda)
1. **Componente `GreekMeander`** (`components/greek-meander.tsx`): faixa SVG repetível (padrão de meandro/chave
   grega) em `currentColor`, baixa opacidade, altura configurável (8–10px). Sem animação por padrão.
2. **Divisórias entre seções:** onde hoje há `border-t border-border` entre seções, usar a faixa de meandro no
   lugar (ou sobre a borda), no topo de cada seção e no rodapé.
3. **`SectionHeader`:** numeração `#01` vira numeral romano (I–IV); uma faixa curta de meandro (~56px) ao lado/abaixo
   do rótulo. Rodapé usa `V`. O hero troca `#00` por um pequeno trecho de meandro (romano não tem zero).
4. **Pre-loader:** a barra de progresso fina vira uma faixa de meandro que "preenche" com o progresso
   (mesma lógica, só o desenho muda).
5. **Terminal (templo):** já feito; ajustes só se a faixa de meandro pedir consistência de cor/espessura.

Decidido pelo usuário: opção A e o motivo estético. Decisões minhas (marcadas): numerais romanos nos rótulos,
meandro como motivo principal, pre-loader com barra de meandro.

## Deixado ao implementador
Desenho exato do SVG do meandro, opacidade/espessura finas, posições exatas por seção, nome das props.
Verificar visualmente em desktop (≥1024) e celular, temas claro e escuro, e que nenhuma seção ultrapassa uma tela.

## Verificação
Visual no navegador (desktop e mobile, claro e escuro), `tsc --noEmit`, sem novos erros de console.
