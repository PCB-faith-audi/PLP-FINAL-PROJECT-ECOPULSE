import React from "react";
import { getCarbonLogs, createCarbonLog, updateCarbonLog, deleteCarbonLog } from "../api.js";
import { useApiResource } from "../hooks/useApiResource.js";

export default function CarbonLogs() {
    const carbon = useApiResource({
        listFn: getCarbonLogs,
        createFn: createCarbonLog,
        updateFn: updateCarbonLog,
        deleteFn: deleteCarbonLog,
      });
    
      const handleAdd = async (payload) => { await carbon.create(payload); };
      const handleUpdate = async (id, payload) => { await carbon.update(id, payload); };
      const handleDelete = async (id) => { await carbon.remove(id); };
    
      const rows = carbon.items;
      const values = rows.map((e) => Number(e.value ?? e.kgCO2e ?? 0)).filter((n) => Number.isFinite(n));
      const dates = rows.map((e) => e.date ?? e.createdAt ?? null).filter(Boolean);
    
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Carbon Logs</h1>
          <p>Review your carbon emissions over time.</p>
          <div className="text-xs text-emerald-700 mb-2">
            {carbon.loading ? "Loading carbon logs…" : `Carbon logs: ${rows.length}`}
          </div>
          {/* Hook your form/table actions to handleAdd/handleUpdate/handleDelete */}
        </div>
      );
    }
