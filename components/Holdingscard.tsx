"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, animate } from "motion/react";

// ── Types & Props ─────────────────────────────────────────────────────────────

export interface HoldingsCardProps {
  /** Card title shown top-left */
  title?: string;
  /** Base portfolio value */
  baseValue?: number;
  /** How much the value swings up/down */
  fluctuation?: number;
  /** Chart scroll speed — higher = faster (default 0.0009) */
  speed?: number;
  /** Percentage badge text e.g. "+13%" */
  badge?: string;
  /** Period label next to badge e.g. "30 days" */
  period?: string;
  /** Accent color hex — drives line, fill, badge, tooltip */
  accentColor?: string;
  /** Emojis shown as avatar cluster */
  avatars?: string[];
  /** Floating reaction emojis */
  reactions?: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function generatePoints(
  count: number,
  width: number,
  height: number,
  seed = 0,
) {
  const points: { x: number; y: number }[] = [];
  let y = height * 0.72;
  for (let i = 0; i < count; i++) {
    const noise =
      Math.sin(i * 0.4 + seed) * 18 +
      Math.sin(i * 0.13 + seed * 0.7) * 32 +
      Math.sin(i * 1.1 + seed * 2.3) * 6;
    y = Math.max(
      height * 0.15,
      Math.min(height * 0.85, y - 2.2 + noise * 0.18),
    );
    points.push({ x: (i / (count - 1)) * width, y });
  }
  return points;
}

function pointsToFill(points: { x: number; y: number }[], height: number) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cpx} ${points[i - 1].y} ${cpx} ${points[i].y} ${points[i].x} ${points[i].y}`;
  }
  d += ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
  return d;
}

function pointsToLine(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cpx} ${points[i - 1].y} ${cpx} ${points[i].y} ${points[i].x} ${points[i].y}`;
  }
  return d;
}

// ── Animated Number ───────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [value]);

  const int = Math.floor(display).toLocaleString("en-US");
  const dec = (display % 1).toFixed(2).slice(1);

  return (
    <span className="tabular-nums">
      <span className="text-[52px] sm:text-[64px] font-black leading-none tracking-tight text-white">
        ${int}
      </span>
      <span className="text-[26px] font-bold text-white/60 align-bottom leading-none">
        {dec}
      </span>
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

// Fuchsia-400 = #e879f9
const DEFAULT_ACCENT = "#e879f9";

export default function HoldingsCard({
  title = "Holdings",
  baseValue = 10416.13,
  fluctuation = 320,
  speed = 0.002,
  badge = "+13%",
  period = "30 days",
  accentColor = DEFAULT_ACCENT,
  avatars = ["🦊", "🐙", "🌍", "🐱"],
  reactions = ["🤍", "🤍", "🤍"],
}: HoldingsCardProps) {
  const W = 600;
  const H = 220;
  const POINT_COUNT = 80;
  const DOT_FRAC = 0.78;

  const [points, setPoints] = useState(() =>
    generatePoints(POINT_COUNT, W, H, 0),
  );
  const [currentValue, setCurrentValue] = useState(baseValue);
  const [dotY, setDotY] = useState(H * 0.4);
  const [dotValue, setDotValue] = useState(977.45);

  const { r, g, b } = hexToRgb(accentColor);

  useAnimationFrame((time) => {
    const t = time * speed;
    const newPoints = generatePoints(POINT_COUNT, W, H, t);
    setPoints(newPoints);

    const lastY = newPoints[newPoints.length - 1].y;
    const normalised = 1 - lastY / H;
    setCurrentValue(baseValue + normalised * fluctuation - fluctuation * 0.3);

    const midIdx = Math.floor(POINT_COUNT * DOT_FRAC);
    setDotY(newPoints[midIdx].y);
    const midNorm = 1 - newPoints[midIdx].y / H;
    setDotValue(900 + midNorm * 160);
  });

  const fillPath = pointsToFill(points, H);
  const linePath = pointsToLine(points);
  const dotX = DOT_FRAC * W;

  // Unique SVG gradient/filter IDs per color to avoid conflicts if multiple cards render
  const uid = accentColor.replace("#", "");

  return (
    <div
      className="relative overflow-hidden rounded-3xl select-none"
      style={{
        background: `radial-gradient(ellipse at 60% 0%, rgba(${r},${g},${b},0.07) 0%, #050505 60%)`,
        width: "min(600px, 100%)",
        boxShadow: `0 0 80px rgba(${r},${g},${b},0.12), 0 32px 64px rgba(0,0,0,0.8)`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Top content ── */}
      <div className="px-8 pt-8 pb-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[15px] font-medium text-white/40 tracking-wide">
            {title}
          </span>
          <div className="flex items-center -space-x-2">
            {avatars.map((a, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[16px]"
                style={{ background: "#1a1a1a", zIndex: avatars.length - i }}
              >
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Animated value */}
        <div className="mb-4">
          <AnimatedNumber value={currentValue} />
        </div>

        {/* Badge + period */}
        <div className="flex items-center gap-3">
          <motion.span
            className="px-3 py-1 rounded-full text-[13px] font-bold text-white"
            style={{ background: accentColor }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {badge}
          </motion.span>
          <span className="text-[13px] text-white/35 font-medium">
            {period}
          </span>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="relative" style={{ height: H }}>
        <svg
          width="100%"
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.30" />
              <stop offset="60%" stopColor={accentColor} stopOpacity="0.07" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>

            <filter
              id={`glow-${uid}`}
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id={`dotGlow-${uid}`}
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id={`clip-${uid}`}>
              <rect x="0" y="0" width={W} height={H} />
            </clipPath>
          </defs>

          <g clipPath={`url(#clip-${uid})`}>
            {/* Fill */}
            <path d={fillPath} fill={`url(#fill-${uid})`} />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke={accentColor}
              strokeWidth="2.2"
              filter={`url(#glow-${uid})`}
            />

            {/* Dashed reference line */}
            <line
              x1={0}
              y1={dotY}
              x2={W}
              y2={dotY}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r="5"
              fill="#facc15"
              filter={`url(#dotGlow-${uid})`}
            />
            <circle
              cx={dotX}
              cy={dotY}
              r="9"
              fill="none"
              stroke="#facc15"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          </g>
        </svg>

        {/* Floating reactions */}
        {reactions.map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: dotX - 10 + i * 20,
              top: dotY - 58 - i * 18,
              fontSize: 18 + i * 4,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.55 + i * 0.15, 0.95, 0.55 + i * 0.15],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6 + i * 0.35,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* Tooltip */}
        <motion.div
          className="absolute rounded-lg px-3 py-1.5 text-[13px] font-bold text-white pointer-events-none"
          style={{
            left: dotX + 16,
            top: dotY - 16,
            background: accentColor,
            boxShadow: `0 4px 16px rgba(${r},${g},${b},0.5)`,
            whiteSpace: "nowrap",
          }}
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          $
          {dotValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </motion.div>
      </div>

      {/* ── Tick marks ── */}
      <div className="flex justify-between px-8 pb-5 pt-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-px h-1.5 bg-white/15 rounded-full" />
        ))}
      </div>
    </div>
  );
}
