// src/components/ClimateChart.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

function formatMonthShort(d) {
  const dt = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return dt.toLocaleDateString(undefined, { month: "short" });
}
function formatDayMonth(d) {
  const dt = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return dt.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

function makeDemo(n = 12) {
  const now = new Date();
  const labels = [];
  const values = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);
    labels.push(d.toISOString().slice(0, 10));
    values.push(0.2 + Math.sin((i / n) * Math.PI * 2) * 0.15 + Math.random() * 0.05);
  }
  return { labels, values };
}

export default function ClimateChart({ labels = [], values = [], title = "Global Climate Trend" }) {
  const hasData = Array.isArray(labels) && labels.length && Array.isArray(values) && values.length;
  const data = hasData ? { labels, values } : makeDemo(12);

  // Build a simple responsive SVG line chart (no external libs)
  const W = 600;
  const H = 200;
  const P = 28; // padding
  const min = Math.min(...data.values);
  const max = Math.max(...data.values);
  const yMin = isFinite(min) ? min : 0;
  const yMax = isFinite(max) ? max : 1;
  const range = yMax - yMin || 1;

  const points = data.values.map((v, i) => {
    const x = P + (i * (W - P * 2)) / Math.max(1, data.values.length - 1);
    const y = H - P - ((v - yMin) / range) * (H - P * 2);
    return [x, y];
  });

  const pathD = points
    .map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `L ${x},${y}`))
    .join(" ");

  const gradientId = "climateGradient";

  return (
    <div className="card">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-50">{title}</h3>
      </div>
      <div className="px-2 pb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Axes */}
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#d1fae5" strokeWidth="1" />
          <line x1={P} y1={P} x2={P} y2={H - P} stroke="#d1fae5" strokeWidth="1" />

          {/* Area under line */}
          {points.length > 1 && (
            <path
              d={`${pathD} L ${W - P},${H - P} L ${P},${H - P} Z`}
              fill={`url(#${gradientId})`}
            />
          )}

          {/* Line */}
          {points.length > 1 && <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2" />}

          {/* Points */}
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#10b981" />
          ))}

          {/* Y-axis labels (min/max) */}
          <text x={P + 4} y={P + 10} fontSize="10" fill="#065f46">
            {yMax.toFixed(2)}
          </text>
          <text x={P + 4} y={H - P - 4} fontSize="10" fill="#065f46">
            {yMin.toFixed(2)}
          </text>
        </svg>

        {/* X labels (last and first for brevity) */}
        <div className="flex justify-between text-[10px] text-emerald-700 dark:text-emerald-200 px-2 mt-1">
            <span>{data.labels[0] || ""}</span>
            <span>{data.labels[data.labels.length - 1] || ""}</span>
        </div>
      </div>
    </div>
  );
}
