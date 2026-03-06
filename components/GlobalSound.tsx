"use client";
import { useEffect, useRef } from "react";
import { soundManager } from "@/lib/sound";

export default function GlobalSound() {
    const lastScrollY = useRef(0);
    const lastHoveredElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!soundManager) return;

        const handleInteraction = () => {
            soundManager?.init();
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                soundManager?.playClick();
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Filter out elements to play sound on hover
            const hoverTarget = target.closest('a, button, .glass-card, .btn-primary, .btn-outline') as HTMLElement;

            if (hoverTarget && hoverTarget !== lastHoveredElement.current) {
                lastHoveredElement.current = hoverTarget;
                soundManager?.playHover();
            } else if (!hoverTarget) {
                lastHoveredElement.current = null;
            }
        };

        // Scroll ticks
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY.current) > 150) {
                lastScrollY.current = currentScrollY;
                soundManager?.playScrollStep();
            }
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
}
