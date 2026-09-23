"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useOverHero } from "@/lib/use-over-hero";

const socials = [
  { href: "https://github.com/spardevv", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/spardevv", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:spardevv@gmail.com", icon: Mail, label: "Email" },
];

export function SocialSidebar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  // Mesmo ponto de referência fica perto da base da tela (onde o dock fica fixo),
  // então checamos se o hero claro ainda cobre essa área — não o topo.
  const overHero = useOverHero(() => window.innerHeight - 80);
  const onDarkBody = !overHero && isDark;
  const textClass = onDarkBody ? "text-foreground" : "text-[#111111]";

  return (
    <div className="pointer-events-none fixed bottom-8 left-6 z-40 hidden flex-col gap-5 md:flex">
      {socials.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("mailto") ? undefined : "_blank"}
          rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          aria-label={s.label}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`pointer-events-auto block transition-colors duration-300 ${textClass}`}
        >
          <s.icon className="h-5 w-5" />
        </motion.a>
      ))}
    </div>
  );
}
