"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Linha fina no pé do header que cresce conforme a página é rolada. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-primary dark:bg-accent-soft"
    />
  );
}
