import React from "react";
export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center bg-white border border-emerald-100 rounded-2xl p-10">
      <h1 className="text-3xl font-bold text-emerald-800 mb-2">Page not found</h1>
      <p className="text-emerald-900/80 mb-6">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Back to Home</a>
    </div>
  );
}