import React from "react";

export default function TipsModal({ isOpen, onClose, tips = [] }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Eco-Friendly Tips</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          {tips.map((tip, idx) => (
            <li key={idx} className="text-sm">
              {tip}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
