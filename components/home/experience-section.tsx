"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { motion } from "framer-motion";
import { MotionSection, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { SOCIAL_LINKS } from "@/lib/social";
import { SectionBackdrop } from "@/components/section-backdrop";

/** Quantas experiências mostrar; o resto fica no LinkedIn. */
const VISIBLE_JOBS = 3;
const LINKEDIN = SOCIAL_LINKS.find((s) => s.id === "linkedin")!.href;

export function ExperienceSection() {
  const { locale } = useLocale();
  const t = content[locale].about.sections.trajectory;
  const nav = content[locale].nav;
  const [open, setOpen] = useState(0);

  return (
    <MotionSection
      id="experience"
      className="relative isolate overflow-hidden border-t border-border section-screen px-6 py-16 md:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <SectionBackdrop src="/images/bg/amphora.webp" side="left" position="50% 50%" />
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index={4} kicker={t.kicker} title={nav.experience} description={t.description} />

        <ol className="mt-10 border-t border-border lg:mt-[clamp(20px,4vh,48px)]">
          {t.items.slice(0, VISIBLE_JOBS).map((job, i) => {
            const isOpen = open === i;
            return (
              <motion.li key={`${job.company}-${job.period}`} variants={fadeInUp} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left lg:py-[clamp(10px,2vh,24px)] md:grid-cols-[200px_1fr_220px_auto] md:gap-8"
                  >
                    <span className="label-caps col-span-2 text-accent-soft md:col-span-1">{job.period}</span>
                    <span className="flex flex-wrap items-center gap-3 font-display text-[clamp(22px,min(2.4vw,4vh),32px)] font-light leading-tight text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      {job.title}
                      {job.current && (
                        <span className="label-caps rounded-[3px] bg-primary px-2 py-1 text-[11px] text-primary-foreground">
                          {t.current}
                        </span>
                      )}
                    </span>
                    <span className="hidden text-[13px] text-muted-foreground md:block">{job.company}</span>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-[3px] border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-primary bg-primary text-primary-foreground"
                          : "border-border-strong text-foreground"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 md:pl-[232px] md:pr-[60px]">
                        <p className="label-caps mb-4 text-muted-foreground">
                          <span className="md:hidden">{job.company} · </span>
                          {job.context}
                        </p>
                        <ul className="max-w-[62em] space-y-1.5">
                          {job.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-[14px] leading-[1.7] text-muted-foreground">
                              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-soft" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap items-center gap-2 lg:[@media(max-height:820px)]:hidden">
                          <span className="label-caps mr-2 text-muted-foreground">{t.toolsLabel}</span>
                          {job.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-[3px] border border-border-strong px-2.5 py-1 text-[12px] text-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.li>
            );
          })}
        </ol>

        {t.items.length > VISIBLE_JOBS && (
          <p className="mt-6 text-[14px] text-muted-foreground">
            {t.more}{" "}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps inline-flex items-center gap-1 border-b border-accent-soft pb-0.5 text-[14px] text-foreground transition-colors hover:text-accent-soft"
            >
              {t.moreLink}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </p>
        )}
      </div>
    </MotionSection>
  );
}
