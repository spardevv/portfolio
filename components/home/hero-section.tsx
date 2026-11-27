"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { MotionDiv } from "@/components/motion";
import { Terminal } from "@/components/terminal";
import { SOCIAL_LINKS } from "@/lib/social";
import { withYears } from "@/lib/career";
import { SectionBackdrop } from "@/components/section-backdrop";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const ICONS = { github: Github, linkedin: Linkedin, email: Mail };
/** Imagem do Next animável: o transform vai direto no <img>, preservando o mix-blend do duotone. */
const MotionImage = motion.create(Image);

/** Título de pôster do hero. `inverse` desenha tudo em branco (usado na camada sobre a foto). */
function HeroTitle({ top, bottom, role, inverse = false }: { top: string; bottom: string; role?: string; inverse?: boolean }) {
  const Tag = inverse ? "div" : "h1";
  return (
    // Tamanho limitado pela largura E pela altura da tela, para nunca empurrar o resto para fora
    <Tag className="poster mt-[clamp(12px,2vh,24px)] text-[clamp(44px,13vw,190px)] lg:text-[min(12.5vw,15vh,190px)]">
      {role && <span className="sr-only">{role}</span>}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className={`block ${inverse ? "text-white" : "text-foreground"}`}
      >
        {top}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        className={`block ${inverse ? "text-white" : "text-primary dark:text-accent-soft"}`}
      >
        {bottom}
      </motion.span>
    </Tag>
  );
}

export function HeroSection() {
  const { locale } = useLocale();
  const t = content[locale].hero;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Parallax: ao rolar para fora do hero, a foto desce mais devagar que a página
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "14%"]);

  return (
    <section ref={sectionRef} id="home" className="relative isolate overflow-hidden">
      {/* Carruagem bem sutil atrás do texto, do lado oposto à foto */}
      <SectionBackdrop src="/images/bg/chariot.webp" side="left" position="50% 50%" className="!opacity-40 max-lg:hidden lg:!w-[55%]" />
      {/* Retrato: ocupa a metade direita no desktop, com corte diagonal de pôster */}
      <MotionDiv
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="duotone cut-left absolute inset-y-0 right-0 hidden w-[48%] lg:block"
      >
        <MotionImage
          src="/images/profile-hero.webp"
          alt="Gabriel Fernandes Ramos"
          fill
          priority
          sizes="50vw"
          // Foto espelhada: o rosto olha para o texto e fica perto da borda esquerda da imagem.
          // Zoom ancorado à esquerda para o rosto não sair pela borda.
          style={{ y: photoY, scale: 1.12, originX: 0, originY: 0.3 }}
          className="object-cover object-[0%_40%]"
        />
      </MotionDiv>

      {/* Mobile/tablet: a foto vira o fundo do hero, ocupando a parte de cima da tela.
          Um degradê para a cor de fundo garante a leitura do texto, que fica na parte de baixo. */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-[10svh] -z-10 h-[82svh] lg:hidden">
        <div className="duotone absolute inset-0">
          <Image src="/images/profile-hero.webp" alt="" fill priority sizes="100vw" className="object-cover object-[0%_0%]" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            // Topo escurecido (leitura do header), meio transparente (rosto) e base sólida (texto)
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--background) 75%, transparent) 9%, color-mix(in srgb, var(--background) 5%, transparent) 26%, color-mix(in srgb, var(--background) 55%, transparent) 55%, var(--background) 88%)",
          }}
        />
      </div>

      {/* Cópia branca do título recortada no mesmo formato da foto: onde o título passa
          sobre o retrato, as letras ficam brancas em vez de marinho sobre azul. */}
      <MotionDiv
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="cut-left pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[48%] overflow-hidden lg:block"
      >
        {/* Largura da seção inteira (100% / 0.48), ancorada à direita, para reproduzir o mesmo layout */}
        <div className="absolute right-0 top-0 w-[calc(100%/0.48)]">
          <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 lg:pt-[88px]">
            <div className="label-caps invisible flex items-center gap-3">
              <span>#00</span>
              <span>&nbsp;</span>
            </div>
            <HeroTitle top={t.posterTop} bottom={t.posterBottom} inverse />
          </div>
        </div>
      </MotionDiv>

      {/* O hero ocupa uma tela inteira. No mobile o conteúdo fica embaixo, sobre o degradê da foto. */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-8 pt-24 md:px-10 lg:h-[100svh] lg:justify-start lg:min-h-[620px] lg:pb-6 lg:pt-[88px]">
        <MotionDiv
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-caps flex items-center gap-3 text-muted-foreground"
        >
          <span className="text-accent-soft">#00</span>
          <span>
            {t.greeting} {t.name}
          </span>
        </MotionDiv>

        <HeroTitle top={t.posterTop} bottom={t.posterBottom} role={t.role} />

        <p className="label-caps mt-[clamp(12px,2vh,24px)] text-[15px] tracking-[0.06em] text-foreground">{t.stack}</p>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex min-h-0 flex-col gap-[clamp(16px,2.6vh,28px)] lg:mt-[clamp(16px,2.6vh,28px)] lg:max-w-[46%]"
        >
          <p className="text-pretty text-[15px] leading-[1.7] text-muted-foreground">{withYears(t.description)}</p>


          {/* Em telas baixas o terminal sai para o hero continuar cabendo em uma tela */}
          <Terminal className="hidden max-w-[30rem] sm:block lg:[@media(max-height:820px)]:hidden" />
        </MotionDiv>

        <div className="label-caps mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-5 sm:gap-x-7 lg:mt-auto lg:max-w-[46%] lg:border-0 lg:pt-6">
          <span className="flex w-full items-center gap-2 text-muted-foreground sm:w-auto">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ddc84]" />
            {t.current} · {t.location}
          </span>
          {SOCIAL_LINKS.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <a
                key={s.id}
                href={s.href}
                target={s.id === "email" ? undefined : "_blank"}
                rel={s.id === "email" ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent-soft"
              >
                <Icon className="h-4 w-4" />
                {/* No celular o email vira só "Email" para a linha não quebrar */}
                {s.id === "email" ? (
                  <>
                    <span className="sm:hidden">Email</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </>
                ) : (
                  s.label
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
