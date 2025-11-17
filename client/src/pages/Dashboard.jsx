// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import ClimateChart from "../components/ClimateChart.jsx";
import { getEnergyLogs, getCarbonLogs, getClimateTrend } from "../api.js";
import { pickAsset } from "../components/AssetPicker.js";

export default function Dashboard() {
  const [energyLogs, setEnergyLogs] = useState([]);
  const [carbonLogs, setCarbonLogs] = useState([]);
  const [climateSeries, setClimateSeries] = useState({ dates: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const [e, c, climate] = await Promise.all([
        getEnergyLogs(),
        getCarbonLogs(),
        getClimateTrend({ range: "1y" }),
      ]);
      if (!mounted) return;
      const eItems = Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
      const cItems = Array.isArray(c) ? c : Array.isArray(c?.items) ? c.items : [];
      setEnergyLogs(eItems);
      setCarbonLogs(cItems);
      setClimateSeries(climate || { dates: [], values: [] });
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  // Extract values and dates safely
  const values = energyLogs
    .map((e) => Number(e.value ?? e.energyValue ?? 0))
    .filter((n) => Number.isFinite(n));

  const dates = energyLogs
    .map((e) => e.date ?? e.createdAt ?? null)
    .filter(Boolean);

  // You can pass climateSeries to your ClimateChart if it supports props
  // Example:
  // <ClimateChart labels={climateSeries.dates} values={climateSeries.values} />

  // Fallback demo data (10 points)
  const data = values.length > 1 ? values : [8, 12, 18, 14, 20, 24, 30, 28, 34, 40];
  const dateLabels = values.length > 1 && dates.length === values.length ? dates : undefined;

  const bannerImg = pickAsset(["dashboard","energy-usage","energy","graph","chart"]);

  return (
    <div className="space-y-8">
      {bannerImg && (
        <div className="rounded-2xl overflow-hidden border border-emerald-100 h-40">
          <img src={bannerImg} alt="Energy Usage" className="w-full h-full object-cover" />
        </div>
      )}
      <section className="rounded-2xl bg-white border border-emerald-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-800">Energy Usage</h2>
          {loading && <span className="text-sm text-emerald-700">Loading…</span>}
        </div>
        <ClimateChart
          data={data}
          dates={dateLabels}
          color="#10b981"
          height={300}
          smooth
          area
          yFormatter={(v) => `${v} kWh`}
        />
        <p className="mt-3 text-xs text-emerald-900/70">
          Hover to see values. Labels use your entry dates when available.
        </p>
      </section>
    </div>
  );
}
