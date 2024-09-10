/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "220px",
			sm: "520px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1536px",
		},
		extend: {
			colors: {
				primary: "#FFFAFA ",
				secondary: "#f0f8ff",
				tertiary: "#3D8EC6",
				normal: "#f6f5f5",
				dark: "#212944",
			},
		},
	},
	plugins: [],
};
