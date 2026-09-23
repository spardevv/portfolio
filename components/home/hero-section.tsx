"use client";

import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { HeroGlassBlob } from "@/components/hero-glass-blob";
import { StreamingText, MotionDiv } from "@/components/motion";

const CURVE = "clamp(40px, 7vw, 110px)";

export function HeroSection() {
  const { locale } = useLocale();
  const t = content[locale].hero;
  const about = content[locale].about;

  return (
    <section id="home">
      <div
        id="hero-light"
        className="relative flex min-h-[max(720px,100vh)] flex-col overflow-hidden px-4 pb-10 pt-32 text-center md:pt-40"
        style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-ink)" }}
      >
        <HeroGlassBlob />

        <div className="relative z-10 mx-auto max-w-4xl">
          <StreamingText
            as="p"
            text={`${t.greeting} ${t.name}`}
            className="font-display text-[clamp(17px,1.8vw,24px)] font-light leading-none"
          />
          <StreamingText
            as="h1"
            text={t.role}
            delay={450}
            className="mx-auto mt-5 block max-w-[14em] text-balance font-display text-[clamp(38px,6.4vw,96px)] font-light leading-[1.04] tracking-[-0.025em]"
          />
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.4,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.6,
          }}
          className="relative z-10 mt-auto pt-10 font-sans text-base opacity-60"
        >
          {t.cue}
        </MotionDiv>
      </div>

      <div
        className="relative z-[2] bg-background px-4 pb-24 pt-14 text-center md:pb-36 md:pt-20"
        style={{
          marginTop: `calc(-1 * ${CURVE})`,
          borderRadius: `50% 50% 0 0 / ${CURVE} ${CURVE} 0 0`,
        }}
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl pt-6"
        >
          <p className="text-pretty font-display text-[clamp(26px,3.8vw,56px)] font-light leading-[1.18] tracking-[-0.02em] text-foreground">
            {t.description}
          </p>
          <p className="mt-[clamp(26px,3vw,44px)] text-pretty font-display text-[clamp(18px,1.9vw,26px)] font-light leading-[1.45] text-muted-foreground">
            {about.intro}
          </p>
          <a
            href="#projects"
            className="mt-10 inline-flex h-14 items-center gap-1 rounded-full bg-primary py-1 pl-7 pr-1.5 font-sans text-[17px] font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {t.cta}
            <span className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/10">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}
