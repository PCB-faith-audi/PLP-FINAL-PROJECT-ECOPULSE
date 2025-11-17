import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card max-w-lg w-full">
          {title ? (
            <div className="px-4 pt-4 text-lg font-semibold text-emerald-900">
              {title}
            </div>
          ) : null}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
