"use client";

import { useRef } from "react";
import { Github, FileText, Send } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial load animation timeline
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Avatar entrance
        tl.fromTo(
            avatarRef.current,
            { opacity: 0, scale: 0.8, rotation: -10 },
            { opacity: 1, scale: 1, rotation: 0, duration: 1.2 }
        );

        // Text elements stagger entrance
        tl.fromTo(
            gsap.utils.toArray(".hero-text-element"),
            { opacity: 0, y: 50, skewY: 5 },
            { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15 },
            "-=0.9" // start earlier to overlap with avatar animation
        );

        // Continuous floating animations for icons
        gsap.to(".floating-icon-1", {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(".floating-icon-2", {
            y: 15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });

        gsap.to(".floating-code-1", {
            y: -20,
            x: 10,
            rotation: 5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".floating-code-2", {
            y: 20,
            x: -10,
            rotation: -5,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });

        // Scroll Parallax Effect
        gsap.to(avatarRef.current, {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        gsap.to(textRef.current, {
            yPercent: 60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }, { scope: container });

    return (
        <section ref={container} id="hero" className="min-h-screen flex items-center justify-center pt-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
                {/* Left Side - Avatar */}
                <div ref={avatarRef} className="relative group flex justify-center md:justify-start">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Glow Background */}
                        <div className="absolute inset-0 bg-[#4f8cff]/20 rounded-3xl blur-3xl group-hover:bg-[#4f8cff]/40 transition-all duration-700" />

                        {/* Avatar Container */}
                        <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center group-hover:border-[#4f8cff]/50 transition-all duration-500 shadow-2xl">
                            <Image
                                src="/avatar.png"
                                alt="CR7 Inspired Developer Avatar"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Floating Elements */}
                        <div className="floating-icon-1 absolute -top-4 -right-4 p-4 glass-card shadow-xl z-20">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <div className="floating-icon-2 absolute -bottom-4 -left-4 p-4 glass-card shadow-xl z-20">
                            <span className="text-2xl">💻</span>
                        </div>

                        {/* Floating Code Snippets */}
                        <div className="floating-code-1 absolute top-10 -left-16 md:-left-24 p-2 glass-card border-primary/20 shadow-[0_0_15px_rgba(79,140,255,0.2)] text-xs font-mono text-white/50 z-10 hidden sm:block">
                            <span className="text-pink-400">const</span> <span className="text-blue-400">dev</span> = <span className="text-green-400">&apos;Utkarsh&apos;</span>;
                        </div>
                        <div className="floating-code-2 absolute bottom-20 -right-16 md:-right-24 p-2 glass-card border-secondary/20 shadow-[0_0_15px_rgba(124,58,237,0.2)] text-xs font-mono text-white/50 z-10 hidden sm:block">
                            &lt;<span className="text-purple-400">System</span> <span className="text-blue-300">status</span>=<span className="text-green-400">&quot;online&quot;</span> /&gt;
                        </div>
                    </div>
                </div>

                {/* Right Side - Text */}
                <div ref={textRef} className="text-center md:text-left">
                    <div className="hero-text-element">
                        <h2 className="text-[#4f8cff] font-mono font-medium mb-4 tracking-[0.2em] text-sm uppercase">
                            Welcome to my world
                        </h2>
                    </div>
                    <div className="hero-text-element">
                        <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6 leading-tight tracking-tight min-h-[140px] md:min-h-[180px]">
                            Hi, I&apos;m <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f8cff] to-[#7c3aed] drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                                Utkarsh Sakpal
                            </span>
                        </h1>
                    </div>

                    <div className="hero-text-element space-y-4 mb-8">
                        <p className="text-xl md:text-2xl text-white font-medium">
                            Electronics & Telecommunication Engineering Student
                        </p>
                        <p className="text-white/60 text-base md:text-lg">
                            MERN Stack Developer (Learning) | Problem Solver | DSA Enthusiast
                        </p>
                        <p className="text-white/70 italic max-w-lg leading-relaxed border-l-2 border-[#4f8cff]/50 pl-4 mx-auto md:mx-0">
                            &quot;I enjoy building real-world systems using modern web technologies and embedded electronics.&quot;
                        </p>
                    </div>

                    <div className="hero-text-element flex flex-wrap gap-4 justify-center md:justify-start">
                        <a href="#projects" className="btn-primary group">
                            View Projects
                            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </a>
                        <a href="/resume.pdf" className="btn-outline flex items-center gap-2 group">
                            <FileText size={18} className="group-hover:scale-110 transition-transform" />
                            Resume
                        </a>
                        <div className="flex gap-4 items-center ml-2">
                            <a href="https://github.com/Utkarsh20sakpal" target="_blank" className="p-3 glass-card hover:text-[#4f8cff] transition-colors group">
                                <Github size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="mailto:utkarshsakpal2005@gmail.com" className="p-3 glass-card hover:text-[#4f8cff] transition-colors group">
                                <Send size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </div>
        </section>
    ); // Close section
}
