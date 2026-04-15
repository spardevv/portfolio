"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const { locale } = useLocale()
  const t = content[locale].footer

  const socialLinks = [
    { href: "https://github.com/gabrielframos", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/gabrielframos", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:gabrielframos@outlook.com", icon: Mail, label: "Email" },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-lg font-bold text-foreground tracking-tight hover:text-primary transition-colors">
              spardev
            </span>
            <span className="text-xs text-muted-foreground">{t.builtWith}</span>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 pt-6 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gabriel Fernandes Ramos. {t.rights}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
