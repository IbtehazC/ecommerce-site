import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        'primary-light': '#2A2A2A',
        'primary-dark': '#0F0F0F',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        'card-bg': '#0F0F0F',
      },
    },
  },
  plugins: [],
};
export default config;
