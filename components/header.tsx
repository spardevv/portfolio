"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitch } from "@/components/language-switch";
import { ScrollProgress } from "@/components/scroll-progress";
import { switchThemeAnimated } from "@/lib/theme-transition";

const sectionIds = ["home", "projects", "skills", "about", "experience"] as const;

function ThemeIcon({ isDark }: { isDark: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={isDark ? "sun" : "moon"}
        initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.span>
    </AnimatePresence>
  );
}

export function Header() {
  const { locale } = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const t = content[locale].nav;
  const a11y = content[locale].a11y;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: t.projects, href: "#projects" },
    { label: t.skills, href: "#skills" },
    { label: t.about, href: "#about" },
    { label: t.experience, href: "#experience" },
  ];

  useEffect(() => {
    setMounted(true);

    const updateActiveSection = () => {
      const markerPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= markerPosition) {
          currentSection = sectionId;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const isActive = (href: string) => activeSection === href.slice(1);
  const toggleTheme = (e: ReactMouseEvent) =>
    switchThemeAnimated(resolvedTheme === "dark" ? "light" : "dark", setTheme, { x: e.clientX, y: e.clientY });
  const isDark = mounted && resolvedTheme === "dark";
  const [scrolled, setScrolled] = useState(false);
  // Depois de sair do hero, no celular o header some e fica só o botão de menu flutuando
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("home");
      setPastHero(!!hero && window.scrollY > hero.offsetHeight - 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
        } ${
          // Mobile fora do hero: sem fundo, borda nem desfoque — só o botão de menu fica visível
          pastHero && !mobileOpen ? "max-md:pointer-events-none max-md:border-transparent max-md:bg-transparent max-md:backdrop-blur-none" : ""
        }`}
      >
        <div className={`transition-opacity duration-300 ${pastHero && !mobileOpen ? "max-md:opacity-0" : ""}`}>
          <ScrollProgress />
        </div>
        <div className="mx-auto grid h-[72px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  className={`label-caps relative transition-colors duration-300 hover:text-foreground ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {/* Sublinhado único que desliza entre os itens ativos */}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute -bottom-2 left-0 h-px w-full bg-accent-soft"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <span className="md:hidden" />

          <Link
            href="#home"
            className={`font-display text-[22px] font-normal leading-none tracking-[0.01em] text-foreground transition-all duration-300 ${
              pastHero && !mobileOpen ? "max-md:pointer-events-none max-md:-translate-y-3 max-md:opacity-0" : ""
            }`}
          >
            SPAR<span className="text-accent-soft">.DEV_</span>
          </Link>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <LanguageSwitch />
            <a
              href="#contact"
              className="label-caps flex h-[38px] items-center rounded-[3px] bg-foreground px-4 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.contact}
            </a>
            <button
              onClick={(e) => toggleTheme(e)}
              aria-label={a11y.toggleTheme}
              className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[3px] border border-border-strong bg-background text-foreground transition-colors hover:border-accent-soft hover:text-accent-soft"
            >
              <ThemeIcon isDark={isDark} />
            </button>
          </div>

          <div className="flex justify-end md:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? a11y.closeMenu : a11y.openMenu}
              aria-expanded={mobileOpen}
              className={`pointer-events-auto relative z-50 grid h-10 w-10 ${pastHero && !mobileOpen ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : ""} place-items-center overflow-hidden rounded-[3px] border border-border-strong bg-background text-foreground`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-card px-8 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href.slice(1));
                    setMobileOpen(false);
                  }}
                  className="flex items-baseline gap-4 font-display text-5xl font-light leading-tight tracking-tight text-foreground"
                >
                  <span className="label-caps text-accent-soft">#{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-3 border-t border-border pt-6"
            >
              <LanguageSwitch />
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="label-caps rounded-[3px] bg-foreground px-4 py-3 text-background"
              >
                {t.contact}
              </a>
              <button
                onClick={(e) => toggleTheme(e)}
                aria-label={a11y.toggleTheme}
                className="overflow-hidden rounded-[3px] border border-border-strong p-2.5 text-foreground"
              >
                <ThemeIcon isDark={isDark} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
