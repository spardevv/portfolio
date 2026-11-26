"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { TiltCard } from "@/components/tilt-card";
import { SectionBackdrop } from "@/components/section-backdrop";

type Project = (typeof content)["pt-BR"]["projects"]["items"][number];

/** Larguras alternadas na grade de 12 colunas (7/5, 5/7…) para dar ritmo de galeria. */
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

function imagesOf(project: Project): string[] {
  return "images" in project ? project.images : [];
}

function RotatingImages({ images, alt, className = "" }: { images: string[]; alt: string; className?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform,filter] duration-700 ${className} ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

export function ProjectsSection() {
  const { locale } = useLocale();
  const t = content[locale].projects;
  const a11y = content[locale].a11y;
  const items = t.items;
  const [open, setOpen] = useState<number | null>(null);
  const project = open === null ? null : items[open];
  const total = String(items.length).padStart(2, "0");

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length));

  return (
    <MotionSection
      id="projects"
      className="relative isolate overflow-hidden border-t border-border section-screen px-6 py-16 md:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <SectionBackdrop src="/images/bg/hydria.webp" position="50% 40%" />
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          index={1}
          kicker={t.kicker}
          title={t.title}
          description={t.description}
          action={
            <a
              href="https://github.com/spardevv"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps inline-flex h-11 items-center gap-2 rounded-[3px] border border-border-strong px-5 text-foreground transition-colors hover:border-accent-soft hover:text-accent-soft"
            >
              <Github className="h-4 w-4" />
              {t.viewAll}
            </a>
          }
        />

        {/* Galeria */}
        <div className="mt-10 grid auto-rows-[clamp(280px,70vw,420px)] grid-cols-1 gap-4 md:auto-rows-[clamp(280px,min(34vw,48vh),480px)] md:grid-cols-12 md:gap-5 lg:mt-[clamp(20px,4vh,48px)]">
          {items.map((p, index) => (
            <MotionDiv key={p.title} variants={fadeInUp} className={SPANS[index % SPANS.length]}>
              <TiltCard className="h-full">
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`${t.open}: ${p.title}`}
                className="gallery-tile group relative block h-full w-full overflow-hidden rounded-[4px] border border-border text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
              >
                <div className="duotone absolute inset-0">
                  <RotatingImages images={imagesOf(p)} alt="" className="group-hover:scale-[1.04]" />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0e0e22]/90 via-[#0e0e22]/10 to-transparent"
                />

                <span className="label-caps absolute left-5 top-5 z-[4] text-white/80">
                  {String(index + 1).padStart(2, "0")} / {total}
                </span>
                <span className="absolute right-4 top-4 z-[4] grid h-10 w-10 place-items-center rounded-[3px] bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:rotate-90 group-hover:bg-primary">
                  <Plus className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 z-[4] p-5 md:p-6">
                  <span className="label-caps text-[#a9a9ff]">{p.tech.join(" · ")}</span>
                  <h3 className="poster mt-2 break-words text-[clamp(40px,min(5vw,8vh),76px)] text-white transition-transform duration-500 group-hover:-translate-y-1">
                    {p.title}
                  </h3>
                </div>
              </button>
              </TiltCard>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Lightbox com os detalhes do projeto */}
      <Dialog open={project !== null} onOpenChange={(v) => !v && setOpen(null)}>
        {project && open !== null && (
          <DialogContent className="max-h-[92svh] w-[min(1100px,calc(100%-2rem))] max-w-none gap-0 overflow-y-auto rounded-[4px] border-border bg-card p-0 sm:max-w-none">
            <div className="grid md:grid-cols-[1.35fr_1fr]">
              <div className="relative aspect-[16/11] bg-black md:aspect-auto md:min-h-[520px]">
                <RotatingImages images={imagesOf(project)} alt={project.title} />
              </div>

              <div className="flex flex-col p-6 md:p-8">
                <span className="label-caps text-accent-soft">
                  {String(open + 1).padStart(2, "0")} / {total}
                </span>
                <DialogTitle className="poster mt-3 text-[clamp(44px,5vw,72px)] font-black text-foreground">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="mt-5 text-[14px] leading-[1.75] text-muted-foreground">
                  {project.description}
                </DialogDescription>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-[3px] border border-border-strong px-2.5 py-1 text-[12px] text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps inline-flex h-11 items-center gap-2 rounded-[3px] bg-primary px-5 text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                      {t.viewSite}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={a11y.githubRepo}
                      className="label-caps inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent-soft"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>

                {items.length > 1 && (
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5 md:mt-10">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="label-caps inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {items[(open - 1 + items.length) % items.length].title}
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="label-caps inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {items[(open + 1) % items.length].title}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </MotionSection>
  );
}
