"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function EasterEggHint() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative inline-flex items-center gap-2 cursor-default select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block", lineHeight: 1 }}
            >
                ⚽
            </motion.span>
            <span className="text-[11px] text-foreground/30 font-mono tracking-widest uppercase">
                Hidden celebration inside...
            </span>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
                    >
                        <div
                            className="px-4 py-3 rounded-xl text-xs font-mono text-center whitespace-nowrap"
                            style={{
                                background: "rgba(10,15,35,0.95)",
                                border: "1px solid rgba(100,140,255,0.4)",
                                boxShadow: "0 0 24px rgba(80,120,255,0.25)",
                                backdropFilter: "blur(12px)",
                                color: "rgba(160,190,255,0.9)",
                                lineHeight: 1.6,
                            }}
                        >
                            <span style={{ color: "#7AADFF", fontWeight: 700 }}>⚡ Tip:</span>{" "}
                            Press{" "}
                            <kbd style={{ background: "rgba(100,140,255,0.2)", padding: "1px 5px", borderRadius: "4px" }}>R</kbd>
                            {" "}+{" "}
                            <kbd style={{ background: "rgba(100,140,255,0.2)", padding: "1px 5px", borderRadius: "4px" }}>7</kbd>
                            {" "}or type something football fans love 🔮
                            <div style={{
                                position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%)",
                                width: "10px", height: "10px",
                                background: "rgba(10,15,35,0.95)",
                                borderRight: "1px solid rgba(100,140,255,0.4)",
                                borderBottom: "1px solid rgba(100,140,255,0.4)",
                                rotate: "45deg",
                            }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 mt-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Main row: 3-column grid so centre is truly centred ── */}
                <div className="py-10 grid grid-cols-3 items-center">
                    {/* Left: Logo */}
                    <div className="text-2xl font-outfit font-bold tracking-tighter">
                        <span className="text-primary">U</span>S.
                    </div>

                    {/* Centre: Copyright */}
                    <p className="text-foreground/40 text-sm text-center">
                        © {currentYear === 2026 ? "2026" : `2026 – ${currentYear}`} Utkarsh Kishor Sakpal. All rights reserved.
                    </p>

                    {/* Right: Nav links */}
                    <div className="flex gap-6 text-sm text-foreground/60 justify-end">
                        <a href="#hero" className="hover:text-primary transition-colors">Home</a>
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
                    </div>
                </div>

                {/* ── Bottom row: fully centred ── */}
                <div className="py-6 border-t border-white/[0.04] flex flex-col items-center gap-3">
                    <p className="text-[10px] text-foreground/20 uppercase tracking-[0.3em]">
                        Designed &amp; Built with Passion
                    </p>
                    <EasterEggHint />
                </div>

            </div>
        </footer>
    );
}
