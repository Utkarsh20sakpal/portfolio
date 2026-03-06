"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import {
    FaJava, FaReact, FaNodeJs, FaGitAlt, FaGithub
} from "react-icons/fa";
import {
    SiJavascript, SiCplusplus, SiC, SiExpress, SiMongodb,
    SiPostman, SiArduino
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Code2, Cpu, Wrench, Globe, Lightbulb } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface SkillItem {
    name: string;
    icon: React.ReactNode;
    level: number;
}

const row1: SkillItem[] = [
    { name: "Java", icon: <FaJava className="text-[#007396]" />, level: 85 },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, level: 90 },
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, level: 80 },
    { name: "C", icon: <SiC className="text-[#A8B9CC]" />, level: 75 },
    { name: "React.js", icon: <FaReact className="text-[#61DAFB]" />, level: 85 },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, level: 80 },
    { name: "Express.js", icon: <SiExpress className="text-white" />, level: 75 },
];

const row2: SkillItem[] = [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, level: 80 },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" />, level: 85 },
    { name: "GitHub", icon: <FaGithub className="text-white" />, level: 90 },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" />, level: 85 },
    { name: "VS Code", icon: <VscVscode className="text-[#007ACC]" />, level: 95 },
    { name: "Arduino", icon: <SiArduino className="text-[#00979D]" />, level: 70 },
    { name: "IoT Systems", icon: <Cpu className="text-green-400" />, level: 75 },
];

const row3: SkillItem[] = [
    { name: "Data Structures", icon: <Code2 className="text-blue-400" />, level: 85 },
    { name: "Algorithms", icon: <Lightbulb className="text-yellow-400" />, level: 80 },
    { name: "REST APIs", icon: <Globe className="text-purple-400" />, level: 85 },
    { name: "Auth Systems", icon: <Wrench className="text-red-400" />, level: 70 },
    { name: "Embedded Systems", icon: <Cpu className="text-orange-400" />, level: 75 },
    { name: "Sensors", icon: <Cpu className="text-teal-400" />, level: 80 },
];

const SkillCard = ({ item }: { item: SkillItem }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center gap-3 px-6 h-16 glass-card border-white/10 hover:border-primary/50 transition-colors group cursor-default overflow-hidden w-64"
        >
            {/* Primary content - Slides up on hover */}
            <motion.div
                initial={false}
                animate={{ y: isHovered ? -40 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-3"
            >
                <div className="text-3xl transition-transform duration-300">
                    {item.icon}
                </div>
                <span className="font-outfit font-bold text-lg text-white/80 transition-colors">
                    {item.name}
                </span>
            </motion.div>

            {/* Hidden content - Progress bar slides up on hover */}
            <motion.div
                initial={false}
                animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 w-full"
            >
                <div className="flex justify-between w-full mb-1">
                    <span className="text-xs font-bold text-white/90">{item.name}</span>
                    <span className="text-xs font-bold text-primary">{item.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? `${item.level}%` : 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                </div>
            </motion.div>
        </div>
    );
};

const SkillRow = ({ items, direction, scrollYProgress }: { items: SkillItem[], direction: number, scrollYProgress: MotionValue<number> }) => {
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 1 ? ["-20%", "20%"] : ["20%", "-20%"]
    );

    // Duplicate items to ensure smooth infinite effect during normal scroll
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <div className="flex overflow-hidden relative w-full items-center py-2 hover:pause-animation">
            <motion.div
                style={{ x }}
                className="flex gap-6 whitespace-nowrap min-w-max"
            >
                {duplicatedItems.map((item, idx) => (
                    <SkillCard key={idx} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <SectionWrapper id="skills" className="overflow-hidden">
            <div className="max-w-7xl mx-auto relative" ref={containerRef}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Technical Arsenal</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="flex flex-col gap-6 w-[150vw] -ml-[25vw]">
                    <SkillRow items={row1} direction={1} scrollYProgress={scrollYProgress} />
                    <SkillRow items={row2} direction={-1} scrollYProgress={scrollYProgress} />
                    <SkillRow items={row3} direction={1} scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </SectionWrapper>
    );
}
