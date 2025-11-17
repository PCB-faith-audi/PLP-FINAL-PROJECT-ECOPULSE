import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import energyRoutes from "./routes/energy.js";
import carbonRoutes from "./routes/carbon.js";
import climateRoutes from "./routes/climate.js";
import newsRoutes from "./routes/news.js";

const app = express();
app.use(express.json());

// Trust proxy when behind Vercel/Netlify/Render
app.set("trust proxy", 1);

// Security headers
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
}));

// Rate limit (tune if needed)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

// CORS: allow your frontend origin (dev + prod)
const allowedOrigins = [
  "http://localhost:5174",
  process.env.FRONTEND_ORIGIN, // e.g., https://ecopulse.vercel.app
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// Inject mocks BEFORE mounting real routes
if (process.env.USE_MOCKS === "1") {
  const day = 86400000;
  const today = new Date();
  const d = (i) => new Date(today - i * day).toISOString().slice(0, 10);

  const mockEnergy = Array.from({ length: 10 }, (_, i) => ({
    _id: `eng-${i + 1}`,
    date: d(i),
    kwh: Math.round((12 + Math.sin(i) * 4 + Math.random() * 2) * 10) / 10,
    source: ["grid", "solar", "wind"][i % 3],
    notes: "Mock energy log",
  }));
  const mockCarbon = Array.from({ length: 10 }, (_, i) => ({
    _id: `crb-${i + 1}`,
    date: d(i),
    kgCO2: Math.round((6 + Math.cos(i) * 2 + Math.random()) * 10) / 10,
    category: ["transport", "electricity", "waste"][i % 3],
    notes: "Mock carbon log",
  }));
  const mockClimate = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const dt = new Date(today);
      dt.setMonth(today.getMonth() - (11 - i));
      return dt.toISOString().slice(0, 10);
    }),
    values: Array.from({ length: 12 }, (_, i) => 0.2 + Math.sin((i / 12) * Math.PI * 2) * 0.15 + Math.random() * 0.05),
  };
  const mockNews = {
    items: [
      { id: "n1", title: "Community Solar Hits New Milestone", summary: "Local projects deliver clean power and lower bills.", url: "#", date: today.toISOString() },
      { id: "n2", title: "Wetlands Restoration Boosts Biodiversity", summary: "Restored habitats show ecological gains.", url: "#", date: new Date(today - day).toISOString() },
      { id: "n3", title: "Smart Grids Reduce Peak Demand", summary: "AI-driven load shifting improves resilience.", url: "#", date: new Date(today - 2 * day).toISOString() },
    ],
  };

  // Mock endpoints used by the client
  app.get("/api/energy", (_req, res) => res.json({ items: mockEnergy }));
  app.get("/api/carbon", (_req, res) => res.json({ items: mockCarbon }));
  app.get("/api/climate", (_req, res) => res.json(mockClimate));
  app.get("/api/climate/global", (_req, res) => res.json(mockClimate));
  app.get("/api/climate/trend", (_req, res) => res.json(mockClimate));
  app.get("/api/news", (_req, res) => res.json(mockNews));
}

// Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", energyRoutes);
app.use("/api", carbonRoutes);
app.use("/api", climateRoutes);
app.use("/api/news", newsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
