"use client"

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion"
import { forwardRef, useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react"

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    )
  }
)
MotionDiv.displayName = "MotionDiv"

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode
}

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.section ref={ref} {...props}>
        {children}
      </motion.section>
    )
  }
)
MotionSection.displayName = "MotionSection"

interface MotionArticleProps extends HTMLMotionProps<"article"> {
  children: ReactNode
}

export const MotionArticle = forwardRef<HTMLElement, MotionArticleProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.article ref={ref} {...props}>
        {children}
      </motion.article>
    )
  }
)
MotionArticle.displayName = "MotionArticle"

type Word = { space: true; text: string } | { space: false; chars: string[] }

function splitText(text: string, mode: "char" | "word"): Word[] {
  const chunks = text.split(/(\s+)/).filter(Boolean)
  return chunks.map((chunk) =>
    /^\s+$/.test(chunk)
      ? { space: true, text: chunk }
      : { space: false, chars: mode === "word" ? [chunk] : chunk.split("") }
  )
}

interface StreamingTextProps {
  text: string
  as?: ElementType
  className?: string
  mode?: "char" | "word"
  delay?: number
}

/** Revela o texto letra a letra (títulos curtos) ou palavra a palavra (parágrafos), como no guia de marca. */
export function StreamingText({ text, as: Tag = "span", className, mode, delay = 0 }: StreamingTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()
  const resolvedMode = mode ?? (text.length <= 48 ? "char" : "word")
  const words = useMemo(() => splitText(text, resolvedMode), [text, resolvedMode])
  const tokenCount = useMemo(
    () => words.reduce((n, w) => (w.space ? n : n + w.chars.length), 0),
    [words]
  )

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [reduceMotion])

  const step = Math.min(resolvedMode === "char" ? 38 : 26, 1500 / Math.max(1, tokenCount))
  let tokenIndex = 0

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wi) => {
        if (word.space) return <span key={wi}>{word.text}</span>
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.chars.map((char, ci) => {
              const order = tokenIndex++
              return (
                <span
                  key={ci}
                  className="inline-block"
                  style={{
                    opacity: visible ? 1 : 0,
                    filter: visible ? "none" : "blur(4px)",
                    transform: visible ? "none" : "translateY(0.25em)",
                    transition: "opacity .34s ease-out, filter .34s ease-out, transform .34s ease-out",
                    transitionDelay: `${delay + order * step}ms`,
                  }}
                >
                  {char}
                </span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}

interface CounterProps {
  to: number
  duration?: number
  className?: string
}

/** Sobe de 0 até o valor quando entra na tela, igual aos contadores de estatística do guia. */
export function Counter({ to, duration = 1300, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setValue(to)
      return
    }
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        function tick(now: number) {
          const k = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - k, 3)
          setValue(Math.round(to * eased))
          if (k < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [to, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
