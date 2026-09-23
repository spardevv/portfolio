"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { ExternalLink, Github, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from "@/components/motion";

const PROJECT_HUES: Record<string, number> = {
  "style-system": 215,
  Atrium: 150,
};
const FALLBACK_HUES = [215, 150, 335, 20, 280];

export function ProjectsSection() {
  const { locale } = useLocale();
  const t = content[locale].projects;
  const a11y = content[locale].a11y;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <MotionSection
      id="projects"
      className="px-4 py-24 md:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-5xl">
        <MotionDiv variants={fadeInUp} className="mb-14 max-w-2xl">
          <h2 className="font-display text-[clamp(30px,4.6vw,68px)] font-light leading-[1.1] tracking-[-0.025em] text-foreground">
            {t.title}
          </h2>
          <p className="mt-4 font-sans text-[17px] leading-[1.6] text-muted-foreground">{t.description}</p>
        </MotionDiv>

        <div>
          {t.items.map((project, index) => {
            const open = openIndex === index;
            const hue = PROJECT_HUES[project.title] ?? FALLBACK_HUES[index % FALLBACK_HUES.length];

            return (
              <MotionDiv key={project.title} variants={fadeInUp} className="border-t border-border last:border-b">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) setOpenIndex(index);
                  }}
                  aria-expanded={open}
                  className="group grid w-full grid-cols-[40px_1fr_44px] items-center gap-4 py-6 text-left md:grid-cols-[70px_1fr_44px] md:py-8"
                >
                  <span className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <h3
                    className={`font-display text-[clamp(30px,5vw,76px)] font-light leading-[1.05] tracking-[-0.03em] text-foreground transition-transform duration-300 ${
                      open ? "translate-x-2" : "group-hover:translate-x-2"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                      open ? "rotate-45 bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </motion.button>

                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 md:grid-cols-2 md:py-12 md:pl-[70px]">
                      <div>
                        <p className="mb-5 max-w-md font-sans text-[17px] leading-[1.6] text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border px-3 py-1.5 font-sans text-[13px] font-medium text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 font-sans text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                            >
                              {t.viewSite}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground transition-colors hover:text-primary"
                              aria-label={a11y.githubRepo}
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div
                        className="relative aspect-[16/10] overflow-hidden rounded-[22px] saturate-[1.1]"
                        style={{
                          background: `conic-gradient(from 210deg at 42% 58%, hsl(${hue} 90% 72%), hsl(${hue + 70} 90% 66%), hsl(${hue + 150} 85% 72%), hsl(${hue} 90% 72%))`,
                        }}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute -inset-[20%] animate-[th-drift_9s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
                          style={{
                            background:
                              "radial-gradient(40% 40% at 30% 30%, rgba(255,255,255,0.6), transparent 70%), radial-gradient(50% 50% at 75% 80%, rgba(0,0,0,0.25), transparent 70%)",
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 animate-[th-shine_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>

        <MotionDiv variants={fadeInUp} className="mt-14 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/spardevv" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              {t.viewAll}
            </a>
          </Button>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
