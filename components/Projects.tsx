"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { soundManager } from "@/lib/sound";

const projects = [
    {
        title: "AasPaas",
        description: "A hyperlocal platform that allows Indian street food vendors to share surplus or expiring raw materials with nearby vendors within a 5km radius.",
        longDescription: "AasPaas aims to reduce food waste by connecting local vendors. Built with React and Node.js, it features a real-time matching system based on geolocation, secure vendor authentication, and a scalable MongoDB backend.",
        tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
        github: "https://github.com/Utkarsh20sakpal/Aaspas",
        live: "https://incandescent-hamster-f0e87d.netlify.app/",
        color: "from-blue-500/20 to-cyan-500/20",
        image: "/projects/lazarev.png"
    },
    {
        title: "PixelBin",
        description: "A MERN stack platform designed for smart waste management using IoT enabled bins.",
        longDescription: "Smart waste management made simple. PixelBin integrates with IoT sensors to monitor bin fill-levels in real-time, providing actionable dashboards for waste collectors and administrators to optimize routes.",
        tech: ["MERN", "IoT", "Dashboard", "Chart.js"],
        github: "https://github.com/Utkarsh20sakpal/sih",
        live: "https://pixbin-v1-utkarsh.onrender.com/",
        color: "from-purple-500/20 to-pink-500/20",
        image: "/projects/shield.png"
    },
    {
        title: "Shield IoT",
        description: "Industrial predictive maintenance system that monitors machine health using IoT sensor data.",
        longDescription: "Shield IoT helps factories transition to predictive maintenance. It streams real-time data from industrial sensors and runs data analysis models to predict failures before they happen, saving downtime cots.",
        tech: ["IoT", "Data Analysis", "Predictive", "Next.js", "Python API"],
        github: "https://github.com/Utkarsh20sakpal/shield-version1.5",
        live: "https://shield-version1-5.onrender.com/",
        color: "from-green-500/20 to-emerald-500/20",
        image: "/projects/pixelbin.png"
    },
    {
        title: "Lazarev Clone",
        description: "Pixel perfect clone inspired by the Lazarev design agency website with GSAP animations.",
        longDescription: "A frontend masterclass project. This pixel-perfect clone faithfully recreates the complex scroll-triggered animations and layout of the award-winning Lazarev agency using advanced GSAP timelines.",
        tech: ["GSAP", "React", "Frontend", "Tailwind"],
        github: "https://github.com/Utkarsh20sakpal/lazarev-clone",
        live: "https://utkarsh-lazrev-clone.netlify.app/",
        color: "from-orange-500/20 to-red-500/20",
        image: "/projects/aaspaas.png"
    },
];

type ProjectType = typeof projects[0];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    const openProject = (project: ProjectType) => {
        if (soundManager) soundManager.playOpen();
        setSelectedProject(project);
    };

    const closeProject = () => {
        if (soundManager) soundManager.playClose();
        setSelectedProject(null);
    };

    return (
        <SectionWrapper id="projects" className="bg-white/[0.01]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            whileHover={{ y: -10 }}
                            onClick={() => openProject(project)}
                            className="group relative glass-card overflow-hidden border-white/5 flex flex-col h-full cursor-pointer hover:border-primary/50 transition-colors duration-500"
                        >
                            {/* Project Image Placeholder / Gradient Overlay */}
                            <div className={`h-64 md:h-72 w-full bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center p-4`}>
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        alt={project.title}
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
                                        <h3 className="relative text-2xl font-bold font-outfit text-white/50">{project.title}</h3>
                                    </>
                                )}
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.slice(0, 3).map((t) => (
                                        <span key={t} className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-1 bg-primary/10 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-outfit group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-foreground/60 text-sm mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="mt-auto text-primary font-bold text-sm flex items-center gap-2">
                                    Explore Case Study <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Animated Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeProject}
                                className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm cursor-pointer"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none"
                            >
                                <div className="w-full max-w-4xl bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto max-h-[90vh]">

                                    {/* Left side Image */}
                                    <div className={`w-full md:w-1/2 relative bg-gradient-to-br ${selectedProject.color} min-h-[250px] md:min-h-[400px]`}>
                                        {selectedProject.image ? (
                                            <Image
                                                src={selectedProject.image}
                                                fill
                                                alt={selectedProject.title}
                                                className="object-contain p-8 w-full h-full"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <h3 className="text-3xl font-bold font-outfit text-white/50">{selectedProject.title}</h3>
                                            </div>
                                        )}
                                        <button
                                            onClick={closeProject}
                                            className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors md:hidden"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Right side content */}
                                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                                        <div className="flex justify-between items-start mb-6 hidden md:flex">
                                            <h3 className="text-3xl font-outfit font-bold">{selectedProject.title}</h3>
                                            <button
                                                onClick={closeProject}
                                                className="p-2 text-white/50 hover:text-white transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                        <h3 className="text-3xl font-outfit font-bold mb-6 md:hidden">{selectedProject.title}</h3>

                                        <p className="text-white/70 text-base leading-relaxed mb-8 flex-grow">
                                            {selectedProject.longDescription}
                                        </p>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map((t) => (
                                                    <span key={t} className="text-xs font-bold text-white/80 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-auto pt-6 border-t border-white/10">
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                className="flex-1 btn-outline flex items-center justify-center gap-2"
                                            >
                                                <Github size={18} />
                                                Source
                                            </a>
                                            <a
                                                href={selectedProject.live}
                                                target="_blank"
                                                className="flex-1 btn-primary flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink size={18} />
                                                Live URL
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
