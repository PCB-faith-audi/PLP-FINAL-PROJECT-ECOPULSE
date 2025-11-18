import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Gauge, BookOpen, Newspaper, Info } from "lucide-react";
import { pickAsset } from "../components/AssetPicker.js";
import climateImg from "../assets/climate.jpg"; // ensure this file exists
import energyUsage from "../assets/energy-usage.jpg";
import heroFallback1 from "../assets/coast.jpg";
import heroFallback2 from "../assets/sunny.jpg";
import heroFallback3 from "../assets/sunlight.jpg";

// Asset URLs
const heroVideo = pickAsset(["hero.mp4", "intro", "climate"]);
const heroImage = pickAsset(["hero", "intro", "climate", "earth", "forest", "mountain"]);
const heroCandidates = [heroImage, heroFallback1, heroFallback2, heroFallback3].filter(Boolean);

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failed, setFailed] = useState(new Set());

  // Define optional assets to avoid ReferenceError and provide fallbacks
  const logoUrl =
    pickAsset(["logo.svg", "logo.png", "logo", "leaf", "ecopulse"]) || null;
  const turbineUrl =
    pickAsset(["turbine", "wind", "wind-turbine", "turbines"]) || null;
  const forestUrl =
    pickAsset(["forest", "trees", "woods", "jungle"]) || null;
  const welcomeImg =
    pickAsset(["welcome", "hero", "forest", "coast", "sunny", "sunlight"]) ||
    heroFallback1;

  useEffect(() => {
    if (heroCandidates.length < 2) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % heroCandidates.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroCandidates.length]);

  return (
    <div className="space-y-8">
      {/* HERO SECTION (updated) */}
      <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
        {heroCandidates[currentIndex] && !failed.has(heroCandidates[currentIndex]) ? (
          <img
            key={heroCandidates[currentIndex]}
            src={heroCandidates[currentIndex]}
            alt="EcoPulse Hero"
            className="w-full h-full object-cover object-center"
            onError={() =>
              setFailed(prev => new Set([...prev, heroCandidates[currentIndex]]))
            }
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-emerald-600 to-emerald-500" />
        )}

        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Track Your Carbon Footprint Today
          </h1>
          <p className="mt-6 max-w-xl text-emerald-50">
            EcoPulse helps you monitor energy usage, reduce emissions, and join real impact projects.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold"
            >
              Start Tracking
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-md font-semibold"
            >
              Explore Projects
            </button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section id="about" className="py-16 px-4 text-center bg-gray-50">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Track your energy. Protect the planet.
        </h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto">
          EcoPulse helps you monitor your carbon footprint, track energy
          consumption, and adopt sustainable living habits.
        </p>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="py-16 px-4 text-center bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-green-100 p-6 rounded shadow hover:scale-105 transform transition">
            <h3 className="font-bold text-lg mb-2">Tree Planting</h3>
            <p>Community-driven tree planting initiatives for greener cities.</p>
          </div>

          <div className="bg-blue-100 p-6 rounded shadow hover:scale-105 transform transition">
            <h3 className="font-bold text-lg mb-2">Renewable Energy</h3>
            <p>Projects to promote solar and wind energy adoption locally.</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded shadow hover:scale-105 transform transition">
            <h3 className="font-bold text-lg mb-2">Clean Rivers</h3>
            <p>Efforts to clean waterways and restore aquatic ecosystems.</p>
          </div>
        </div>
      </section>

      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to EcoPulse</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your energy, carbon footprint, and climate impact.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px,1fr] gap-6">
        {/* Left: Brand / Nav summary card (mirrors sidebar look) */}
        <aside className="rounded-3xl bg-emerald-900 text-emerald-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            {logoUrl ? (
              <img src={logoUrl} alt="EcoPulse" className="w-8 h-8" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-600" />
            )}
            <h2 className="text-xl font-semibold tracking-wide">CLIMATE</h2>
          </div>

          <nav className="space-y-2">
            {[
              { to: "/", icon: Leaf, label: "Home", active: true },
              { to: "/dashboard", icon: Gauge, label: "Dashboard" },
              { to: "/about", icon: Info, label: "About" },
              { to: "/resources", icon: BookOpen, label: "Resources" },
              { to: "/projects", icon: Leaf, label: "Projects" },
              { to: "/blog", icon: Newspaper, label: "Blog/News" },
            ].map(({ to, icon: Icon, label, active }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                  active
                    ? "bg-emerald-700 text-white"
                    : "hover:bg-emerald-800/60"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right: Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero + KPIs card */}
          <section className="lg:col-span-2 rounded-3xl bg-white border border-emerald-100 p-0 overflow-hidden">
            <div className="relative h-56 bg-gradient-to-b from-emerald-200 to-emerald-100">
              {turbineUrl && (
                <img
                  src={turbineUrl}
                  alt="Wind turbine"
                  className="absolute right-4 bottom-0 w-40 h-40 opacity-90"
                />
              )}
              {forestUrl && (
                <img
                  src={forestUrl}
                  alt="Forest"
                  className="absolute left-0 bottom-0 h-40 opacity-90"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                Track your carbon footprint today
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "CO₂ SAVED", value: "12,340", suffix: "kg" },
                  { label: "RENEWABLE ENERGY", value: "75", suffix: "%" },
                  { label: "DAYS ON TRACK", value: "21", suffix: "d" },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                    <p className="text-xs font-semibold tracking-wide text-emerald-700">
                      {k.label}
                    </p>
                    <p className="text-2xl font-extrabold text-emerald-900">
                      {k.value}
                      <span className="text-sm font-semibold ml-1">{k.suffix}</span>
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="mt-6 w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
              >
                Learn More
              </button>
            </div>
          </section>

          {/* Mini About card */}
          <section className="rounded-3xl bg-white border border-emerald-100 p-6">
            <h4 className="text-lg font-bold text-emerald-900 mb-4">About</h4>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-emerald-800">Our Mission & Vision</p>
                <p className="text-sm text-emerald-900/80">
                  Empower people and teams to reduce emissions through insight and action.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Meet the Team</p>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-emerald-200 border-2 border-white"
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Impact</p>
                <p className="text-sm text-emerald-900/80">
                  Join thousands tracking energy, waste, and transport footprints.
                </p>
              </div>
            </div>
          </section>

          {/* Dashboard card */}
          <section className="lg:col-span-3 rounded-3xl bg-white border border-emerald-100 p-6">
            <h4 className="text-xl font-bold text-emerald-900 mb-4">Dashboard</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-sm font-semibold text-emerald-700">Energy Usage</p>
                <div className="h-28 mt-2 rounded-lg bg-white border border-emerald-100" />
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-sm font-semibold text-emerald-700">Goals & Progress</p>
                <div className="h-28 mt-2 rounded-lg grid place-items-center">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-20 h-20">
                      <path
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                        fill="none"
                        stroke="#e5f7ef"
                        strokeWidth="4"
                      />
                      <path
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="4"
                        strokeDasharray="60 100"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 grid place-items-center text-emerald-800 font-bold">
                      60%
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-sm font-semibold text-emerald-700">Notifications</p>
                <ul className="mt-2 text-sm text-emerald-900 space-y-1">
                  <li>Solar peak today 13:00–15:00</li>
                  <li>New tips in Resources</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Welcome to EcoPulse visual under climate section */}
      {welcomeImg && (
        <section className="rounded-3xl overflow-hidden border border-emerald-100 bg-white">
          <div className="relative h-56 sm:h-64">
            <img src={welcomeImg} alt="Welcome to EcoPulse" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-emerald-900/35" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Welcome to EcoPulse
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 max-w-md mx-auto">
                Join us in tracking and reducing your carbon footprint. Together, we can make a difference.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="flex-1 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition"
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
