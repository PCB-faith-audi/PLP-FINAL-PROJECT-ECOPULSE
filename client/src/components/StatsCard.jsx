import React from "react";

export default function StatsCard({ label, value, suffix }) {
  return (
    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex flex-col">
      <p className="text-xs font-semibold tracking-wide text-emerald-700">{label}</p>
      <p className="text-2xl font-extrabold text-emerald-900 mt-1">
        {value}
        {suffix && <span className="text-sm font-semibold ml-1">{suffix}</span>}
      </p>
    </div>
  );
}