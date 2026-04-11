export const commonStyles = {
	// Layout
	container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
	containerLarge: "max-w-screen-2xl mx-auto px-6",
	section: "py-20",
	sectionLarge: "py-32",

	// Typography
	heading1: "font-outfit text-5xl font-extrabold text-normal md:text-7xl leading-tight",
	heading2: "font-outfit text-4xl font-bold text-normal md:text-5xl",
	heading3: "font-outfit text-2xl font-bold text-normal md:text-3xl",
	subtitle: "text-lg text-normal/70 md:text-xl font-light",
	body: "text-normal/80 leading-relaxed",

	// Cards and Containers
	card: "modern-card p-6",
	cardHover: "modern-card p-6 cursor-pointer",
	glassCard: "glass-card rounded-3xl p-8 shadow-2xl",

	// Buttons
	button: {
		primary: "modern-button",
		secondary: "rounded-full border border-white/20 px-6 py-2.5 text-normal font-medium transition-all hover:bg-white/10 hover:border-white/40",
		tertiary: "rounded-xl bg-secondary/80 px-4 py-2 text-normal font-medium transition-all hover:bg-secondary hover:text-accent",
		icon: "rounded-full p-3 text-normal transition-all hover:bg-accent hover:text-white shadow-lg",
	},

	// Forms
	input: "modern-input w-full",
	searchBar: "glass-effect flex items-center justify-between gap-4 rounded-full px-6 py-3 shadow-2xl ring-1 ring-white/10 transition-all focus-within:ring-accent/40",

	// Grids
	grid: {
		responsive: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
		responsive2: "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3",
	},

	// Animations
	hoverScale: "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
	hoverRotate: "transition-all duration-500 hover:rotate-1 hover:scale-105",

	// Backgrounds
	gradientBg: "bg-gradient-to-b from-primary via-primary to-[#1c0a0a]",
	dotPattern: "absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:32px_32px]",

	// States
	loading: "flex min-h-[60vh] flex-col items-center justify-center gap-4",
	error: "glass-card mx-auto mt-12 max-w-2xl text-center",
	empty: "glass-card mx-auto mt-16 max-w-md text-center",
};
