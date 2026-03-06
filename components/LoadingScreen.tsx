"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 12) + 4;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => void setLoading(false), 500);
                    return 100;
                }
                return next;
            });
        }, 120);

        // Fail-safe timeout
        const timer = setTimeout(() => setLoading(false), 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0f19] pointer-events-none"
                >
                    <div className="flex flex-col items-center relative z-10">
                        {/* High-end rotating ring logo */}
                        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                            <motion.div
                                className="absolute inset-0 border-t-2 border-primary rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-2 border-b-2 border-secondary rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 border-r-2 border-white/50 rounded-full"
                                animate={{ rotate: 180 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                            <span className="font-outfit font-bold text-2xl tracking-tighter text-white">
                                US
                            </span>
                        </div>

                        {/* Progress Bar & Counter */}
                        <div className="w-64">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-white/50 font-mono text-xs tracking-[0.2em] uppercase">Booting System</span>
                                <span className="font-mono font-bold text-primary">{progress}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_#4f8cff]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.2 }}
                                />
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
