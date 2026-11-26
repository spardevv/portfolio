"use client";

import type { ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Inclina levemente o conteúdo em 3D seguindo o mouse; volta ao centro ao sair. */
export function TiltCard({ children, className = "", max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 26, mass: 0.5 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
