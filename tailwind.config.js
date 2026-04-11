/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "320px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				primary: "#0c0a09", // Stone 950
				secondary: "#1c1917", // Stone 900
				tertiary: "#292524", // Stone 800
				accent: "#e11d48", // Rose 600
				"accent-light": "#fb7185", // Rose 400
				"accent-dark": "#9f1239", // Rose 800
				normal: "#fafaf9", // Stone 50
				card: "rgba(28, 25, 23, 0.7)",
				"card-hover": "rgba(41, 37, 36, 0.9)",
				"card-text": "#e7e5e4", // Stone 200
				"gradient-start": "#0c0a09",
				"gradient-middle": "#1c1917",
				"gradient-end": "#0c0a09",
			},
		},
	},
	plugins: [],
};
