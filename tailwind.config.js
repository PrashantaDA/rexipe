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
				primary: "#1a1b1e",
				secondary: "#2c2d31",
				tertiary: "#4f46e5",
				accent: "#818cf8",
				normal: "#f0f8ff",
				dark: "#0f172a",
				card: "#2c2d31",
				"card-hover": "#3f4046",
				"card-text": "#e2e8f0",
				"gradient-start": "#1a1b1e",
				"gradient-middle": "#2c2d31",
				"gradient-end": "#1a1b1e",
			},
		},
	},
	plugins: [],
};
