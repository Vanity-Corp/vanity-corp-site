"use client";

import { useState, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 12, stroke = "currentColor", sw = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const PlayIcon = () => <Icon d="M5 3l14 9-14 9V3z" />;
const PauseIcon = () => (
  <>
    <rect
      x="6"
      y="4"
      width="4"
      height="16"
      rx="1"
      fill="currentColor"
      stroke="none"
    />
    <rect
      x="14"
      y="4"
      width="4"
      height="16"
      rx="1"
      fill="currentColor"
      stroke="none"
    ></rect>
  </>
);
const SkipBackIcon = () => (
  <>
    <polygon points="19 20 9 12 19 4 19 20" fill="currentColor" stroke="none" />
    <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
  </>
);

// ─── VU Meter ─────────────────────────────────────────────────────────────────
function VUMeter({ active }) {
  const [levels, setLevels] = useState(() =>
    Array.from({ length: 50 }, () => 0.15),
  );
  useEffect(() => {
    if (!active) {
      setLevels(Array.from({ length: 50 }, () => 0.1));
      return;
    }
    const id = setInterval(() => {
      setLevels((prev) =>
        prev.map((_, i) => {
          const base = i < 6 ? 0.8 : i < 13 ? 0.58 : 0.32;
          return Math.max(
            0.04,
            Math.min(1, base + (Math.random() - 0.42) * 0.5),
          );
        }),
      );
    }, 75);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex items-end gap-[1.5px] h-20">
      {levels.map((lvl, i) => {
        const col = lvl > 0.82 ? "#ef4444" : lvl > 0.62 ? "#f59e0b" : "#22c55e";
        return (
          <div
            key={i}
            className="w-[4px] rounded-[1px]"
            style={{
              height: `${lvl * 100}%`,
              background: col,
              transition: "height 0.07s ease, background 0.1s",
              opacity: active ? 1 : 0.2,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Clapperboard ─────────────────────────────────────────────────────────────
function Clapperboard({ active }) {
  return (
    <div className="relative flex flex-col w-[60px] shrink-0">
      {/* arm */}
      <div
        className="h-[18px] rounded-t overflow-hidden border border-[#2a2d3e] origin-left z-10"
        style={{
          transform: active
            ? "rotate(-32deg) translateY(-2px)"
            : "rotate(0deg)",
          transition: "transform 0.14s cubic-bezier(0.34,1.8,0.64,1)",
        }}
      >
        <div className="flex h-full">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{ background: i % 2 === 0 ? "#e5e5e5" : "#111318" }}
            />
          ))}
        </div>
      </div>
      {/* body */}
      <div className="bg-[#111318] border border-t-0 border-[#2a2d3e] rounded-b px-1.5 py-1">
        <div className="font-mono space-y-[1px]">
          {[
            ["SCN", "04"],
            ["TAKE", "02"],
            ["ROLL", "A"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[6.5px]">
              <span className="text-[#4b5563]">{k}</span>
              <span className="text-[#a78bfa]">{v}</span>
            </div>
          ))}
          <div className="border-t border-[#1e2130] mt-0.5 pt-0.5">
            <div className="text-[5.5px] text-[#374151] font-mono truncate">
              DIR: A.Chen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Monitor ──────────────────────────────────────────────────────────────────
function Monitor({ active }) {
  return (
    <div
      className="relative rounded overflow-hidden border border-[#1e2130]"
      style={{ aspectRatio: "16/9", flex: 1 }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background:
            "linear-gradient(160deg,#0a0a14 0%,#170a26 45%,#091620 100%)",
          filter: active ? "contrast(1.12) saturate(0.9)" : "brightness(0.25)",
        }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)",
        }}
      />
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
        style={{ opacity: active ? 1 : 0 }}
      >
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(167,139,250,0.14) 0%,transparent 72%)",
          }}
        />
      </div>
      {/* Subject silhouette */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0 }}
      >
        <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
          <circle cx="13" cy="7" r="5" fill="#a78bfa" opacity="0.65" />
          <path
            d="M5 34c0-8.5 3.5-13 8-13s8 4.5 8 13"
            fill="#7c3aed"
            opacity="0.45"
          />
        </svg>
      </div>
      {/* Lower-third text */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-500 px-2 pb-1.5"
        style={{ opacity: active ? 1 : 0 }}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 inline-block">
          <p className="text-[7px] text-white/90 leading-tight font-light tracking-wide">
            Turpis suspendisse sagittis viverra eros, enim enim
          </p>
        </div>
      </div>
      {/* Safe-area */}
      <div
        className="absolute inset-[7%] border border-dashed pointer-events-none transition-opacity duration-300"
        style={{ borderColor: "#ffffff14", opacity: active ? 1 : 0 }}
      />
      {/* HUD overlays */}
      <div
        className="absolute top-1.5 left-2 font-mono text-[6.5px] text-white/40 transition-opacity"
        style={{ opacity: active ? 1 : 0 }}
      >
        A-CAM · 4K · 23.976fps
      </div>
      <div
        className="absolute bottom-1.5 right-2 font-mono text-[6.5px] text-white/40 transition-opacity"
        style={{ opacity: active ? 1 : 0 }}
      >
        01:04:23:12
      </div>
      {/* Cursor label (like reference image) */}
      <div
        className="absolute transition-all duration-500"
        style={{
          top: "28%",
          left: "30%",
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s 0.3s, transform 0.4s 0.3s",
        }}
      >
        <div className="bg-violet-600 text-white text-[7px] font-medium px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap">
          Orlando Diggs
        </div>
      </div>
    </div>
  );
}

// ─── Color grades ─────────────────────────────────────────────────────────────
const GRADES = [
  { label: "RAW", filter: "none" },
  { label: "LUT-1", filter: "sepia(0.3) contrast(1.1)" },
  { label: "CINEMA", filter: "contrast(1.15) saturate(0.85) sepia(0.12)" },
  { label: "NEON", filter: "hue-rotate(20deg) saturate(1.5) brightness(0.9)" },
];

function ColorGrades({ active }) {
  const [sel, setSel] = useState(2);
  return (
    <div className="flex items-center gap-1.5">
      {GRADES.map((g, i) => (
        <button
          key={i}
          onClick={() => setSel(i)}
          className="flex flex-col items-center gap-[3px] cursor-pointer"
        >
          <div
            className="w-10 h-[22px] rounded overflow-hidden border transition-all duration-200"
            style={{
              borderColor: sel === i ? "#a78bfa" : "#1e2130",
              boxShadow: sel === i ? "0 0 8px #a78bfa44" : "none",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(135deg,#1a1a2e 0%,#3b1f5e 50%,#0f3460 100%)",
                filter: g.filter,
                opacity: active ? 1 : 0.3,
                transition: "opacity 0.4s",
              }}
            />
          </div>
          <span
            className="text-[6.5px] font-mono transition-colors duration-200"
            style={{ color: sel === i ? "#a78bfa" : "#374151" }}
          >
            {g.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const CLIPS = [
  { start: 0, w: 18, color: "#6366f1", label: "S…" },
  { start: 20, w: 24, color: "#22d3ee", label: "Shape" },
  { start: 0, w: 22, color: "#f97316", label: "Microsoft Surface for…" },
  { start: 24, w: 14, color: "#f97316", label: "*Some a…" },
  { start: 0, w: 75, color: "#8b5cf6", label: "Subtitles" },
];
const AUDIO_CLIPS = [
  { start: 0, w: 72, color: "#22c55e", label: "Perfect Wave.mp3" },
  { start: 74, w: 24, color: "#22c55e", label: "Ambient.mp3" },
];
const TRACKS = [
  { label: "Track", clips: [CLIPS[0], CLIPS[1]], rowH: 26 },
  { label: "Track", clips: [CLIPS[2], CLIPS[3]], rowH: 26 },
  { label: "Track", clips: [CLIPS[4]], rowH: 26 },
  { label: "Track", clips: [], rowH: 22, filmstrip: true },
  { label: "Track", clips: AUDIO_CLIPS, rowH: 22, audio: true },
];

function Timeline({ active, head }) {
  // Ruler
  const ticks = Array.from({ length: 13 }, (_, i) => i * 5);

  return (
    <div className="flex flex-col gap-[2px]">
      {/* Ruler */}
      <div className="relative flex items-end h-5 border-b border-[#1a1d27]">
        <div className="w-14 shrink-0" />
        <div className="flex-1 relative flex">
          {ticks.map((t) => (
            <div key={t} className="flex-1 flex flex-col items-start">
              <div className="w-px h-2 bg-[#2a2d3e]" />
              <span className="text-[6.5px] text-[#374151] font-mono leading-none">
                {t === 0 ? "0s" : `${t}s`}
              </span>
            </div>
          ))}
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-px z-20 pointer-events-none"
            style={{
              left: `${head}%`,
              background: "#facc15",
              boxShadow: "0 0 6px #facc1588",
              transition: "left 0.05s linear",
            }}
          >
            <div
              className="w-3 h-3 -translate-x-[5px] -translate-y-[1px]"
              style={{
                background: "#facc15",
                clipPath: "polygon(50% 100%,0 0,100% 0)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tracks */}
      {TRACKS.map((track, ti) => (
        <div
          key={ti}
          className="flex items-center"
          style={{ height: track.rowH }}
        >
          {/* Label */}
          <div className="w-14 shrink-0 flex items-center gap-1 px-1">
            <div className="w-[3px] h-[3px] rounded-full bg-[#2a2d3e]" />
            <div className="w-[3px] h-[3px] rounded-full bg-[#2a2d3e]" />
            <span className="text-[7px] text-[#374151] font-mono">Track</span>
          </div>
          {/* Clip area */}
          <div
            className="flex-1 relative bg-[#0a0c12] border-y border-[#111318] overflow-hidden"
            style={{ height: track.rowH }}
          >
            {track.filmstrip && (
              <div className="absolute inset-0 flex items-center overflow-hidden opacity-60">
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className="shrink-0 h-full border-r border-[#1a1d27]"
                    style={{
                      width: "3.125%",
                      background: `hsl(${240 + i * 4},30%,${10 + (i % 3) * 4}%)`,
                    }}
                  />
                ))}
              </div>
            )}
            {track.clips.map((clip, ci) => (
              <div
                key={ci}
                className="absolute top-[2px] bottom-[2px] rounded flex items-center overflow-hidden"
                style={{
                  left: `${clip.start}%`,
                  width: `${clip.w}%`,
                  background: clip.color + (track.audio ? "28" : "33"),
                  border: `1px solid ${clip.color}55`,
                }}
              >
                {track.audio ? (
                  <div className="flex items-center h-full gap-[1px] px-1 overflow-hidden w-full">
                    <span
                      className="text-[6px] font-mono shrink-0 mr-0.5"
                      style={{ color: clip.color }}
                    >
                      {clip.label}
                    </span>
                    {Array.from({ length: 40 }, (_, j) => (
                      <div
                        key={j}
                        className="shrink-0 w-[1.5px] rounded-full"
                        style={{
                          height: `${25 + Math.sin(j * 1.1) * 38 + Math.cos(j * 0.8) * 20}%`,
                          background: clip.color,
                          opacity: 0.65,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span
                    className="text-[7px] font-mono px-1.5 truncate"
                    style={{ color: clip.color }}
                  >
                    {clip.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Typography panel (left sidebar, like reference) ─────────────────────────
function TypographyPanel({ active }) {
  return (
    <div className="flex flex-col gap-2 w-[110px] shrink-0">
      <div className="text-[8px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-0.5">
        Typography
      </div>
      {[
        { label: "Text", value: "Graphik" },
        { label: "Weight", value: "Regular" },
        { label: "Color", value: "#E2CF23", isColor: true },
      ].map(({ label, value, isColor }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-[7px] text-[#4b5563]">{label}</span>
          <div className="flex items-center gap-1 bg-[#111318] border border-[#1e2130] rounded px-1.5 py-0.5">
            {isColor && (
              <div
                className="w-2.5 h-2.5 rounded-[2px] border border-[#2a2d3e]"
                style={{ background: "#E2CF23" }}
              />
            )}
            <span
              className="text-[7px] font-mono"
              style={{
                color: active ? "#d1d5db" : "#374151",
                transition: "color 0.3s",
              }}
            >
              {value}
            </span>
          </div>
        </div>
      ))}
      {/* Size / Spacing / Height */}
      <div className="grid grid-cols-3 gap-1 mt-0.5">
        {[
          ["12", "Size"],
          ["0", "Spacing"],
          ["1.00", "Height"],
        ].map(([val, lbl]) => (
          <div key={lbl} className="flex flex-col items-center gap-0.5">
            <div className="w-full bg-[#111318] border border-[#1e2130] rounded px-1 py-0.5 text-center">
              <span
                className="text-[7px] font-mono"
                style={{
                  color: active ? "#d1d5db" : "#374151",
                  transition: "color 0.3s",
                }}
              >
                {val}
              </span>
            </div>
            <span className="text-[5.5px] text-[#374151]">{lbl}</span>
          </div>
        ))}
      </div>
      {/* Align buttons */}
      <div className="flex items-center gap-0.5 mt-0.5">
        {["left", "center", "right", "justify"].map((a) => (
          <div
            key={a}
            className="flex-1 h-5 bg-[#111318] border border-[#1e2130] rounded flex items-center justify-center"
          >
            <div
              className={`flex flex-col gap-[2px] items-${a === "left" ? "start" : a === "right" ? "end" : "center"} w-3`}
            >
              <div className="h-[1.5px] bg-[#374151] w-full rounded" />
              <div
                className="h-[1.5px] bg-[#374151] rounded"
                style={{ width: a === "justify" ? "100%" : "70%" }}
              />
              <div className="h-[1.5px] bg-[#374151] w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AVProduction() {
  const [hovered, setHovered] = useState(false);
  const [rec, setRec] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [head, setHead] = useState(18); // percent 0–100
  const rafRef = useRef(null);
  const t0Ref = useRef(null);
  const timers = useRef([]);

  function clearAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  // REC kicks in 300ms after hover
  useEffect(() => {
    if (hovered) {
      timers.current.push(setTimeout(() => setRec(true), 300));
      timers.current.push(setTimeout(() => setPlaying(true), 400));
    } else {
      clearAll();
      setRec(false);
      setPlaying(false);
      setHead(18);
    }
    return clearAll;
  }, [hovered]);

  // Animate playhead
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    t0Ref.current = performance.now() - head * 70;
    const tick = (now) => {
      setHead(((now - t0Ref.current) / 7000) % 100);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const timecode = (() => {
    const total = 73; // seconds
    const cur = Math.round((head / 100) * total);
    const fmt = (s) =>
      `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    return `${fmt(cur)} / ${fmt(total)}`;
  })();

  return (
    <div
      className="relative select-none m-auto mt-60"
      style={{ width: 500 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="bg-[#0e1018] border border-[#1e2130] rounded-2xl overflow-hidden"
        style={{
          boxShadow: hovered
            ? "0 28px 56px rgba(0,0,0,0.65), 0 0 0 1px #a78bfa22"
            : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s",
        }}
      >
        {/* ── Title bar ── */}
        <div className="flex items-center justify-between h-9 px-3 bg-[#0a0c12] border-b border-[#1a1d27]">
          <div className="flex items-center gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: c }}
              />
            ))}
            <span className="text-[9px] text-[#4b5563] font-mono ml-2">
              flush.io/video-editor
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              style={{
                animation: rec ? "recPulse 1s ease-in-out infinite" : "none",
                opacity: rec ? 1 : 0.2,
              }}
            />
            <span
              className="text-[8px] font-bold tracking-widest transition-colors duration-300"
              style={{ color: rec ? "#ef4444" : "#374151" }}
            >
              {rec ? "REC" : "STBY"}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex gap-0 divide-x divide-[#1a1d27]">
          {/* Left panel */}
          <div className="w-fit shrink-0 p-3 flex flex-col gap-3 bg-[#0a0c12]">
            <TypographyPanel active={hovered} />
            <div className="border-t border-[#1a1d27] pt-3">
              <div className="text-[8px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">
                Color Grade
              </div>
              <ColorGrades active={hovered} />
            </div>
          </div>

          {/* Center: monitor + clapperboard */}
          <div className="flex-1 flex flex-col gap-0">
            <div className="flex items-center gap-2.5 p-3">
              <Monitor active={hovered} />
              <Clapperboard active={hovered} />
            </div>

            {/* Audio row */}
            <div className="px-3 pb-2.5 border-t border-[#1a1d27] pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] text-[#4b5563] font-mono uppercase tracking-widest">
                  Audio · CH 1–2 · 48kHz
                </span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: hovered ? "#22c55e" : "#374151",
                      transition: "background 0.3s",
                    }}
                  />
                  <span
                    className="text-[7px] font-mono"
                    style={{
                      color: hovered ? "#22c55e" : "#374151",
                      transition: "color 0.3s",
                    }}
                  >
                    {hovered ? "LIVE" : "MUTED"}
                  </span>
                </div>
              </div>
              <VUMeter active={hovered} />
            </div>
          </div>
        </div>

        {/* ── Transport bar ── */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0a0c12] border-t border-[#1a1d27]">
          <div className="flex items-center gap-2 text-[#4b5563]">
            <button className="hover:text-[#9ca3af] transition-colors">
              <SkipBackIcon />
            </button>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center border border-[#2a2d3e] hover:border-[#4b5563] transition-colors"
              style={{ color: playing ? "#f5f5f5" : "#6b7280" }}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
          <span className="text-[9px] font-mono text-[#6b7280] tabular-nums">
            {timecode}
          </span>
          <div className="flex items-center gap-2 text-[#4b5563] text-[9px] font-mono">
            <span className="text-[#374151]">1x</span>
            <span className="text-[#2a2d3e]">|</span>
            <span
              style={{
                color: hovered ? "#9ca3af" : "#374151",
                transition: "color 0.3s",
              }}
            >
              80%
            </span>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="border-t border-[#1a1d27] px-3 pt-2 pb-3 bg-[#0a0c12]">
          <Timeline active={hovered} head={head} />
        </div>
      </div>

      <style>{`
        @keyframes recPulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>
    </div>
  );
}
