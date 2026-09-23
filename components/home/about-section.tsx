"use client";

import type { CSSProperties } from "react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import Image from "next/image";
import { Marquee } from "@/components/marquee";
import { MotionDiv, Counter, fadeInUp, staggerContainer } from "@/components/motion";

const STROKE_TEXT: CSSProperties = {
  WebkitTextStroke: "1px rgba(17,17,17,0.33)",
  color: "transparent",
};

export function AboutSection() {
  const { locale } = useLocale();
  const about = content[locale].about;
  const projectCount = content[locale].projects.items.length;

  const stats = [
    { label: about.stats.projects, value: projectCount },
    { label: about.stats.languages, value: 2 },
  ];

  return (
    <section id="about" className="px-4 py-16 md:py-24">
      <h2 className="sr-only">{about.title}</h2>

      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mx-auto max-w-5xl"
      >
        <MotionDiv
          variants={fadeInUp}
          className="flex items-center justify-between gap-4 border-b border-border py-6 font-display text-sm font-light text-muted-foreground"
        >
          <span>{about.stripLeft}</span>
          <span>{about.stripRight}</span>
        </MotionDiv>

        <MotionDiv
          variants={fadeInUp}
          className="relative mt-8 grid place-items-center overflow-hidden rounded-[clamp(18px,2.6vw,36px)] py-[clamp(26px,5vw,72px)] md:mt-10"
          style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-ink)" }}
        >
          <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between py-[6%]">
            <Marquee
              items={["FULL-STACK DEVELOPER"]}
              durationSeconds={40}
              textClassName="font-display text-[clamp(44px,8vw,130px)] font-extralight tracking-[-0.03em]"
              textStyle={STROKE_TEXT}
            />
            <Marquee
              items={["WEB · MOBILE · API"]}
              reverse
              durationSeconds={40}
              textClassName="font-display text-[clamp(44px,8vw,130px)] font-extralight tracking-[-0.03em]"
              textStyle={STROKE_TEXT}
            />
            <Marquee
              items={["FULL-STACK DEVELOPER"]}
              durationSeconds={40}
              textClassName="font-display text-[clamp(44px,8vw,130px)] font-extralight tracking-[-0.03em]"
              textStyle={STROKE_TEXT}
            />
          </div>

          <div
            className="relative z-10 aspect-[3/4] w-[clamp(150px,20vw,260px)] overflow-hidden rounded-[14px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
            style={{ background: "linear-gradient(160deg,#cfcfcf,#9b9b9b)" }}
          >
            <Image
              src="/images/profile2.jpg"
              alt="Gabriel Fernandes Ramos"
              fill
              className="object-cover grayscale contrast-[1.05]"
            />
          </div>
        </MotionDiv>

        <div className="mt-[clamp(50px,7vw,100px)] grid grid-cols-1 gap-[clamp(16px,3vw,40px)] sm:grid-cols-2">
          {stats.map((stat) => (
            <MotionDiv key={stat.label} variants={fadeInUp} className="border-t border-border pt-5">
              <small className="block font-sans text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </small>
              <Counter
                to={stat.value}
                className="mt-3 block font-display text-[clamp(64px,10vw,150px)] font-extralight leading-none tracking-[-0.04em] text-foreground"
              />
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
}
