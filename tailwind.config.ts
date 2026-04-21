import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1c1c",
        "ink-2": "#3d4a3e",
        "ink-3": "#5e5e5e",
        surface: "#eeeeee",
        "surface-2": "#e8e8e8",
        green: "#006d36",
        "green-deep": "#005e2d",
        "green-soft": "rgba(74, 222, 128, 0.19)",
        "green-dot": "#4ade80",
        amber: "#f59e0b",
        sage: "#bccabb",
        "grad-top": "#2d4e68",
        "grad-bot": "#599bce",
      },
      boxShadow: {
        card: "0 4px 15.1px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        shell: "15px",
      },
      fontFamily: {
        display: ["var(--font-inter)"],
        sans: ["var(--font-inter)"],
        body: ["var(--font-roboto)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      gridTemplateColumns: {
        shell: "297px minmax(0, 1fr) 260px",
      },
      height: {
        header: "64px",
      },
      maxWidth: {
        launch: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
