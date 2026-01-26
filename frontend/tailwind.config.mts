/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bbs-cyan': '#00FFFF',
        'bbs-green': '#00FF00',
        'bbs-yellow': '#FFFF00',
        'bbs-magenta': '#FF00FF',
        'bbs-red': '#FF0000',
      },
    },
  },
  plugins: [],
};