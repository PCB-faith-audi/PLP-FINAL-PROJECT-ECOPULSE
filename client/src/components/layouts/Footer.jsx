import React from "react";
import { Link } from "react-router-dom";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp, SiX } from "react-icons/si";
import { FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
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
    <footer className="mt-12 border-t border-emerald-100 bg-white dark:bg-emerald-950/60 dark:border-emerald-900/60 transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-emerald-800">EcoPulse</h3>
          <p className="mt-2 text-sm text-emerald-900/80">
            Track energy, understand carbon, and join projects that make impact.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-emerald-800">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-emerald-700 hover:underline">Home</Link></li>
            <li><Link to="/dashboard" className="text-emerald-700 hover:underline">Dashboard</Link></li>
            <li><Link to="/projects" className="text-emerald-700 hover:underline">Projects</Link></li>
            <li><Link to="/resources" className="text-emerald-700 hover:underline">Resources</Link></li>
            <li><Link to="/about" className="text-emerald-700 hover:underline">About</Link></li>
            <li><Link to="/contact" className="text-emerald-700 hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-emerald-800">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="mailto:support@ecopulse.app" className="text-emerald-700 hover:underline">support@ecopulse.app</a></li>
            <li><a href="tel:+1234567890" className="text-emerald-700 hover:underline">+1 (234) 567-890</a></li>
            <li><Link to="/contact" className="text-emerald-700 hover:underline">Feedback & Suggestions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-emerald-800">Follow</h4>
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
        </div>
      </div>
      <div className="border-t border-emerald-100 dark:border-emerald-900/60 py-4 text-center text-xs text-emerald-700 dark:text-emerald-200 transition-colors">
        © 2025 EcoPulse. All rights reserved.
      </div>
    </footer>
  );
}

