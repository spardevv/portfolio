"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { content, skillsData } from "@/lib/content";
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { SectionBackdrop } from "@/components/section-backdrop";

const CATS = skillsData.categories;
const TOTAL = new Set(CATS.flatMap((c) => c.skills)).size;
/** Tempo de cada categoria no ciclo automático (pausa no hover/foco). */
const CYCLE_MS = 4500;
const SLUG: Record<(typeof CATS)[number]["titleKey"], string> = {
  languages: "languages",
  database: "database",
  orm: "orm",
  mobile: "mobile",
  frontend: "frontend",
  tools: "tools",
};

export function SkillsSection() {
  const { locale } = useLocale();
  const t = content[locale].skills;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { amount: 0.4 });
  const cat = CATS[active];

  // Percorre as categorias sozinho enquanto a seção está visível e ninguém está interagindo
  useEffect(() => {
    if (paused || !inView || reduceMotion) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CATS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, inView, reduceMotion]);

  return (
    <MotionSection
      id="skills"
      className="relative isolate overflow-hidden border-t border-border section-screen px-6 py-16 md:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <SectionBackdrop src="/images/bg/books.webp" side="left" position="40% 50%" />
      <SectionBackdrop src="/images/bg/athena.webp" position="50% 30%" />
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          index={2}
          kicker={t.kicker}
          title={t.title}
          description={t.description}
          action={
            <p className="label-caps flex items-baseline gap-3 text-muted-foreground">
              <span className="poster text-[clamp(44px,min(5vw,8vh),72px)] text-foreground">{TOTAL}</span>
              {t.total}
            </p>
          }
        />

        <MotionDiv
          variants={fadeInUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-10 grid gap-4 lg:mt-[clamp(20px,4vh,48px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-5"
        >
          {/* Índice de categorias */}
          <div
            role="tablist"
            aria-label={t.title}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-border lg:px-0 lg:pb-0"
          >
            {CATS.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.titleKey}
                  role="tab"
                  id={`skill-tab-${c.titleKey}`}
                  aria-selected={on}
                  aria-controls="skill-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-[3px] border px-4 py-2.5 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-border lg:px-0 lg:py-[clamp(8px,1.6vh,16px)] ${
                    on ? "border-primary bg-primary text-primary-foreground lg:bg-transparent lg:text-foreground" : "border-border-strong text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`label-caps w-6 ${on ? "lg:text-accent-soft" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap font-display text-[17px] font-light leading-tight transition-transform duration-300 lg:text-[clamp(20px,min(1.9vw,3.2vh),28px)] lg:group-hover:translate-x-1">
                    {t.categories[c.titleKey]}
                  </span>
                  <span className="label-caps ml-auto hidden lg:inline">{c.skills.length}</span>
                  {/* barra de progresso do ciclo automático */}
                  {on && (
                    <span className="absolute inset-x-0 bottom-[-1px] hidden h-[2px] overflow-hidden lg:block">
                      <motion.span
                        key={`${active}-${paused}`}
                        className="block h-full origin-left bg-accent-soft"
                        initial={{ scaleX: paused || reduceMotion ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused || reduceMotion ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Painel de pôster com as tecnologias da categoria ativa */}
          <div
            ref={panelRef}
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${cat.titleKey}`}
            className="relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-[4px] bg-primary p-5 text-white md:p-7 lg:min-h-[clamp(300px,46vh,440px)]"
          >
            {/* retícula e número gigante de fundo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-25"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.55) 0.8px, transparent 1.3px)",
                backgroundSize: "6px 6px",
              }}
            />
            <span
              aria-hidden="true"
              className="poster pointer-events-none absolute -bottom-[0.12em] -right-[0.04em] -z-10 text-[clamp(160px,min(22vw,34vh),300px)] text-white/10"
            >
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="flex items-center justify-between gap-4 font-mono text-[12px] text-white/80">
              <span>
                <span className="text-white/50">~ $</span> ls skills/{SLUG[cat.titleKey]}
              </span>
              <span className="label-caps">
                {cat.skills.length} {t.items}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={cat.titleKey}
                className="mt-auto flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 pt-8"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                }}
              >
                {cat.skills.map((s, j) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] } },
                    }}
                    className="poster text-[clamp(34px,min(4.2vw,7vh),68px)] !leading-[1]"
                  >
                    {s}
                    {j < cat.skills.length - 1 && <span className="ml-[0.35em] text-white/35">/</span>}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
