/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0b0f19",
                primary: "#4f8cff",
                secondary: "#7c3aed",
            },
            fontFamily: {
                inter: ["var(--font-inter)"],
                outfit: ["var(--font-outfit)"],
            },
            backdropBlur: {
                lg: "16px",
            },
        },
    },
    plugins: [],
}
