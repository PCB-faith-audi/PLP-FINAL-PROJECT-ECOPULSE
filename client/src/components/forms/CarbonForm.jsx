import { useState } from "react";
import { useCarbonCalculator } from "../../hooks/useCarbonCalculator.js";

export default function CarbonForm(props) {
  const [transport, setTransport] = useState("");
  const [diet, setDiet] = useState("");
  const { inputs, setInputs, estimateKgCO2e, breakdown } = useCarbonCalculator({
    electricityKwh: 0,
    carKm: 0,
    carType: "petrol",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSuccess({ transport, diet });
    setTransport("");
    setDiet("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>Transport CO₂ (kg)</label>
      <input
        type="number"
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        className="border rounded p-1"
      />
      <label>Diet CO₂ (kg)</label>
      <input
        type="number"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="border rounded p-1"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
        Save
      </button>

      {/* Example extra fields for live calculation (optional) */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-emerald-800">Electricity (kWh)</label>
          <input
            type="number"
            min="0"
            value={inputs.electricityKwh ?? 0}
            onChange={(e) => setInputs((s) => ({ ...s, electricityKwh: Number(e.target.value || 0) }))}
            className="w-full rounded-md border border-emerald-200 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-emerald-800">Car distance (km)</label>
          <input
            type="number"
            min="0"
            value={inputs.carKm ?? 0}
            onChange={(e) => setInputs((s) => ({ ...s, carKm: Number(e.target.value || 0) }))}
            className="w-full rounded-md border border-emerald-200 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-emerald-800">Car type</label>
          <select
            value={inputs.carType || "petrol"}
            onChange={(e) => setInputs((s) => ({ ...s, carType: e.target.value }))}
            className="w-full rounded-md border border-emerald-200 px-3 py-2"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="ev">EV</option>
          </select>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
        <p className="text-sm text-emerald-900">
          Estimated emissions: <span className="font-semibold">{estimateKgCO2e.toFixed(1)} kg CO₂e</span>
        </p>
        <ul className="mt-2 text-xs text-emerald-900/80 list-disc pl-4">
          {breakdown.map((b) => (
            <li key={b.key}>
              {b.key.replaceAll("_", " ")}: {b.kg.toFixed(1)} kg
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
