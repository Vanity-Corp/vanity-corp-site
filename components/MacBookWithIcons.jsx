"use client";

import { useState } from "react";

// Default floating icons — replace via the `icons` prop
const DEFAULT_ICONS = [
  {
    id: "camera",
    rotation: -4,
    yOffset: -48,
    delay: "0s",
    bg: "linear-gradient(135deg, #f97316, #ec4899)",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
    ),
  },
  {
    id: "megaphone",
    rotation: 2,
    yOffset: -57,
    delay: "0.07s",
    bg: "linear-gradient(135deg, #8b5cf6, #ec4899 55%, #f59e0b)",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11l18-7v16z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
  {
    id: "spark",
    rotation: 4,
    yOffset: -45,
    delay: "0.14s",
    bg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4z" />
      </svg>
    ),
  },
];

// Surface shown when the canvas stands upright — pure shapes, no copy
function CanvasContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fafaf8",
        display: "flex",
        flexDirection: "column",
        padding: 7,
        gap: 5,
      }}
    >
      <div style={{ display: "flex", gap: 5, flex: 1 }}>
        <div
          style={{
            flex: 1.3,
            borderRadius: 6,
            background: "linear-gradient(135deg,#fcd34d,#f97316,#ec4899)",
          }}
        />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}
        >
          <div style={{ flex: 1, borderRadius: 6, background: "#161616" }} />
          <div
            style={{
              flex: 1,
              borderRadius: 6,
              background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, height: 13 }}>
        {["#161616", "#f97316", "#ec4899", "#8b5cf6", "#06b6d4", "#fcd34d"].map(
          (c) => (
            <div key={c} style={{ flex: 1, borderRadius: 3, background: c }} />
          ),
        )}
      </div>
    </div>
  );
}

/**
 * CreativeCanvasWithIcons
 *
 * Idle  : the canvas leans back on the easel (rotateX(-55deg)), surface is dark/blank
 * Hover : the canvas tilts upright (rotateX(0deg)), the artwork lights up (fade in)
 *         floating icon chips fly up around it
 *
 * Props:
 *   icons        — array of { id, icon (ReactNode), bg, rotation, yOffset, delay }
 *   content      — ReactNode rendered on the canvas (defaults to CanvasContent)
 *   forceHovered — bool, drive the animation externally instead of real hover
 */
export default function CreativeCanvasWithIcons({
  icons = DEFAULT_ICONS,
  content,
  forceHovered = false,
}) {
  const [hovered, setHovered] = useState(false);
  const isAnimated = hovered || forceHovered;

  const frameTransform = isAnimated
    ? "perspective(600px) rotateX(0deg)"
    : "perspective(600px) rotateX(-55deg)";

  return (
    <div
      className="m-auto flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 320,
        userSelect: "none",
        paddingBottom: 8,
      }}
    >
      {/* Floating icon chips */}
      <div
        style={{
          position: "absolute",
          top: -14,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {icons.map((icon) => (
          <div
            key={icon.id}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: icon.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 14px rgba(0,0,0,0.16)",
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated
                ? `translateY(${icon.yOffset}px) rotate(${icon.rotation}deg)`
                : "translateY(20px) rotate(0deg)",
              transition: `opacity 0.4s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${icon.delay}`,
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {/* Frame wrapper — perspective + tilt (the easel motion) */}
      <div
        className="w-full"
        style={{
          position: "relative",
          transformOrigin: "bottom center",
          transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
          transform: frameTransform,
        }}
      >
        {/* Wooden frame shell */}
        <div
          style={{
            position: "relative",
            background: "#e7ddc9",
            borderRadius: "8px 8px 2px 2px",
            border: "1.5px solid #cfc1a3",
            padding: 7,
          }}
        >
          {/* Easel clip / hinge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "7px solid #cfc1a3",
              zIndex: 5,
            }}
          />

          {/* Canvas surface */}
          <div
            style={{
              background: "#161616",
              borderRadius: 5,
              overflow: "hidden",
              height: 160,
              position: "relative",
            }}
          >
            {/* Dark/blank surface when leaning back, artwork when upright */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: isAnimated ? 1 : 0,
                transition: "opacity 0.45s ease 0.1s",
              }}
            >
              {content ?? <CanvasContent />}
            </div>
          </div>
        </div>
      </div>

      {/* Easel tray / base */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #e7ddc9 0%, #d8cbac 100%)",
          height: 12,
          borderRadius: "0 0 4px 4px",
          border: "1.5px solid #cfc1a3",
          borderTop: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: 360,
        }}
      >
        {["#f97316", "#8b5cf6", "#06b6d4"].map((c) => (
          <div
            key={c}
            style={{ width: 6, height: 6, borderRadius: "50%", background: c }}
          />
        ))}
      </div>
    </div>
  );
}
