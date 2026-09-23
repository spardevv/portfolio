"use client";

import { useLocale } from "@/lib/locale-context";
import { content } from "@/lib/content";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const EMAIL = "spardevv@gmail.com";

export function Footer() {
  const { locale } = useLocale();
  const t = content[locale].footer;
  const nav = content[locale].nav;

  const socialLinks = [
    { href: "https://github.com/spardevv", icon: Github, label: "GitHub" },
    {
      href: "https://linkedin.com/in/spardevv",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
  ];

  const links = [
    { label: nav.home, href: "#home" },
    { label: nav.about, href: "#about" },
    { label: nav.projects, href: "#projects" },
  ];

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden border-t border-border bg-card"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(36px,7vw,110px)] font-light leading-[1.02] tracking-[-0.03em] text-foreground"
        >
          {t.cta}
        </motion.h2>
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 inline-block font-display text-[clamp(20px,2.6vw,38px)] font-light leading-[1.2] text-foreground border-b border-border pb-1.5 transition-colors hover:text-primary hover:border-primary"
        >
          {EMAIL}
        </motion.a>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-border pt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="font-display text-[22px] font-medium tracking-[-0.01em] text-foreground">
              SPAR<span className="text-primary">.DEV_</span>
            </span>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
            <span className="text-xs text-muted-foreground">{t.builtWith}</span>
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
                className="text-muted-foreground hover:text-primary transition-colors"
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
          className="mt-10 text-center md:text-left"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gabriel Fernandes Ramos.{" "}
            {t.rights}
          </p>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none font-display font-extralight leading-[0.85] tracking-tight text-foreground/5 text-center whitespace-nowrap"
        style={{ fontSize: "clamp(60px, 21vw, 340px)" }}
      >
        SPAR.DEV_
      </div>
    </motion.footer>
  );
}
