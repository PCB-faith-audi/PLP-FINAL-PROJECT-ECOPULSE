import React from "react";
import { getEnergyLogs, createEnergyLog, updateEnergyLog, deleteEnergyLog } from "../api.js";
import { useApiResource } from "../hooks/useApiResource.js";

export default function EnergyLogs() {
    const energy = useApiResource({
        listFn: getEnergyLogs,
        createFn: createEnergyLog,
        updateFn: updateEnergyLog,
        deleteFn: deleteEnergyLog,
      });
    
      // Example handlers you can connect to your form/buttons:
      const handleAdd = async (payload) => {
        // payload: { value, date, note? }
        await energy.create(payload);
      };
      const handleUpdate = async (id, payload) => {
        await energy.update(id, payload);
      };
      const handleDelete = async (id) => {
        await energy.remove(id);
      };
    
      // Provide data to charts/tables
      const rows = energy.items;
      const values = rows
        .map((e) => Number(e.value ?? e.energyValue ?? 0))
        .filter((n) => Number.isFinite(n));
      const dates = rows.map((e) => e.date ?? e.createdAt ?? null).filter(Boolean);
    
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Energy Logs</h1>
          <p>Track your energy usage history.</p>
          {/* Example: render count; keep your existing UI intact */}
          <div className="text-xs text-emerald-700 mb-2">
            {energy.loading ? "Loading energy logs…" : `Energy logs: ${rows.length}`}
          </div>
          {/* Connect your form submit to handleAdd, row edit to handleUpdate, and delete button to handleDelete */}
        </div>
      );
}
