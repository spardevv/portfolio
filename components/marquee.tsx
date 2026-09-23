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
  const loop = [...items, ...items];

  return (
    <div
      className={`flex overflow-hidden whitespace-nowrap motion-reduce:hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="flex flex-none items-center"
        style={{
          animation: `marquee ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
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
