import React, { useState } from "react";
import { pickAsset } from "../components/AssetPicker.js";
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp, SiX } from "react-icons/si";

export default function Contact() {
  const hero = pickAsset(["contact", "support", "help", "talk", "message", "nature", "forest"]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "feedback", // feedback | bug | suggestion
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", msg: "" });
    try {
      // Try optional backend endpoint; gracefully fall back if not available.
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => null);

      if (!res || !res.ok) {
        // Fallback: mailto link open with prefilled content
        const mail = new URL(`mailto:support@ecopulse.app`);
        mail.searchParams.set("subject", `[${form.category.toUpperCase()}] ${form.subject || "EcoPulse message"}`);
        mail.searchParams.set("body", `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.location.href = mail.toString();
      }

      setStatus({ state: "success", msg: "Thanks! We received your message." });
      setForm({ name: "", email: "", category: "feedback", subject: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", msg: "Something went wrong. Please try again." });
    }
  };

  const socials = [
    { href: "https://facebook.com/EcoPulse", label: "Facebook", Icon: SiFacebook },
    { href: "https://x.com/EcoPulse", label: "X (Twitter)", Icon: SiX },
    { href: "https://instagram.com/EcoPulse", label: "Instagram", Icon: SiInstagram },
    { href: "https://tiktok.com/@EcoPulse", label: "TikTok", Icon: SiTiktok },
    { href: "https://wa.me/1234567890", label: "WhatsApp", Icon: SiWhatsapp },
    { href: "mailto:support@ecopulse.app", label: "Email", Icon: FiMail },
    { href: "tel:+1234567890", label: "Telephone", Icon: FiPhone },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-3xl overflow-hidden border border-emerald-100 bg-white">
        <div className="relative h-48 sm:h-56">
          {hero ? (
            <img src={hero} alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 hero-gradient" />
          )}
          <div className="absolute inset-0 bg-emerald-900/45" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-3xl font-extrabold text-white">Contact & Feedback</h1>
            <p className="mt-2 text-emerald-50 text-sm">
              Reach out, report a bug, or suggest an idea. We’d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-emerald-100 p-6">
          <h2 className="text-lg font-bold text-emerald-900 mb-4">Send a message</h2>
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-emerald-800 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full rounded-md border border-emerald-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Jane Doe"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-emerald-800 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full rounded-md border border-emerald-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="jane@example.com"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-emerald-800 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full rounded-md border border-emerald-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="feedback">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-emerald-800 mb-1">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full rounded-md border border-emerald-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="How can we help?"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-emerald-800 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                required
                className="w-full rounded-md border border-emerald-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                placeholder="Share details about your request or idea…"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={status.state === "submitting"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
              >
                <FiSend className="w-4 h-4" />
                {status.state === "submitting" ? "Sending..." : "Send"}
              </button>
              {status.state === "success" && (
                <span className="inline-flex items-center gap-2 text-emerald-700 text-sm">
                  <FiCheckCircle className="w-4 h-4" /> {status.msg}
                </span>
              )}
              {status.state === "error" && (
                <span className="inline-flex items-center gap-2 text-red-600 text-sm">
                  <FiAlertCircle className="w-4 h-4" /> {status.msg}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="rounded-3xl bg-white border border-emerald-100 p-6">
          <h3 className="text-lg font-bold text-emerald-900">Other ways to reach us</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiMail className="w-4 h-4 text-emerald-700" />
              <a href="mailto:support@ecopulse.app" className="text-emerald-700 hover:underline">
                support@ecopulse.app
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="w-4 h-4 text-emerald-700" />
              <a href="tel:+1234567890" className="text-emerald-700 hover:underline">
                +1 (234) 567-890
              </a>
            </li>
          </ul>

          <h4 className="mt-6 text-sm font-semibold text-emerald-800">Social</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                title={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-900/80">
            Tip: For urgent issues, include screenshots and steps to reproduce in your message.
          </div>
        </aside>
      </section>
    </div>
  );
}