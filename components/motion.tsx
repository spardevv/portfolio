"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import { forwardRef, type ReactNode } from "react"

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
