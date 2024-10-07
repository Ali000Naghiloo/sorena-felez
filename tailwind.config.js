/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        semiDarkBackground: "#f3f3f3",
        pagesBackground: "rgb(238, 238, 238)",
        accent: "#15a1ed",
      },
      transitionProperty: {
        rotate: "all ease 1s",
      },
    },
  },
  plugins: [],
};
