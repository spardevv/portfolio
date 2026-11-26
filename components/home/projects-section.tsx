"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Plus, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from "@/components/motion";
import { SectionHeader } from "@/components/home/section-header";
import { TiltCard } from "@/components/tilt-card";
import { SectionBackdrop } from "@/components/section-backdrop";
import { CarouselDots, useSnapCarousel } from "@/components/snap-carousel";

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
  // Último projeto exibido: continua montado durante a animação de fechar
  const [shown, setShown] = useState(0);
  const project = items[shown];
  const total = String(items.length).padStart(2, "0");
  // Posição/escala do cartão de origem, usadas pela animação de abrir/fechar
  const [origin, setOrigin] = useState<CSSProperties>({});
  // Direção da troca entre projetos dentro do modal (anterior/próximo)
  const [swapDir, setSwapDir] = useState(0);

  /** Mede o cartão do projeto `i` relativo ao centro da tela e à largura do modal. */
  const measureTile = (i: number): CSSProperties => {
    const tile = document.querySelector<HTMLElement>(`[data-project-tile="${i}"]`);
    if (!tile) return {};
    const r = tile.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const modalW = Math.min(1100, vw - 32);
    // Mantém a origem dentro da tela (no carrossel o cartão pode estar fora de vista)
    const cx = Math.min(Math.max(r.left + r.width / 2, 0), vw);
    const cy = Math.min(Math.max(r.top + r.height / 2, 0), vh);
    return {
      "--from-x": `${Math.round(cx - vw / 2)}px`,
      "--from-y": `${Math.round(cy - vh / 2)}px`,
      "--from-s": Math.min(1, Math.max(0.25, r.width / modalW)).toFixed(3),
    } as CSSProperties;
  };

  const openProject = (i: number) => {
    setOrigin(measureTile(i));
    setSwapDir(0);
    setShown(i);
    setOpen(i);
  };
  const closeProject = () => {
    // Mede de novo: o usuário pode ter navegado para outro projeto dentro do modal
    if (open !== null) setOrigin(measureTile(open));
    setOpen(null);
  };

  // Carrossel do mobile (deslize horizontal + indicadores)
  const { trackRef, active: slide, onScroll: onTrackScroll, goTo } = useSnapCarousel();

  const step = (dir: 1 | -1) => {
    if (open === null) return;
    const next = (open + dir + items.length) % items.length;
    setSwapDir(dir);
    setShown(next);
    setOpen(next);
  };

  return (
    <MotionSection
      id="projects"
      className="relative isolate overflow-hidden border-t border-border section-screen px-6 md:px-10"
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
              className="label-caps inline-flex h-9 items-center gap-2 rounded-[3px] border border-border-strong px-4 text-foreground lg:h-11 lg:px-5 transition-colors hover:border-accent-soft hover:text-accent-soft"
            >
              <Github className="h-4 w-4" />
              {t.viewAll}
            </a>
          }
        />

        {/* Galeria: carrossel com deslize horizontal no mobile, grade a partir do tablet.
            No mobile o próximo cartão "espia" na borda para mostrar que há mais itens. */}
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="-mx-6 mt-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:auto-rows-[clamp(280px,min(34vw,48vh),480px)] md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:mt-[clamp(20px,4vh,48px)]"
        >
          {items.map((p, index) => (
            <MotionDiv
              key={p.title}
              variants={fadeInUp}
              className={`h-[clamp(300px,52svh,460px)] w-[84%] shrink-0 snap-center md:h-auto md:w-auto ${SPANS[index % SPANS.length]}`}
            >
              <TiltCard className="h-full">
              <button
                type="button"
                data-project-tile={index}
                onClick={() => openProject(index)}
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

        <CarouselDots
          className="mt-4 md:hidden"
          count={items.length}
          active={slide}
          onSelect={goTo}
          labels={items.map((p) => `${t.open}: ${p.title}`)}
          swipeLabel={t.swipe}
        />
      </div>

      {/* Lightbox com os detalhes do projeto */}
      <Dialog open={open !== null} onOpenChange={(v) => !v && closeProject()}>
        {project && (
          <DialogContent
            showCloseButton={false}
            style={origin}
            overlayClassName="project-modal-overlay bg-black/60"
            className="project-modal max-h-[92svh] w-[min(1100px,calc(100%-2rem))] max-w-none gap-0 overflow-y-auto rounded-[4px] border-border bg-card p-0 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] sm:max-w-none"
          >
            {/* Fechar com fundo sólido: fica visível mesmo sobre imagens claras */}
            <DialogClose
              aria-label={t.close}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-[3px] bg-background/90 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </DialogClose>
            <div
              key={shown}
              className={`grid md:grid-cols-[1.35fr_1fr] ${swapDir ? "modal-swap" : ""}`}
              style={{ "--swap-dir": `${swapDir * 24}px` } as CSSProperties}
            >
              <div className="modal-media relative aspect-[16/11] overflow-hidden bg-black md:aspect-auto md:min-h-[520px]">
                <RotatingImages images={imagesOf(project)} alt={project.title} />
              </div>

              {/* Cada filho entra em sequência (--i controla o atraso) */}
              <div className="modal-stagger flex flex-col p-6 md:p-8">
                <span className="label-caps text-accent-soft" style={{ "--i": 0 } as CSSProperties}>
                  {String(shown + 1).padStart(2, "0")} / {total}
                </span>
                <DialogTitle className="poster mt-3 text-[clamp(44px,5vw,72px)] font-black text-foreground" style={{ "--i": 1 } as CSSProperties}>
                  {project.title}
                </DialogTitle>
                <DialogDescription className="mt-5 text-[14px] leading-[1.75] text-muted-foreground" style={{ "--i": 2 } as CSSProperties}>
                  {project.description}
                </DialogDescription>

                <div className="mt-6 flex flex-wrap gap-2" style={{ "--i": 3 } as CSSProperties}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-[3px] border border-border-strong px-2.5 py-1 text-[12px] text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4" style={{ "--i": 4 } as CSSProperties}>
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
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5 md:mt-10" style={{ "--i": 5 } as CSSProperties}>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="label-caps inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {items[(shown - 1 + items.length) % items.length].title}
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="label-caps inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {items[(shown + 1) % items.length].title}
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
