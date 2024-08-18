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
        primary: '#020B09',
        'primary-light': '#BCBCBC',
        'primary-dark': '#DCDEDC',
        "text-primary": "#FFFFFF",
        "text-secondary": "#B0B0B0",
      },
    },
  },
  plugins: [],
};
export default config;
