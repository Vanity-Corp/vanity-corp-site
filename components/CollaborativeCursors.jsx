"use client";

import { useEffect, useRef, useState } from "react";

// UI "screen" rows — simulated app sidebar + content blocks
const UI_ROWS = [
  // sidebar items
  { type: "sidebar", items: ["#6366f1", "#8b5cf6", "#ec4899"] },
  // content blocks: [width%, color, opacity]
  {
    type: "block",
    cols: [
      { w: 55, color: "#4b5563", op: 0.8 },
      { w: 30, color: "#374151", op: 0.5 },
    ],
  },
  {
    type: "block",
    cols: [
      { w: 70, color: "#4b5563", op: 0.9 },
      { w: 20, color: "#374151", op: 0.4 },
    ],
  },
  { type: "block", cols: [{ w: 40, color: "#6366f1", op: 0.6 }] },
  {
    type: "block",
    cols: [
      { w: 65, color: "#4b5563", op: 0.7 },
      { w: 25, color: "#374151", op: 0.5 },
    ],
  },
  { type: "block", cols: [{ w: 50, color: "#8b5cf6", op: 0.5 }] },
  { type: "block", cols: [{ w: 75, color: "#4b5563", op: 0.8 }] },
  {
    type: "block",
    cols: [
      { w: 35, color: "#374151", op: 0.6 },
      { w: 45, color: "#4b5563", op: 0.5 },
    ],
  },
  { type: "block", cols: [{ w: 60, color: "#6366f1", op: 0.4 }] },
];

const CURSORS = [
  {
    id: "sarah",
    name: "Sarah",
    color: "#7c6af7",
    positions: [
      { x: 70, y: 38 },
      { x: 150, y: 60 },
      { x: 90, y: 105 },
      { x: 175, y: 80 },
    ],
  },
  {
    id: "tyler",
    name: "Tyler",
    color: "#e8507a",
    positions: [
      { x: 190, y: 125 },
      { x: 110, y: 145 },
      { x: 230, y: 90 },
      { x: 145, y: 110 },
    ],
  },
];

function CursorPointer({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l5 12 2.5-4.5L14 7z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Cursor({ name, color, x, y, visible }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        pointerEvents: "none",
        transition:
          "left 0.9s cubic-bezier(0.4,0,0.2,1), top 0.9s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
        opacity: visible ? 1 : 0,
        zIndex: 20,
      }}
    >
      <CursorPointer color={color} />
      <div
        style={{
          padding: "2px 6px",
          borderRadius: 4,
          background: color,
          fontSize: 10,
          fontWeight: 500,
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </div>
    </div>
  );
}

function SelectionBox({ x, y, width, height, color }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        border: `1.5px solid ${color}88`,
        background: `${color}18`,
        borderRadius: 3,
        pointerEvents: "none",
        transition:
          "left 0.9s ease, top 0.9s ease, width 0.9s ease, height 0.9s ease",
        zIndex: 10,
      }}
    />
  );
}

export default function CollaborativeCursors() {
  const [sarahIdx, setSarahIdx] = useState(0);
  const [tylerIdx, setTylerIdx] = useState(0);
  const [tylerVisible, setTylerVisible] = useState(false);
  const [activeCursor, setActiveCursor] = useState("sarah");
  const timeoutRef = useRef(null);

  const sp = CURSORS[0].positions[sarahIdx % CURSORS[0].positions.length];
  const sn = CURSORS[0].positions[(sarahIdx + 1) % CURSORS[0].positions.length];
  const tp = CURSORS[1].positions[tylerIdx % CURSORS[1].positions.length];
  const tn = CURSORS[1].positions[(tylerIdx + 1) % CURSORS[1].positions.length];

  const selS = {
    x: Math.min(sp.x, sn.x),
    y: Math.min(sp.y, sn.y),
    w: Math.max(Math.abs(sn.x - sp.x), 50),
    h: Math.max(Math.abs(sn.y - sp.y), 18),
  };
  const selT = {
    x: Math.min(tp.x, tn.x),
    y: Math.min(tp.y, tn.y),
    w: Math.max(Math.abs(tn.x - tp.x), 50),
    h: Math.max(Math.abs(tn.y - tp.y), 18),
  };

  useEffect(() => {
    function step() {
      if (activeCursor === "sarah") {
        setSarahIdx((i) => i + 1);
        timeoutRef.current = setTimeout(() => {
          setTylerVisible(true);
          setActiveCursor("tyler");
        }, 1400);
      } else {
        setTylerIdx((i) => i + 1);
        timeoutRef.current = setTimeout(() => {
          setActiveCursor("sarah");
        }, 1400);
      }
    }
    timeoutRef.current = setTimeout(step, 800);
    return () => clearTimeout(timeoutRef.current);
  }, [activeCursor]);

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 210,
        background: "#16181d",
        borderRadius: 12,
        border: "1px solid #2a2d36",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 30,
          background: "#1e2028",
          borderBottom: "1px solid #2a2d36",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 6,
          flexShrink: 0,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        {/* fake tab bar */}
        <div style={{ marginLeft: 12, display: "flex", gap: 4 }}>
          {["Home", "Docs", "Settings"].map((t, i) => (
            <div
              key={t}
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 9,
                background: i === 0 ? "#2e3140" : "transparent",
                color: i === 0 ? "#a5b4fc" : "#4b5563",
                fontFamily: "system-ui",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div style={{ display: "flex", height: "calc(100% - 30px)" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 36,
            background: "#1a1c23",
            borderRight: "1px solid #2a2d36",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
            gap: 10,
          }}
        >
          {["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"].map(
            (c, i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: i === 0 ? 6 : 4,
                  background: i === 0 ? c : `${c}33`,
                  border: i === 0 ? `1.5px solid ${c}` : "none",
                }}
              />
            ),
          )}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <div
              style={{
                height: 8,
                width: 80,
                background: "#3b3f52",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                height: 6,
                width: 40,
                background: "#2e3140",
                borderRadius: 4,
              }}
            />
          </div>
          {/* Content rows */}
          {[
            [{ w: 100, c: "#3b3f52" }],
            [
              { w: 65, c: "#3b3f52" },
              { w: 28, c: "#6366f144" },
            ],
            [{ w: 80, c: "#3b3f52" }],
            [
              { w: 45, c: "#8b5cf644" },
              { w: 40, c: "#3b3f52" },
            ],
            [{ w: 90, c: "#3b3f52" }],
            [
              { w: 55, c: "#3b3f52" },
              { w: 30, c: "#6366f133" },
            ],
          ].map((row, ri) => (
            <div
              key={ri}
              style={{ display: "flex", gap: 6, alignItems: "center" }}
            >
              {row.map((seg, si) => (
                <div
                  key={si}
                  style={{
                    height: 6,
                    width: `${seg.w}%`,
                    background: seg.c,
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Selection boxes */}
      <SelectionBox
        x={selS.x}
        y={selS.y}
        width={selS.w}
        height={selS.h}
        color="#7c6af7"
      />
      <SelectionBox
        x={selT.x}
        y={selT.y}
        width={selT.w}
        height={selT.h}
        color="#e8507a"
      />

      {/* Cursors */}
      <Cursor name="Sarah" color="#7c6af7" x={sp.x} y={sp.y} visible={true} />
      <Cursor
        name="Tyler"
        color="#e8507a"
        x={tp.x}
        y={tp.y}
        visible={tylerVisible}
      />
    </div>
  );
}
