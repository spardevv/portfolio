"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { MotionDiv, Counter, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { GreekMeander } from "@/components/greek-meander";
import { SectionBackdrop } from "@/components/section-backdrop";
import { yearsOfExperience, withYears } from "@/lib/career";


export function AboutSection() {
  const { locale } = useLocale();
  const about = content[locale].about;
  const projectCount = content[locale].projects.items.length;
  const jobs = about.sections.trajectory.items;
  const companies = new Set(jobs.map((j) => j.company)).size;

  const stats = [
    { label: about.stats.years, value: yearsOfExperience(), suffix: "+" },
    { label: about.stats.companies, value: companies },
    { label: about.stats.projects, value: projectCount },
    { label: about.stats.languages, value: 2 },
  ];

  const facts = [about.location, about.education, about.languagesInfo];
  // No celular a introdução começa recolhida em 4 linhas
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative isolate overflow-hidden bg-card section-screen px-6 md:px-10">
      <GreekMeander className="pointer-events-none absolute inset-x-0 top-0 z-10 text-foreground/25" height={8} />
      <SectionBackdrop src="/images/bg/discobolus.webp" position="50% 25%" />
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader index={3} kicker={about.kicker} title={about.title} />

        <div className="mt-6 grid gap-6 lg:mt-[clamp(20px,4vh,48px)] lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <MotionDiv variants={fadeInUp}>
            <p className="display-tight text-pretty text-[clamp(22px,min(2.6vw,4.4vh),36px)] leading-[1.2] text-foreground">
              {about.subtitle}.
            </p>
            <p
              className={`mt-4 max-w-[40em] text-pretty text-[14px] leading-[1.7] text-muted-foreground lg:mt-6 lg:line-clamp-none lg:text-[15px] lg:leading-[1.75] ${
                expanded ? "" : "line-clamp-4"
              }`}
            >
              {withYears(about.intro)}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="label-caps mt-2 border-b border-accent-soft pb-0.5 text-foreground lg:hidden"
            >
              {expanded ? about.readLess : about.readMore}
            </button>

            {/* Celular: lista compacta (rótulo à esquerda, valor à direita) */}
            <dl className="mt-5 border-t border-border sm:hidden">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline gap-4 border-b border-border py-2.5">
                  <dt className="label-caps w-24 shrink-0 text-accent-soft">{f.label}</dt>
                  <dd className="text-[13px] leading-[1.5] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* Tablet/desktop: três quadros lado a lado */}
            <dl className="mt-10 hidden grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <dt className="label-caps text-accent-soft">{f.label}</dt>
                  <dd className="mt-3 text-[13px] leading-[1.6] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </MotionDiv>

          {/* Celular: os quatro números numa faixa só; desktop: grade 2x2 com números grandes */}
          <div className="grid grid-cols-4 content-start gap-x-3 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
            {stats.map((stat, i) => (
              <MotionDiv
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col-reverse border-t border-border pt-3 lg:flex-col lg:pt-5"
              >
                <small className="label-caps mt-1.5 block text-[10px] leading-[1.25] text-muted-foreground lg:mt-0 lg:text-[0.8125rem] lg:leading-none">
                  <span className="hidden lg:inline">#{String(i + 1).padStart(2, "0")} </span>
                  {stat.label}
                </small>
                <span className="flex items-start font-display text-[clamp(36px,11vw,48px)] font-extralight leading-none tracking-[-0.03em] text-foreground lg:mt-4 lg:text-[clamp(56px,min(7vw,11vh),104px)]">
                  <Counter to={stat.value} />
                  {stat.suffix && <span className="text-accent-soft">{stat.suffix}</span>}
                </span>
              </MotionDiv>
            ))}
          </div>
        </div>

      </MotionDiv>
    </section>
  );
}
