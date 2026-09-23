"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { useOverHero } from "@/lib/use-over-hero";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const sectionIds = ["home", "about", "projects"] as const;

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
    { label: t.home, href: "#home" },
    { label: t.about, href: "#about" },
    { label: t.projects, href: "#projects" },
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
  const isDark = mounted && resolvedTheme === "dark";
  const overHero = useOverHero(80);
  const onDarkBody = !overHero && isDark;
  // Texto/ícones do header trocam de cor explicitamente conforme o fundo por baixo dele
  // (hero sempre claro vs. corpo claro/escuro). Evitamos mix-blend-mode aqui de propósito:
  // em elementos fixed ele usa um snapshot de scroll desatualizado e deixa o texto quase
  // invisível (mesmo motivo documentado em useOverHero).
  const chipClass = onDarkBody
    ? "bg-primary text-primary-foreground"
    : "bg-[#111111] text-white";
  const textClass = onDarkBody ? "text-foreground" : "text-[#111111]";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="#home"
          className={`pointer-events-auto font-display text-[22px] font-medium tracking-[-0.01em] transition-colors duration-300 ${textClass}`}
        >
          SPAR.DEV_
        </Link>

        <div className="pointer-events-auto hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  className={`group relative font-display text-[17px] font-normal transition-colors duration-300 ${textClass}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 ${
                      active ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className={`flex h-[38px] items-center rounded-full px-[18px] font-sans text-sm font-medium transition-colors duration-300 ${chipClass}`}
            >
              {t.contact}
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={a11y.toggleTheme}
              className={`flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${chipClass}`}
            >
              <ThemeIcon isDark={isDark} />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? a11y.closeMenu : a11y.openMenu}
          aria-expanded={mobileOpen}
          className={`pointer-events-auto grid h-11 w-11 place-items-center overflow-hidden rounded-full transition-colors duration-300 md:hidden ${chipClass}`}
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
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-[#151515] px-8 md:hidden"
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
                  className="block font-display text-4xl font-light leading-tight tracking-tight text-white"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6"
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white"
              >
                {t.contact}
              </a>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label={a11y.toggleTheme}
                className="overflow-hidden rounded-full bg-white/10 p-2 text-white"
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
