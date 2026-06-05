"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
   { label: "Accueil",  href: "/" },
  
  { label: "Services", href: "/services" },
  { label: "Démos",    href: "/demos" },
  { label: "À propos", href: "/about" },
 
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(6,182,212,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 border border-cyan-400 rotate-45" style={{ boxShadow: "0 0 10px #06b6d4" }} />
            <Cpu className="absolute inset-1 w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "var(--font-grotesk)" }}>
            ESN<span style={{ color: "#06b6d4" }}>AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link key={link.href} href={link.href}
                className="text-sm tracking-widest uppercase relative group transition-colors duration-300"
                style={{ fontFamily: "var(--font-grotesk)", color: isActive ? "#06b6d4" : "#9ca3af" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "#06b6d4", width: isActive ? "100%" : "0" }} />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link href="/contact" className="hidden md:block">
          <motion.span
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-black tracking-widest uppercase cursor-pointer"
            style={{ background: "#06b6d4", fontFamily: "var(--font-grotesk)", clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
          >
            Démarrer <ArrowUpRight className="w-4 h-4" />
          </motion.span>
        </Link>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0, y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0, opacity: menuOpen && i === 1 ? 0 : 1 }}
              className="block w-5 h-px bg-cyan-400" />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div initial={false} animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
        <div className="flex flex-col gap-4 pt-4 pb-2 px-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-gray-400 hover:text-cyan-400 transition-colors"
              style={{ fontFamily: "var(--font-grotesk)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
