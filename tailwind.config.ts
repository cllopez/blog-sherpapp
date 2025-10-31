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
    }
  }
}
,
  plugins: [typography],
};
export default config;
