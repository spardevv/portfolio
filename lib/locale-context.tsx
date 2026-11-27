"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/lib/content"

type LocaleContextType = {
  locale: Locale
  toggleLocale: () => void
  /** Sobe a cada troca feita pelo usuário (não na restauração do idioma salvo); usado para animar o texto. */
  changeId: number
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt-BR")
  const [changeId, setChangeId] = useState(0)

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-locale") as Locale | null
    if (saved === "pt-BR" || saved === "en-US") {
      setLocale(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "en-US" ? "en" : "pt-BR"
  }, [locale])

  const toggleLocale = () => {
    setChangeId((n) => n + 1)
    setLocale((prev) => {
      const next = prev === "pt-BR" ? "en-US" : "pt-BR"
      window.localStorage.setItem("portfolio-locale", next)
      return next
    })
  }

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, changeId }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
