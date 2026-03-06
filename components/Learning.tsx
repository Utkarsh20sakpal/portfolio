"use client";

import { motion } from "framer-motion";
import { BookOpen, Rocket, BrainCircuit, Database } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const learningItems = [
    {
        title: "Advanced MERN Stack Development",
        icon: <Database className="text-primary" />,
        description: "Deep diving into complex backend architectures and optimized frontends.",
    },
    {
        title: "Data Structures & Algorithms",
        icon: <BrainCircuit className="text-secondary" />,
        description: "Mastering problem-solving patterns and competitive programming.",
    },
    {
        title: "Backend System Design",
        icon: <Rocket className="text-blue-400" />,
        description: "Learning scalable architecture, microservices, and system efficiency.",
    },
    {
        title: "Scalable Web Applications",
        icon: <BookOpen className="text-emerald-400" />,
        description: "Focusing on performance optimization and cloud deployments.",
    },
];

export default function Learning() {
    return (
        <SectionWrapper id="learning">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Currently Learning</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {learningItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            whileHover={{ scale: 1.05 }}
                            className="glass-card p-6 border-white/5 hover:bg-white/10 transition-all text-center flex flex-col items-center"
                        >
                            <div className="p-4 bg-white/5 rounded-2xl mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-bold mb-2 font-outfit">{item.title}</h3>
                            <p className="text-xs text-foreground/50 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
