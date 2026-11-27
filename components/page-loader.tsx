"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { SectionBackdrop } from "@/components/section-backdrop"

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Garante que o site sempre abra no topo, mesmo se o navegador tentar
    // restaurar a posição de rolagem de uma sessão anterior.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            // Sai como uma cortina subindo (ou só some, com "reduzir movimento")
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] isolate flex flex-col items-center justify-center overflow-hidden bg-background"
          >
            {/* Papel de parede no mesmo estilo dos fundos das seções */}
            <SectionBackdrop src="/images/bg/kylix.webp" side="right" position="50% 40%" className="md:!w-[75%] lg:!w-[65%]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Logo */}
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.span
                  className="font-display text-5xl font-light tracking-[0.01em] text-foreground"

                >
                  SPAR<span className="text-accent-soft">.DEV_</span>
                </motion.span>
              </motion.div>

              {/* Progress bar */}
              <div className="h-px w-56 overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-accent-soft"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <span className="label-caps tabular-nums text-muted-foreground">
                Loading {String(Math.min(Math.round(progress), 100)).padStart(3, "0")}%
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  )
}
