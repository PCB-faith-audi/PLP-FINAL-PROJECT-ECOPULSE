import React, { useEffect, useState } from "react";
import { getNews } from "../api.js";
import { pickAsset } from "../components/AssetPicker.js";

export default function Blog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fallbackImg = pickAsset(["news","climate","earth","nature","forest","solar"]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getNews();
        if (mounted) setItems(Array.isArray(data?.items) ? data.items : []);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white border border-emerald-100 p-6">
        <h1 className="text-2xl font-bold text-emerald-800">Climate Blog / News</h1>
        <p className="text-sm text-emerald-900/80 mt-1">Latest climate and renewable energy headlines.</p>
      </section>

      <section className="rounded-3xl bg-white border border-emerald-100 p-6">
        {loading && <p className="text-sm text-emerald-700">Loading news…</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-emerald-900/70">No news available right now. Try again later.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <a
              key={i}
              href={n.link}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl overflow-hidden border border-emerald-100 bg-white hover:shadow-lg transition"
            >
              <div className="aspect-video">
                {n.image ? (
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                ) : fallbackImg ? (
                  <img src={fallbackImg} alt="News" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full hero-gradient" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-emerald-900">{n.title}</h3>
                {n.pubDate && (
                  <p className="text-[11px] text-emerald-700 mt-1">{new Date(n.pubDate).toLocaleString()}</p>
                )}
                <p className="text-sm text-emerald-900/80 mt-2 line-clamp-3">{n.snippet}</p>
                <span className="inline-block mt-3 text-xs font-medium text-emerald-700 group-hover:underline">
                  Read full article →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}