import { useState } from "react";

export default function EnergyForm({ onSuccess }) {
  const [usage, setUsage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess({ usage });
    setUsage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>Energy Usage (kWh)</label>
      <input
        type="number"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
        className="border rounded p-1"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
        Save
      </button>
    </form>
  );
}
