"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
// Dynamic Island states
const DI_IDLE = "idle";
const DI_LOADING = "loading";
const DI_EXPANDED = "expanded";

function DynamicIsland({ state }) {
  const isExpanded = state === DI_EXPANDED;
  const isLoading = state === DI_LOADING;

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        borderRadius: 16,
        width: isExpanded ? 110 : 48,
        height: isExpanded ? 22 : 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        overflow: "hidden",
        transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.3s",
        zIndex: 20,
        padding: "0 8px",
      }}
    >
      {/* Camera dots */}
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isLoading ? "#7c6af7" : "#333",
          flexShrink: 0,
          transition: "background 0.3s",
          animation: isLoading
            ? "pulse 0.8s ease-in-out infinite alternate"
            : "none",
        }}
      />
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isLoading ? "#7c6af7" : "#333",
          flexShrink: 0,
          transition: "background 0.3s",
          animation: isLoading
            ? "pulse 0.8s ease-in-out 0.2s infinite alternate"
            : "none",
        }}
      />

      {/* Expanded content */}
      {isExpanded && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            overflow: "hidden",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <span style={{ fontSize: 8, color: "#fff", whiteSpace: "nowrap" }}>
            AirPods Pro
          </span>
          <span style={{ fontSize: 7, color: "#4ade80" }}>●●●</span>
        </div>
      )}

      <style>{`
        @keyframes pulse { from { opacity: 0.4; } to { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// Side buttons
function SideButton({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        background: "#2c2c2e",
        borderRadius: 2,
        ...style,
      }}
    />
  );
}

// Custom screen content — replace with any React node via the `content` prop
function DefaultScreenContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          background:
            "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-instagram"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </div>
      <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: 0 }}>
        Social media
      </p>
      <p style={{ color: "#fff", fontSize: 14, margin: 0 }}>#share</p>
    </div>
  );
}

/**
 * IPhoneIllustration
 *
 * Props:
 *   content  — React node rendered inside the screen (defaults to a demo UI)
 */
export default function IPhoneIllustration({ content, forceHovered = false }) {
  const [hovered, setHovered] = useState(false);
  const [diState, setDiState] = useState(DI_IDLE);
  const timers = useRef([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function schedule(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }

  const startAnimation = useCallback(() => {
    clearTimers();
    setDiState(DI_IDLE);
    schedule(() => setDiState(DI_LOADING), 200);
    schedule(() => setDiState(DI_EXPANDED), 700);
  }, []);

  function handleEnter() {
    setHovered(true);
    startAnimation();
  }

  function handleLeave() {
    setHovered(false);
    clearTimers();
    setDiState(DI_IDLE);
  }

  useEffect(() => {
    if (forceHovered) {
      startAnimation();
    } else if (!hovered) {
      clearTimers();
      setDiState(DI_IDLE);
    }

    return () => clearTimers();
  }, [forceHovered, hovered, startAnimation]);

  const isAnimated = hovered || forceHovered;

  return (
    <div
      className="m-auto"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        width: 140,
        height: 280,
        userSelect: "none",
      }}
    >
      {/* Body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#1c1c1e",
          borderRadius: 34,
          border: "1.5px solid #3a3a3c",
          overflow: "hidden",
        }}
      >
        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 5,
            right: 5,
            bottom: 8,
            background: "#000",
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          {/* Screen content */}
          <div
            style={{
              width: "100%",
              height: "100%",
              opacity: isAnimated ? 1 : 0,
              filter: isAnimated ? "none" : "blur(4px)",
              transition: "opacity 0.5s, filter 0.5s",
            }}
          >
            {content ?? <DefaultScreenContent />}
          </div>

          {/* Dynamic Island */}
          <DynamicIsland state={diState} />

          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: 3,
              background: "#555",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
      {/* Side buttons */}
      <SideButton
        style={{ left: -3, top: 40, width: 2.5, height: 14, borderRadius: 3 }}
      />{" "}
      {/* Action */}
      <SideButton style={{ left: -3, top: 60, width: 2.5, height: 22 }} />{" "}
      {/* Vol up */}
      <SideButton style={{ left: -3, top: 88, width: 2.5, height: 22 }} />{" "}
      {/* Vol down */}
      <SideButton style={{ right: -3, top: 72, width: 2.5, height: 30 }} />{" "}
      {/* Power */}
    </div>
  );
}
