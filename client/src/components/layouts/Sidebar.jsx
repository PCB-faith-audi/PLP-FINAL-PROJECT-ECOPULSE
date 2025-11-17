import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { navItems } from "../../data/navItems.js";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-emerald-900/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-emerald-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-label="Main"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-emerald-100">
          <span className="text-xl font-bold text-emerald-700">EcoPulse</span>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-emerald-50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-emerald-700" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {Array.isArray(navItems) &&
            navItems.map(({ to, label, icon: Icon }) => {
              const ValidIcon = Icon || (() => null);
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-900 hover:bg-emerald-50"
                    }`
                  }
                >
                  <ValidIcon className="w-5 h-5" />
                  <span className="truncate">{label}</span>
                </NavLink>
              );
            })}
        </nav>
        <div className="p-4 border-t border-emerald-100">
          <p className="text-xs text-emerald-700">© 2025 EcoPulse</p>
        </div>
      </aside>
    </>
  );
}
