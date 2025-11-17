import React from "react";
import { pickAsset } from "../components/AssetPicker.js";
import { MapPin, Tag } from "lucide-react";

const projects = [
	{
		id: "p1",
		title: "Solar for Schools",
		status: "Ongoing",
		type: "Renewable Energy",
		location: "Nairobi, Kenya",
		summary: "Rooftop solar installations to reduce grid reliance and costs.",
		mediaKeys: ["solar", "sun", "panel", "school"],
	},
	{
		id: "p2",
		title: "Urban Tree Planting",
		status: "Ongoing",
		type: "Tree Planting",
		location: "London, UK",
		summary: "Community-driven planting to increase canopy cover and shade.",
		mediaKeys: ["tree", "forest", "park", "urban"],
	},
	{
		id: "p3",
		title: "Clean Rivers Initiative",
		status: "Past",
		type: "Conservation",
		location: "New York, USA",
		summary: "River cleanups and microplastic traps with local volunteers.",
		mediaKeys: ["river", "water", "clean"],
	},
	{
		id: "p4",
		title: "Wind Coop",
		status: "Past",
		type: "Renewable Energy",
		location: "Amsterdam, NL",
		summary: "Community-owned wind turbine financing and operations.",
		mediaKeys: ["turbine", "wind", "cooperative"],
	},
	{
		id: "p5",
		title: "Community Gardens",
		status: "Ongoing",
		type: "Urban Agriculture",
		location: "Berlin, DE",
		summary: "Local food production and soil regeneration across neighborhoods.",
		mediaKeys: ["garden", "greens", "urban", "nature"],
	},
	{
		id: "p6",
		title: "Plastic-Free Markets",
		status: "Past",
		type: "Waste Reduction",
		location: "Kigali, Rwanda",
		summary: "Vendor support to transition from single-use plastics.",
		mediaKeys: ["market", "plastic", "recycle", "waste"],
	},
];

function projectImage(keys) {
	return (
		pickAsset(keys) ||
		pickAsset(["solar", "turbine", "forest", "river", "garden", "nature", "climate"]) ||
		undefined
	);
}

export default function Projects() {
	return (
		<div className="space-y-8">
			<section className="rounded-3xl bg-white border border-emerald-100 p-6">
				<h1 className="text-2xl font-bold text-emerald-800">Projects & Initiatives</h1>
				<p className="text-sm text-emerald-900/80 mt-1">
					Explore ongoing and past community initiatives. Hover a card to preview.
				</p>
			</section>

			<section>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((p) => {
						const img = projectImage(p.mediaKeys);
						const ongoing = /ongoing/i.test(p.status);
						return (
							<div
								key={p.id}
								className="group rounded-2xl overflow-hidden border border-emerald-100 bg-white transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-xl"
							>
								<div className="relative aspect-video overflow-hidden">
									{img ? (
										<img
											src={img}
											alt={p.title}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									) : (
										<div className="w-full h-full hero-gradient" />
									)}
									<span
										className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full ${
											ongoing ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"
										}`}
									>
										{p.status}
									</span>
								</div>

								<div className="p-4">
									<div className="flex items-center gap-2 text-emerald-700 text-xs">
										<Tag className="w-3.5 h-3.5" />
										<span className="uppercase tracking-wide">{p.type}</span>
									</div>
									<h3 className="mt-1 font-semibold text-emerald-900">{p.title}</h3>
									<p className="text-xs text-emerald-900/70 mt-1 flex items-center gap-1">
										<MapPin className="w-3.5 h-3.5" />
										{p.location}
									</p>
									<p className="text-sm text-emerald-900/80 mt-3">{p.summary}</p>

									<div className="mt-4">
										<a
											href="/contact"
											className="text-xs font-medium text-emerald-700 hover:underline"
										>
											Volunteer or learn more →
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}

