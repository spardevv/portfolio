import type { CSSProperties } from "react";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  durationSeconds?: number;
  className?: string;
  textClassName?: string;
  textStyle?: CSSProperties;
}

export function Marquee({
  items,
  reverse = false,
  durationSeconds = 40,
  className,
  textClassName,
  textStyle,
}: MarqueeProps) {
  // Cada metade repete os itens várias vezes para cobrir telas largas;
  // a animação desloca exatamente uma metade (-50%), então o loop é contínuo.
  const half = Array.from({ length: Math.max(2, Math.ceil(8 / items.length)) }, () => items).flat();
  const loop = [...half, ...half];

  return (
    <div
      className={`flex overflow-hidden whitespace-nowrap motion-reduce:hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="flex flex-none items-center"
        style={{
          animation: `marquee ${durationSeconds}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {loop.map((item, i) => (
          <span key={i} className={`pr-[0.6em] ${textClassName ?? ""}`} style={textStyle}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
