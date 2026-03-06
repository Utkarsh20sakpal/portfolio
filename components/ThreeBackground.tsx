"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Section types ─────────────────────────────────────────────────────────────
type Section = "hero" | "about" | "skills" | "projects" | "contact";

// ─── Shared scroll / mouse refs (module-level singletons) ────────────────────
const sharedMouse = { x: 0, y: 0 };
const sharedScroll = { fraction: 0 };

// ─── Core Particles Component ─────────────────────────────────────────────────
function Particles({ section, siuu }: { section: Section; siuu: boolean }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 100;

    // Stable random base positions in a wide volume
    const base = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
        }
        return pos;
    }, [COUNT]);

    // Mutable buffers – we lerp `current` toward `target` each frame
    const current = useMemo(() => new Float32Array(base), [base]);
    const target = useMemo(() => new Float32Array(base), [base]);

    // Blue-purple palette
    const colors = useMemo(() => {
        const col = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            const t = Math.random();
            col[i * 3] = 0.25 + t * 0.35;   // R
            col[i * 3 + 1] = 0.35 + t * 0.15;   // G
            col[i * 3 + 2] = 1.0;                // B full
        }
        return col;
    }, [COUNT]);

    const siuuRef = useRef(false);
    const siuuTimer = useRef(0);

    // -- Recompute targets when section changes --------------------------------
    useEffect(() => {
        for (let i = 0; i < COUNT; i++) {
            const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
            let tx = bx, ty = by, tz = bz;

            switch (section) {
                case "about": {
                    // Flowing sine wave stretched across screen
                    const t = i / COUNT;
                    tx = (t - 0.5) * 14;
                    ty = Math.sin(t * Math.PI * 3.5) * 2.5 + Math.sin(t * Math.PI * 7) * 0.8;
                    tz = bz * 0.4;
                    break;
                }
                case "skills": {
                    // Fibonacci sphere lattice – elegant orbital feel
                    const phi = Math.acos(1 - (2 * i) / COUNT);
                    const theta = Math.sqrt(COUNT * Math.PI) * phi;
                    const r = 4.5;
                    tx = r * Math.sin(phi) * Math.cos(theta);
                    ty = r * Math.sin(phi) * Math.sin(theta);
                    tz = r * Math.cos(phi);
                    break;
                }
                case "projects": {
                    // Spread into deep 3-D space
                    tx = bx * 1.6;
                    ty = by * 0.7;
                    tz = bz * 2.2 - 4;
                    break;
                }
                case "contact": {
                    // Distant starfield
                    tx = bx * 2.8;
                    ty = by * 2.8;
                    tz = bz * 3.5 - 10;
                    break;
                }
                default:
                    tx = bx; ty = by; tz = bz;  // hero – natural float
            }

            target[i * 3] = tx;
            target[i * 3 + 1] = ty;
            target[i * 3 + 2] = tz;
        }
    }, [section, base, target, COUNT]);

    // -- Activate siuu Easter egg ----------------------------------------------
    useEffect(() => {
        siuuRef.current = siuu;
        if (siuu) siuuTimer.current = 0;
    }, [siuu]);

    // -- Per-frame animation ---------------------------------------------------
    useFrame((_, delta) => {
        if (!pointsRef.current) return;
        const pt = pointsRef.current;
        const posAttr = pt.geometry.attributes.position as THREE.BufferAttribute;

        if (siuuRef.current) {
            siuuTimer.current += delta;
            const prog = Math.min(siuuTimer.current / 0.9, 1);
            const returnProg = siuuTimer.current > 1.6
                ? Math.min((siuuTimer.current - 1.6) / 0.8, 1)
                : 0;

            for (let i = 0; i < COUNT; i++) {
                // Burst into outward circle then spiral
                const angle = (i / COUNT) * Math.PI * 2 + siuuTimer.current * 2;
                const radius = 4 * prog * (1 - returnProg * 0.7);
                const swirl = siuuTimer.current * 1.5;
                const tx = Math.cos(angle + swirl) * radius;
                const ty = Math.sin(angle + swirl) * radius * 0.6;
                const tz = Math.sin(angle * 2) * radius * 0.4;

                // If returning, lerp back toward section target
                const bx = returnProg > 0 ? target[i * 3] : tx;
                const by = returnProg > 0 ? target[i * 3 + 1] : ty;
                const bz = returnProg > 0 ? target[i * 3 + 2] : tz;

                current[i * 3] += ((returnProg > 0 ? bx : tx) - current[i * 3]) * delta * 6;
                current[i * 3 + 1] += ((returnProg > 0 ? by : ty) - current[i * 3 + 1]) * delta * 6;
                current[i * 3 + 2] += ((returnProg > 0 ? bz : tz) - current[i * 3 + 2]) * delta * 6;
            }

            if (siuuTimer.current > 2.4) siuuRef.current = false;

        } else {
            // Normal lerp toward section target
            const spd = 1.2;
            for (let i = 0; i < COUNT; i++) {
                current[i * 3] += (target[i * 3] - current[i * 3]) * delta * spd;
                current[i * 3 + 1] += (target[i * 3 + 1] - current[i * 3 + 1]) * delta * spd;
                current[i * 3 + 2] += (target[i * 3 + 2] - current[i * 3 + 2]) * delta * spd;
            }
        }

        posAttr.array = current;
        posAttr.needsUpdate = true;

        // Section-specific rotation + gentle mouse parallax
        const mx = sharedMouse.x, my = sharedMouse.y;
        if (section === "skills") {
            pt.rotation.y += delta * 0.10;
            pt.rotation.x += delta * 0.025;
        } else if (section === "projects") {
            pt.rotation.z += delta * 0.05;
            pt.rotation.y += delta * 0.04;
        } else {
            pt.rotation.y += delta * 0.03;
        }
        pt.position.x += (mx * 0.4 - pt.position.x) * delta * 1.2;
        pt.position.y += (my * 0.3 - pt.position.y) * delta * 1.2;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={COUNT} args={[current, 3]} />
                <bufferAttribute attach="attributes-color" count={COUNT} args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.065}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ─── Section detector ─────────────────────────────────────────────────────────
function useActiveSection(): Section {
    const [section, setSection] = useState<Section>("hero");
    useEffect(() => {
        const ids: Section[] = ["hero", "about", "skills", "projects", "contact"];
        const obs = ids.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const o = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setSection(id); },
                { threshold: 0.25 }
            );
            o.observe(el);
            return o;
        });
        return () => obs.forEach(o => o?.disconnect());
    }, []);
    return section;
}

// ─── Global mouse + scroll listeners (set up once) ───────────────────────────
function useGlobalListeners() {
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            sharedMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            sharedMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            sharedScroll.fraction = max > 0 ? window.scrollY / max : 0;
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
}

// ─── Easter egg key detection ─────────────────────────────────────────────────
function useSiuuEasterEgg(onTrigger: () => void) {
    useEffect(() => {
        let typed = "";
        const held = new Set<string>();
        const trigger = () => { onTrigger(); typed = ""; held.clear(); };

        const onDown = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();
            held.add(k);
            if (held.has("r") && k === "7") { trigger(); return; }

            typed += e.key.toUpperCase();
            if (typed.length > 8) typed = typed.slice(-8);
            if (typed.includes("SIUU")) trigger();
        };
        const onUp = (e: KeyboardEvent) => held.delete(e.key.toLowerCase());

        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
        };
    }, [onTrigger]);
}

// ─── Synthetic SIUU celebration sound (Web Audio API – no file needed) ────────
function playCelebrationSound() {
    try {
        const ctx = new AudioContext();
        const notes = [440, 554, 659, 880, 1108]; // A4 C#5 E5 A5 C#6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            const t = ctx.currentTime + i * 0.1;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
            osc.start(t);
            osc.stop(t + 0.5);
        });
        // Crowd-cheer shimmer: filtered noise burst
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let j = 0; j < data.length; j++) data[j] = (Math.random() * 2 - 1) * 0.08;
        const noise = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const ng = ctx.createGain();
        filter.type = "bandpass";
        filter.frequency.value = 3200;
        filter.Q.value = 0.6;
        noise.buffer = buf;
        noise.connect(filter);
        filter.connect(ng);
        ng.connect(ctx.destination);
        ng.gain.setValueAtTime(0.18, ctx.currentTime + 0.3);
        ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        noise.start(ctx.currentTime + 0.3);
    } catch (_) { /* silently fail – AudioContext may be blocked */ }
}

// ─── Flash overlay ────────────────────────────────────────────────────────────
function FlashOverlay({ visible }: { visible: boolean }) {
    return (
        <div
            style={{
                position: "fixed", inset: 0,
                pointerEvents: "none", zIndex: 9990,
                background: "radial-gradient(ellipse at center, rgba(100,140,255,0.18) 0%, transparent 70%)",
                opacity: visible ? 1 : 0,
                transition: visible ? "opacity 0.1s ease" : "opacity 0.6s ease",
            }}
        />
    );
}

// ─── Ronaldo celebration overlay ──────────────────────────────────────────────
function CelebrationOverlay({ visible, onEnd }: { visible: boolean; onEnd: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Play from start every time it becomes visible
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;
        if (visible) {
            vid.currentTime = 0;
            vid.volume = 0.75;
            vid.play().catch(() => {/* autoplay may need user gesture – silently ignore */ });
        } else {
            vid.pause();
            vid.currentTime = 0;
        }
    }, [visible]);

    return (
        <div
            style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.75})`,
                opacity: visible ? 1 : 0,
                transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                pointerEvents: "none",
                zIndex: 9995,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
            }}
        >
            {/* Glass card */}
            <div style={{
                background: "rgba(8,12,30,0.92)",
                border: "1px solid rgba(100,140,255,0.45)",
                borderRadius: "24px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 0 80px rgba(80,120,255,0.4), 0 0 20px rgba(80,120,255,0.2)",
                backdropFilter: "blur(18px)",
                overflow: "hidden",
                maxWidth: "340px",
                width: "90vw",
            }}>
                {/* Header */}
                <div style={{
                    fontSize: "11px", letterSpacing: "0.25em",
                    color: "rgba(140,170,255,0.55)", fontFamily: "monospace",
                    marginBottom: "12px", textTransform: "uppercase",
                }}>
                    🐐 CR7 Easter Egg Found!
                </div>

                {/* Video – autoplays like a GIF, with sound */}
                <div style={{
                    borderRadius: "16px", overflow: "hidden",
                    border: "1px solid rgba(100,140,255,0.25)",
                    boxShadow: "0 0 30px rgba(80,120,255,0.3)",
                    lineHeight: 0,
                }}>
                    <video
                        ref={videoRef}
                        src="/siuu.mp4"
                        playsInline
                        onEnded={onEnd}
                        style={{ width: "100%", display: "block", borderRadius: "15px" }}
                    />
                </div>

                {/* SIUUU text */}
                <div style={{
                    fontSize: "32px", fontWeight: 900,
                    letterSpacing: "0.35em",
                    background: "linear-gradient(135deg, #7AADFF 0%, #C084FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginTop: "14px",
                    fontFamily: "system-ui, sans-serif",
                }}>
                    SIUUU!
                </div>

                {/* Bouncing dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginTop: "12px" }}>
                    {["#7AADFF", "#C084FC", "#7AADFF", "#C084FC", "#7AADFF"].map((c, i) => (
                        <div key={i} style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: c, opacity: 0.8,
                            animation: `bounce-dot 0.6s ${i * 0.1}s infinite alternate`,
                        }} />
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes bounce-dot {
                    from { transform: translateY(0); }
                    to   { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
}


// ─── Default export ───────────────────────────────────────────────────────────
export default function ThreeBackground() {
    const [mounted, setMounted] = useState(false);
    const [siuu, setSiuu] = useState(false);
    const [flash, setFlash] = useState(false);
    const section = useActiveSection();

    useGlobalListeners();

    const handleVideoEnd = useCallback(() => {
        setSiuu(false);
    }, []);

    const triggerSiuu = useCallback(() => {
        setSiuu(true);
        setFlash(true);
        playCelebrationSound();
        setTimeout(() => setFlash(false), 300);
        // No fixed timeout — overlay closes when the video ends naturally
    }, []);

    useSiuuEasterEgg(triggerSiuu);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return <div className="fixed inset-0 -z-10 pointer-events-none bg-[#0b0f19]" />;

    return (
        <>
            {/* ── Canvas background ── */}
            <div className="fixed inset-0 -z-10 pointer-events-none bg-[#0b0f19]">
                {/* Atmospheric ambient glow */}
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(79,140,255,0.09) 0%, transparent 70%)",
                }} />
                <Canvas
                    camera={{ position: [0, 0, 9], fov: 48 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                    frameloop="always"
                >
                    <fog attach="fog" args={["#0b0f19", 12, 30]} />
                    <Particles section={section} siuu={siuu} />
                </Canvas>
            </div>

            {/* ── Easter egg overlays ── */}
            <FlashOverlay visible={flash} />
            <CelebrationOverlay visible={siuu} onEnd={handleVideoEnd} />
        </>
    );
}
