"use client";

import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/social";
import { MarqueeBand } from "@/components/home/marquee-band";
import { SectionBackdrop } from "@/components/section-backdrop";

const EMAIL = "spardevv@gmail.com";

export function Footer() {
  const { locale } = useLocale();
  const t = content[locale].footer;
  const nav = content[locale].nav;

  const socialLinks = SOCIAL_LINKS.map((l) => ({
    href: l.href,
    label: l.id === "email" ? "Email" : l.label,
    icon: l.id === "github" ? Github : l.id === "linkedin" ? Linkedin : Mail,
  }));

  const links = [
    { label: nav.projects, href: "#projects" },
    { label: nav.skills, href: "#skills" },
    { label: nav.about, href: "#about" },
    { label: nav.experience, href: "#experience" },
  ];

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative isolate flex flex-col overflow-hidden border-t border-border bg-card lg:min-h-[calc(100svh-72px)]"
    >
      <SectionBackdrop src="/images/bg/warriors.webp" position="50% 50%" />
      <div className="pt-8 lg:pt-[clamp(20px,4vh,48px)]">
        <MarqueeBand />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-6 pt-12 md:px-10 lg:pb-[clamp(8px,1.5vh,16px)] lg:pt-[clamp(24px,5vh,56px)]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-tight text-[clamp(44px,8vw,112px)] leading-[1] text-foreground lg:text-[min(7vw,11vh,112px)]"
        >
          <span className="label-caps mb-4 block text-accent-soft">#05 · {t.kicker}</span>
          {t.cta}
        </motion.h2>
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 inline-block border-b border-border pb-1.5 font-mono text-[clamp(16px,2vw,24px)] leading-[1.2] text-foreground transition-colors hover:border-accent-soft hover:text-accent-soft"
        >
          {EMAIL}
        </motion.a>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-border pt-6 md:flex-row md:items-end lg:mt-[clamp(20px,4vh,48px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="font-display text-[22px] font-normal tracking-[0.01em] text-foreground">
              SPAR<span className="text-accent-soft">.DEV_</span>
            </span>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="label-caps transition-colors hover:text-accent-soft">
                  {link.label}
                </a>
              ))}
            </nav>
            <span className="label-caps text-muted-foreground">{t.builtWith}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="text-muted-foreground transition-colors hover:text-accent-soft"
                aria-label={link.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center md:text-left"
        >
          <p className="label-caps text-muted-foreground">
            &copy; {new Date().getFullYear()} Gabriel Fernandes Ramos.{" "}
            {t.rights}
          </p>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display font-extralight uppercase leading-[0.78] tracking-tight text-foreground/[0.05]"
        style={{ fontSize: "clamp(72px, min(22vw, 25vh), 320px)" }}
      >
        SPAR.DEV_
      </div>
    </motion.footer>
  );
}
