export const commonStyles = {
	// Layout
	container: "container mx-auto px-4",
	containerLarge: "container mx-auto px-6",
	section: "py-12",
	sectionLarge: "py-24",

	// Typography
	heading1: "font-handlee text-4xl font-bold text-accent md:text-5xl",
	heading2: "font-handlee text-3xl font-bold text-accent md:text-4xl",
	heading3: "font-handlee text-2xl font-bold text-accent md:text-3xl",
	subtitle: "text-lg text-normal/80 md:text-xl",
	body: "text-normal/90",

	// Cards and Containers
	card: "glass-effect rounded-xl p-6 shadow-lg",
	cardHover: "glass-effect rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
	glassCard: "glass-effect rounded-xl p-6 shadow-lg backdrop-blur-md",

	// Buttons
	button: {
		primary: "rounded-full bg-accent px-6 py-2 text-primary transition-colors hover:bg-accent/90",
		secondary: "rounded-full border border-accent px-6 py-2 text-accent transition-all hover:bg-accent/10",
		tertiary: "rounded-lg bg-card px-4 py-2 text-normal transition-all hover:bg-card-hover",
		icon: "rounded-lg p-2.5 text-normal transition-all hover:bg-accent/10 hover:text-accent",
	},

	// Forms
	input: "modern-input w-full bg-transparent text-lg placeholder:text-normal/60 focus:outline-none",
	searchBar: "glass-effect flex items-center justify-between gap-4 rounded-xl px-6 py-4 shadow-lg transition-all duration-300",

	// Grids
	grid: {
		responsive: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
		responsive2: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
	},

	// Animations
	hoverScale: "transition-transform duration-300 hover:scale-105",
	hoverRotate: "transition-all duration-300 hover:scale-110 hover:rotate-5",

	// Backgrounds
	gradientBg: "bg-gradient-to-b from-primary to-primary/95",
	dotPattern: "absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:40px_40px]",

	// States
	loading: "flex min-h-[60vh] items-center justify-center",
	error: "glass-effect mx-auto mt-8 max-w-2xl rounded-xl p-8 text-center shadow-xl",
	empty: "glass-effect mx-auto mt-12 max-w-md rounded-xl p-8 text-center",
};
