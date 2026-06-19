"use client";

import { useState } from "react";

// Default icons — replace via the `icons` prop
const DEFAULT_ICONS = [
  {
    name: "Perplexity",
    rotation: -4,
    yOffset: -48,
    delay: "0s",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" fill="#000" />
        <path
          d="M11 5.5a3.5 3.5 0 0 0-6 2.5 3.5 3.5 0 0 0 6 2.5"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="9.5" cy="5.5" r="0.5" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    rotation: 1,
    yOffset: -56,
    delay: "0.07s",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#000" />
        <path
          d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    rotation: 3,
    yOffset: -44,
    delay: "0.14s",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect width="16" height="16" rx="4" fill="#cc785c" />
        <path d="M4 11l4-6 4 6H4z" fill="#fff" opacity="0.9" />
      </svg>
    ),
  },
];

// Screen content shown when lid is open & hovered
function ScreenContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* traffic lights */}
      <div
        style={{
          height: 20,
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 4,
          flexShrink: 0,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 6, height: 6, borderRadius: "50%", background: c }}
          />
        ))}
      </div>
      {/* pricing grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
          padding: 6,
        }}
      >
        <div
          style={{ background: "#222", borderRadius: 3, padding: "4px 6px" }}
        >
          <div style={{ fontSize: 7, color: "#888", marginBottom: 3 }}>
            Monthly
          </div>
          <div style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>
            $49
          </div>
          <div style={{ fontSize: 6, color: "#555", marginTop: 2 }}>
            per seat
          </div>
        </div>
        <div
          style={{ background: "#7c6af7", borderRadius: 3, padding: "4px 6px" }}
        >
          <div style={{ fontSize: 7, color: "#c8c4ff", marginBottom: 3 }}>
            Annual
          </div>
          <div style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>
            $39
          </div>
          <div style={{ fontSize: 6, color: "#c8c4ff", marginTop: 2 }}>
            per seat
          </div>
        </div>
        <div
          style={{
            background: "#222",
            borderRadius: 3,
            padding: "4px 6px",
            gridColumn: "1 / -1",
          }}
        >
          <div
            style={{
              fontSize: 6,
              color: "#555",
              marginBottom: 2,
              letterSpacing: "0.05em",
            }}
          >
            ENTERPRISE
          </div>
          <div style={{ fontSize: 8, color: "#aaa" }}>Custom pricing</div>
        </div>
      </div>
    </div>
  );
}

/**
 * MacBookWithIcons
 *
 * Idle  : lid half-open (rotateX(-55deg)), screen is black
 * Hover : lid fully opens (rotateX(0deg)), screen turns on (content fades in)
 *         floating icon cards fly up
 *
 * Props:
 *   icons    — array of { name, icon (ReactNode), rotation, yOffset, delay }
 *   content  — ReactNode rendered inside the screen (defaults to pricing UI)
 */
export default function MacBookWithIcons({ icons = DEFAULT_ICONS, content, forceHovered = false }) {
  const [hovered, setHovered] = useState(false);

  // Lid angle: half-open = -55deg perspective tilt, open = 0 (flat)
  const isAnimated = hovered || forceHovered;

  const lidTransform = isAnimated
    ? "perspective(600px) rotateX(0deg)"
    : "perspective(600px) rotateX(-55deg)";

  return (
    <div
      className="m-auto  flex flex-col  items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 320,
        userSelect: "none",
        // extra bottom padding so the half-open lid doesn't clip
        paddingBottom: 8,
      }}
    >
      {/* Floating icon cards */}
      <div
        style={{
          position: "absolute",
          top: -16,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 10,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {icons.map((icon) => (
          <div
            key={icon.name}
            style={{
              background: "var(--color-background-primary, #fff)",
              border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
              borderRadius: 10,
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10,
              fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated
                ? `translateY(${icon.yOffset}px) rotate(${icon.rotation}deg)`
                : "translateY(20px) rotate(0deg)",
              transition: `opacity 0.4s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${icon.delay}`,
            }}
          >
            {icon.icon}
            <span>{icon.name}</span>
          </div>
        ))}
      </div>

      {/* Lid wrapper — perspective + tilt */}
      <div
        className="w-full"
        style={{
          position: "relative",
          transformOrigin: "bottom center",
          transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
          transform: lidTransform,
        }}
      >
        {/* Lid shell */}
        <div
          style={{
            background: "#e8e8e8",
            borderRadius: "10px 10px 2px 2px",
            border: "1.5px solid #ccc",
            padding: 6,
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: 8,
              background: "#e8e8e8",
              borderRadius: "0 0 6px 6px",
              zIndex: 5,
            }}
          />

          {/* Screen bezel */}
          <div
            style={{
              background: "#000",
              borderRadius: 6,
              overflow: "hidden",
              height: 160,
              position: "relative",
            }}
          >
            {/* Black screen when closed, content when open */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: isAnimated ? 1 : 0,
                transition: "opacity 0.45s ease 0.1s",
              }}
            >
              {content ?? <ScreenContent />}
            </div>
          </div>
        </div>
      </div>

      {/* Base / trackpad */}
      <div
        style={{
          background: "linear-gradient(180deg, #d0d0d0 0%, #bebebe 100%)",
          height: 12,
          borderRadius: "0 0 4px 4px",
          border: "1.5px solid #bbb",
          borderTop: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 400,
        }}
      >
        <div
          style={{ width: 60, height: 3, background: "#aaa", borderRadius: 2 }}
        />
      </div>
    </div>
  );
}
