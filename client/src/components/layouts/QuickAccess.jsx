import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Calculator, Bell } from "lucide-react";

const actions = [
	{ to: '/energy-logs', label: 'Energy Tracker', icon: Zap, color: 'bg-emerald-600 hover:bg-emerald-700' },
	{ to: '/carbon-logs', label: 'Carbon Calc', icon: Calculator, color: 'bg-emerald-600 hover:bg-emerald-700' },
	{ to: '/dashboard?tab=alerts', label: 'Climate Alerts', icon: Bell, color: 'bg-emerald-600 hover:bg-emerald-700' }
];

export default function QuickAccess() {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	// Mount guard so only one instance is active app-wide
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.__QUICK_ACCESS_MOUNTED) return;
		window.__QUICK_ACCESS_MOUNTED = true;
		setShow(true);
		return () => {
			window.__QUICK_ACCESS_MOUNTED = false;
		};
	}, []);

	if (!show) return null;

	return (
		<>
			{/* Desktop floating buttons */}
			<div className="hidden lg:flex fixed bottom-6 right-6 flex-col gap-3 z-30">
				{actions.map(({ icon: Icon, label, to, color }) => (
					<button
						key={to}
						onClick={() => navigate(to)}
						className={`group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white transition-all hover:scale-105 ${color}`}
						title={label}
						aria-label={label}
					>
						<Icon className="w-5 h-5" />
						<span className="text-sm font-medium opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-200">
							{label}
						</span>
					</button>
				))}
			</div>

			{/* Mobile bottom bar */}
			<div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-emerald-100 flex justify-around py-3 px-4">
				{actions.map(({ icon: Icon, label, to }) => (
					<button key={to} onClick={() => navigate(to)} className="flex flex-col items-center gap-1" title={label} aria-label={label}>
						<div className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
							<Icon className="w-5 h-5" />
						</div>
						<span className="text-xs text-emerald-800">{label}</span>
					</button>
				))}
			</div>
		</>
	);
}