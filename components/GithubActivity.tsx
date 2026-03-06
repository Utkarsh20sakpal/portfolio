"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function GithubActivity() {
    return (
        <SectionWrapper id="github" className="bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Code Contributions</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="glass-card p-6 md:p-10 border-white/10 flex flex-col items-center">
                    <div className="flex justify-center flex-col items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://ghchart.rshah.org/4f8cff/Utkarsh20sakpal"
                            alt="Utkarsh's GitHub Contributions"
                            className="w-full max-w-3xl opacity-80 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        />
                        <p className="text-foreground/50 text-sm font-mono mt-4">
                            Last fetched from GitHub API
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col items-center text-center">
                        <p className="text-foreground/60 mb-6 max-w-lg">
                            Check out my GitHub profile to see more of my open-source contributions and personal projects.
                        </p>
                        <a
                            href="https://github.com/Utkarsh20sakpal"
                            target="_blank"
                            className="btn-outline flex items-center gap-2"
                        >
                            <Github size={20} />
                            Follow on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
