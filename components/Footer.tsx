"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const SERVICE_LINKS = ["Consulting IA", "Automatisation", "RAG & Chatbots", "Intégration API"];
const COMPANY_LINKS = ["À propos", "Équipe", "Carrières", "Blog IA"];

export default function Footer() {
  return (
    <footer className="relative py-12 px-6" style={{ background: "#050505", borderTop: "1px solid rgba(6,182,212,0.1)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 border border-cyan-400 rotate-45" style={{ boxShadow: "0 0 8px #06b6d4" }} />
                <Cpu className="absolute inset-0.5 w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "var(--font-grotesk)" }}>
                ESN<span style={{ color: "#06b6d4" }}>AI</span>
                <span className="text-xs text-gray-500 font-normal ml-1">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              ESN spécialisée en IA. Nous automatisons vos processus et transformons vos opérations avec des solutions intelligentes sur mesure.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs text-gray-500 tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-grotesk)" }}>Services</div>
            <div className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <Link key={link} href="/services" className="block text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "var(--font-inter)" }}>
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs text-gray-500 tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-grotesk)" }}>Entreprise</div>
            <div className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <a key={link} href="#" className="block text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "var(--font-inter)" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>
            © 2026 NEXUS AI · Tous droits réservés
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Confidentialité", "CGU", "Mentions légales"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500" style={{ fontFamily: "var(--font-grotesk)" }}>Systèmes opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
