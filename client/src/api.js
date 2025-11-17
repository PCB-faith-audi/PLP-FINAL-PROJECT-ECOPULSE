import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
export const api = axios.create({
  baseURL: API_BASE, // empty = same-origin (dev uses Vite proxy)
  withCredentials: true,
});

// If you have existing axios usage, reuse `api` instead of axios directly.

api.interceptors.request.use((config) => {
  try {
    const token =
      localStorage.getItem("ecopulse_token") ||
      localStorage.getItem("token") ||
      null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {}
  return config;
});

const ok = (res) => res && res.status >= 200 && res.status < 300;
const unwrap = (res) => (res?.data ?? res);
const safeGet = async (path, params) => {
  try {
    const res = await api.get(path, { params });
  return ok(res) ? unwrap(res) : null;
  } catch {
    return null;
  }
};
const safePost = async (path, body) => {
  try {
    const res = await api.post(path, body);
    return ok(res) ? unwrap(res) : null;
  } catch {
    return null;
  }
};
const safePut = async (path, body) => {
  try {
    const res = await api.put(path, body);
    return ok(res) ? unwrap(res) : null;
  } catch {
    return null;
  }
};
const safeDelete = async (path) => {
  try {
    const res = await api.delete(path);
    return ok(res) ? unwrap(res) : null;
  } catch {
    return null;
  }
};

// ENERGY CRUD
export async function getEnergyLogs() { return (await safeGet("/api/energy")) || { items: [] }; }
export async function createEnergyLog(payload) { return await safePost("/api/energy", payload); }
export async function updateEnergyLog(id, payload) { return await safePut(`/api/energy/${id}`, payload); }
export async function deleteEnergyLog(id) { return await safeDelete(`/api/energy/${id}`); }

// CARBON CRUD
export async function getCarbonLogs() { return (await safeGet("/api/carbon")) || { items: [] }; }
export async function createCarbonLog(payload) { return await safePost("/api/carbon", payload); }
export async function updateCarbonLog(id, payload) { return await safePut(`/api/carbon/${id}`, payload); }
export async function deleteCarbonLog(id) { return await safeDelete(`/api/carbon/${id}`); }

// CLIMATE TREND
export async function getClimateTrend(params = {}) {
  const tryPaths = ["/api/climate", "/api/climate/global", "/api/climate/trend"];
  for (const path of tryPaths) {
    const data = await safeGet(path, params);
    if (!data) continue;
    if (Array.isArray(data)) {
      const dates = data.map((d) => d.date || d.time || d.createdAt).filter(Boolean);
      const values = data.map((d) => Number(d.value ?? d.temp ?? d.anomaly ?? 0));
      if (values.length) return { dates, values };
    } else if (Array.isArray(data.items)) {
      const dates = data.items.map((d) => d.date || d.time || d.createdAt).filter(Boolean);
      const values = data.items.map((d) => Number(d.value ?? d.temp ?? d.anomaly ?? 0));
      if (values.length) return { dates, values };
    } else if (Array.isArray(data.series)) {
      const dates = data.series.map((d) => d[0]);
      const values = data.series.map((d) => Number(d[1]));
      if (values.length) return { dates, values };
    }
  }
  return { dates: [], values: [] };
}

// NEWS
export async function getNews() {
  const base = import.meta.env.VITE_API_URL || "";
  const res = await fetch(`${base}/api/news`);
  if (!res.ok) throw new Error("Failed to load news");
  return res.json();
}
