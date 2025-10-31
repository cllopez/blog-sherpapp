import { type Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{mdx,md}",
  ],
  // tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      primary: {
        blue: "#0088FE",
        green: "#00C49F",
        yellow: "#FFBB28",
        orange: "#FF8042",
        purple: "#A28DFF",
        red: "#FF6B6B"
      },
      priority: {
        high: "#ef4444",
        medium: "#f59e0b",
        low: "#10b981"
      },
      category: {
        productivity: {
          text: "#0088FE",
          bg: "#E6F3FF"
        },
        study: {
          text: "#00C49F",
          bg: "#E6FAF7"
        },
        wellness: {
          text: "#FFBB28",
          bg: "#FFF6E6"
        },
        technology: {
          text: "#A28DFF",
          bg: "#F3F0FF"
        }
      }
    }
  }
}
,
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
export default config;
