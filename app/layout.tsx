import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import GlobalSound from "@/components/GlobalSound";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
    title: "Utkarsh Sakpal | Developer Portfolio",
    description: "Electronics & Telecommunication Engineering Student | MERN Stack Developer | Problem Solver",
    keywords: ["Utkarsh Sakpal", "Portfolio", "MERN Stack", "Developer", "DSA", "Next.js"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <body
                className={cn(
                    inter.variable,
                    outfit.variable,
                    "font-inter min-h-screen bg-background text-foreground cursor-none"
                )}
                suppressHydrationWarning
            >
                <Cursor />
                <GlobalSound />
                {children}
            </body>
        </html>
    );
}
