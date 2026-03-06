"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, Phone } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;

        try {
            const formData = new FormData(form);
            const response = await fetch("https://formsubmit.co/ajax/utkarshsakpal2005@gmail.com", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <SectionWrapper id="contact">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Let&apos;s Connect</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-card p-8 border-white/5 space-y-8">
                            <h3 className="text-2xl font-bold font-outfit">Contact Information</h3>
                            <p className="text-foreground/60">
                                I&apos;m currently open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:utkarshsakpal2005@gmail.com" className="flex items-center gap-4 group">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/40 font-mono uppercase tracking-widest">Email</p>
                                        <p className="font-bold group-hover:text-primary transition-colors">utkarshsakpal2005@gmail.com</p>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/utkarsh-sakpal-911973250" target="_blank" className="flex items-center gap-4 group">
                                    <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                        <Linkedin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/40 font-mono uppercase tracking-widest">LinkedIn</p>
                                        <p className="font-bold group-hover:text-blue-500 transition-colors">Utkarsh Sakpal</p>
                                    </div>
                                </a>

                                <a href="https://github.com/Utkarsh20sakpal" target="_blank" className="flex items-center gap-4 group">
                                    <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:bg-white group-hover:text-black transition-all">
                                        <Github size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/40 font-mono uppercase tracking-widest">GitHub</p>
                                        <p className="font-bold group-hover:text-white transition-colors">Utkarsh20sakpal</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form className="glass-card p-8 md:p-10 border-white/5 space-y-6" onSubmit={handleSubmit}>
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_subject" value="New submission from Portfolio!" />
                            <input type="hidden" name="_captcha" value="false" />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/70 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/70 ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/70 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                />
                            </div>

                            {status === "success" && (
                                <p className="text-green-500 text-sm font-medium text-center bg-green-500/10 py-3 rounded-xl border border-green-500/20">
                                    Thanks for reaching out! I'll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                                    Failed to send message. Please try again later.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className={`btn-primary w-full py-5 flex items-center justify-center gap-2 group ${status === "submitting" ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {status === "submitting" ? "Sending..." : "Send Message"}
                                <Send size={18} className={`transition-transform ${status === "submitting" ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
