"use client";

import { useState, useEffect, useRef } from "react";

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
          width: 40,
          height: 40,
          background: "#7c6af7",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p style={{ color: "#fff", fontSize: 10, fontWeight: 500, margin: 0 }}>
        Dashboard
      </p>
      <p style={{ color: "#6b7280", fontSize: 9, margin: 0 }}>
        v2.4.1 · Production
      </p>
    </div>
  );
}

/**
 * IPhoneIllustration
 *
 * Props:
 *   content  — React node rendered inside the screen (defaults to a demo UI)
 */
export default function IPhoneIllustration({ content }) {
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

  function handleEnter() {
    setHovered(true);
    setDiState(DI_IDLE);
    schedule(() => setDiState(DI_LOADING), 200);
    schedule(() => setDiState(DI_EXPANDED), 700);
  }

  function handleLeave() {
    setHovered(false);
    clearTimers();
    setDiState(DI_IDLE);
  }

  useEffect(() => () => clearTimers(), []);

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
              opacity: hovered ? 1 : 0,
              filter: hovered ? "none" : "blur(4px)",
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
