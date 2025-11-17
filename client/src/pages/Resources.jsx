import React from "react";
import { Link } from "react-router-dom";
import { pickAsset, pickDistinctAssets } from "../components/AssetPicker.js";
import { Leaf, Zap, Recycle, Droplets, Sun, Bus, BookOpen, Download, ExternalLink } from "lucide-react";

export default function Resources() {
  const heroImg =
    pickAsset(["resources-hero", "education", "library", "workshop", "class"]) ||
    pickAsset(["forest", "nature", "climate"]);

  const tips = [
    { title: "Reduce Energy Usage", desc: "Switch to LEDs, unplug idle devices, and use smart timers.", icon: Zap, keys: ["led", "power", "energy", "home"] },
    { title: "Choose Renewables", desc: "Adopt solar or wind plans where available to cut emissions.", icon: Sun, keys: ["solar", "turbine", "renewable"] },
    { title: "Conserve Water", desc: "Fix leaks, install aerators, and collect rainwater for plants.", icon: Droplets, keys: ["water", "river", "tap"] },
    { title: "Sustainable Transport", desc: "Walk, cycle, or use public transit for short trips.", icon: Bus, keys: ["bike", "bus", "metro", "city"] },
    { title: "Reduce & Recycle", desc: "Buy durable goods, avoid single-use plastics, sort waste correctly.", icon: Recycle, keys: ["recycle", "waste", "sorting"] },
    { title: "Plant & Protect", desc: "Support tree-planting and local habitat restoration.", icon: Leaf, keys: ["forest", "tree", "park"] },
  ];

  const articles = [
    { title: "Getting Started with Your Carbon Footprint", summary: "Understand scopes, household sources, and set reduction goals.", to: "/blog", keys: ["carbon", "footprint", "chart", "article"] },
    { title: "Home Energy Saving Checklist", summary: "Simple steps to trim your power bill and emissions every month.", to: "/blog", keys: ["checklist", "home", "energy"] },
    { title: "Community Projects That Work", summary: "From solar co-ops to tree corridors—stories and best practices.", to: "/blog", keys: ["community", "project", "workshop"] },
  ];

  const downloads = [
    { title: "Sustainability Guide (PDF)", desc: "A concise guide with practical tips to reduce your carbon footprint.", keys: ["guide", "sustainability", "pdf"] },
    { title: "Home Energy Checklist (PNG)", desc: "Print-ready checklist for your household.", keys: ["checklist", "energy", "home"] },
    { title: "CO₂ Reduction Tips (PNG)", desc: "Quick wins you can start today.", keys: ["tips", "carbon", "co2"] },
  ];

  const downloadHref = (keys) =>
    pickAsset(keys) || pickAsset(["guide", "checklist", "infographic", "report"]) || "#";

  function downloadBlob(name, mime, content) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function createGuidePdf() {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Sustainability Guide", 14, 20);
      doc.setFontSize(12);
      const body =
        "Practical ways to reduce your footprint:\n" +
        "1) Switch to LEDs and smart timers.\n" +
        "2) Choose renewables (solar/wind) where possible.\n" +
        "3) Conserve water: fix leaks, aerators, rainwater.\n" +
        "4) Sustainable transport: walk, bike, transit.\n" +
        "5) Reduce & recycle: avoid single-use, sort waste.\n" +
        "6) Plant & protect: trees and local habitats.\n";
      const lines = doc.splitTextToSize(body, 180);
      doc.text(lines, 14, 32);
      doc.save("Sustainability_Guide.pdf");
    } catch {
      downloadBlob("Sustainability_Guide.txt", "text/plain", "See app Resources for full guide.");
    }
  }

  async function createCo2TipsPdf() {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("CO2 Reduction Tips", 14, 20);
      doc.setFontSize(12);
      const body =
        "Quick CO2 wins:\n" +
        "• Lower thermostat by 1–2°C and insulate.\n" +
        "• Shift heavy appliance use off-peak.\n" +
        "• Fly less; offset only after reducing.\n" +
        "• Prefer plant-rich meals.\n" +
        "• Maintain tire pressure; drive efficiently.\n";
      const lines = doc.splitTextToSize(body, 180);
      doc.text(lines, 14, 32);
      doc.save("CO2_Reduction_Tips.pdf");
    } catch {
      downloadBlob("CO2_Reduction_Tips.txt", "text/plain", "See app Resources for tips.");
    }
  }

  // ensure distinct images for tips/articles/downloads
  const tipImages = pickDistinctAssets(
    tips.map((t) => t.keys),
    { prefer: ["tip","education"], fallbackPool: ["infographic","guide","howto","diagram"] }
  );
  const articleImages = pickDistinctAssets(
    articles.map((a) => a.keys),
    { prefer: ["article","education"], fallbackPool: ["library","reading","notebook","book"] }
  );
  const downloadImages = pickDistinctAssets(
    downloads.map((d) => d.keys),
    { prefer: ["download","sheet"], fallbackPool: ["infographic","poster","handout"] }
  );

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl overflow-hidden border border-emerald-100 bg-white">
        <div className="relative h-56 sm:h-64">
          {heroImg ? (
            <img src={heroImg} alt="Resources" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 hero-gradient" />
          )}
          <div className="absolute inset-0 bg-emerald-900/45" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Resources & Education</h1>
            <p className="mt-2 text-emerald-50 max-w-2xl text-sm">
              Practical tips, articles, and downloads to help you learn and take action.
            </p>
            <div className="mt-4 flex gap-3">
              <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-semibold hover:bg-emerald-100">
                <BookOpen className="w-4 h-4" /> Browse Articles
              </Link>
              <a href="#downloads" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/70 text-white text-sm font-semibold hover:bg-white/10">
                <Download className="w-4 h-4" /> Downloads
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS GRID */}
      <section className="rounded-3xl bg-white border border-emerald-100 p-6">
        <h2 className="text-xl font-bold text-emerald-900 mb-4">Tips on Sustainability</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((t, i) => {
            const Icon = t.icon;
            const img = tipImages[i];
            return (
              <div key={t.title} className="group rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  {img ? (
                    <img src={img} alt={t.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full hero-gradient" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs">
                    <Icon className="w-4 h-4" />
                    <span className="uppercase tracking-wide">Tip</span>
                  </div>
                  <h3 className="mt-1 font-semibold text-emerald-900">{t.title}</h3>
                  <p className="text-sm text-emerald-900/80 mt-1">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARTICLES PREVIEW */}
      <section className="rounded-3xl bg-white border border-emerald-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-900">Articles & Blogs</h2>
          <Link to="/blog" className="text-sm text-emerald-700 hover:underline flex items-center gap-1">
            View all <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => {
            const img = articleImages[i];
            return (
              <Link to={a.to} key={a.title} className="group rounded-2xl overflow-hidden border border-emerald-100 bg-white hover:shadow-lg transition">
                <div className="aspect-video">
                  {img ? (
                    <img src={img} alt={a.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full hero-gradient" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-emerald-900">{a.title}</h3>
                  <p className="text-sm text-emerald-900/80 mt-1">{a.summary}</p>
                  <span className="inline-block mt-3 text-xs font-medium text-emerald-700 group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DOWNLOADS */}
      <section id="downloads" className="rounded-3xl bg-white border border-emerald-100 p-6">
        <h2 className="text-xl font-bold text-emerald-900 mb-4">Downloads</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((d, i) => {
            const href = downloadHref(d.keys);
            const img = downloadImages[i];
            const isGuide = /guide/i.test(d.title);
            const isCo2 = /CO2/i.test(d.title) || /CO₂/i.test(d.title);
            return (
              <div key={d.title} className="rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50">
                <div className="aspect-video">
                  {img ? <img src={img} alt={d.title} className="w-full h-full object-cover" /> : <div className="w-full h-full hero-gradient" />}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-emerald-900">{d.title}</h3>
                  <p className="text-sm text-emerald-900/80 mt-1">{d.desc}</p>
                  <div className="mt-3 flex gap-3">
                    {href !== "#" ? (
                      <>
                        <a href={href} download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700">
                          Download
                        </a>
                        <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-200 text-emerald-700 text-xs font-medium hover:bg-emerald-50">
                          View
                        </a>
                      </>
                    ) : (
                      <>
                        {isGuide && (
                          <button onClick={createGuidePdf} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700">
                            Generate PDF
                          </button>
                        )}
                        {isCo2 && (
                          <button onClick={createCo2TipsPdf} className="px-3 py-1.5 rounded-md border border-emerald-200 text-emerald-700 text-xs font-medium hover:bg-emerald-50">
                            Generate PDF
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-emerald-900/70">
          Add varied education images to src/assets (e.g., education1.jpg, library.jpg, workshop.jpg, infographic1.png, checklist.png, guide.png) to populate uniquely.
        </p>
      </section>
    </div>
  );
}
