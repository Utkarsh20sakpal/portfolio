"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap, Code2, Cpu } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function About() {
    return (
        <SectionWrapper id="about" className="bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                        <p>
                            I am currently pursuing a Bachelor of Engineering in <span className="text-primary font-semibold">Electronics and Telecommunication</span> at Atharva College of Engineering.
                        </p>
                        <p>
                            I am passionate about full stack development using the <span className="text-secondary font-semibold">MERN stack</span> and enjoy solving algorithmic problems. My interests lie at the intersection of web technologies and hardware systems.
                        </p>
                        <p>
                            I love building practical projects that solve real-world problems, ranging from hyperlocal platforms to industrial predictive maintenance systems.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div className="glass-card p-4 flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Education</h4>
                                    <p className="text-xs text-foreground/50">3rd Year EXTC</p>
                                </div>
                            </div>
                            <div className="glass-card p-4 flex items-center gap-4">
                                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                                    <Cpu size={24} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-outfit font-bold">Interests</h4>
                                    <p className="text-xs text-foreground/50">Web Dev, Programming & Problem Solving</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative glass-card p-8 md:p-12 flex flex-col items-center text-center space-y-6 border-white/20">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                                <Download size={40} />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit">My Curriculum Vitae</h3>
                            <p className="text-foreground/60 text-sm">
                                Want to know more about my professional background and academic achievements? Download my resume here.
                            </p>
                            <a
                                href="/resume.pdf"
                                className="btn-primary w-full flex items-center justify-center gap-2 group"
                                download
                            >
                                Download Resume
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Download size={18} />
                                </motion.div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
