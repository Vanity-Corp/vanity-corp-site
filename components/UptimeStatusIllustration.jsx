"use client";

import { useState, useMemo } from "react";

const STATUSES = [
  { label: "Operational", color: "#22c55e", pct: 100, incidents: 0 },
  { label: "Degraded", color: "#f59e0b", pct: 98.2, incidents: 1 },
  { label: "Partial Outage", color: "#f97316", pct: 94.1, incidents: 2 },
  { label: "Major Outage", color: "#ef4444", pct: 78.3, incidents: 5 },
];

function randomStatus() {
  const r = Math.random();
  if (r > 0.12) return STATUSES[0];
  if (r > 0.06) return STATUSES[1];
  if (r > 0.03) return STATUSES[2];
  return STATUSES[3];
}

function generateBars(count = 45) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (count - 1 - i));
    return {
      date: d,
      status: randomStatus(),
      baseHeight: 20 + Math.random() * 36,
    };
  });
}

function UptimeBar({ bar, onHover, onLeave }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        onHover(bar);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onLeave();
      }}
      style={{
        flex: 1,
        height: hovered ? 56 : bar.baseHeight,
        background: bar.status.color,
        borderRadius: 2,
        cursor: "pointer",
        transition: "height 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        minHeight: 8,
      }}
    />
  );
}

export default function UptimeStatusIllustration() {
  const bars = useMemo(() => generateBars(45), []);

  // default: show overall 99.9% / "Uptime"
  const [hovered, setHovered] = useState(null);

  const displayPct = hovered ? `${hovered.status.pct}%` : "99.9%";
  const displayLabel = hovered ? hovered.status.label : "Uptime";
  const displayColor = hovered ? hovered.status.color : "#22c55e";

  return (
    <div
      className="m-auto "
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}
    >
      {/* Header — values change on hover */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: hovered ? displayColor : "inherit",
            transition: "color 0.2s",
          }}
        >
          {displayLabel}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: displayColor,
            transition: "color 0.2s, opacity 0.15s",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayPct}
        </span>
      </div>

      {/* Bars */}
      <div
        style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 56 }}
      >
        {bars.map((bar, i) => (
          <UptimeBar
            key={i}
            bar={bar}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* Date labels */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "#9ca3af" }}>45 days ago</span>
        <span style={{ fontSize: 10, color: "#9ca3af" }}>Today</span>
      </div>
    </div>
  );
}
