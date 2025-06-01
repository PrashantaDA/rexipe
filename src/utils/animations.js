export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export const pageVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export const navVariants = {
	hidden: { y: -100, opacity: 0 },
	visible: { y: 0, opacity: 1 },
};

export const dropdownVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -10 },
};

export const mobileMenuVariants = {
	hidden: { opacity: 0, y: -100 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const scaleIn = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
};

export const slideIn = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0 },
};

export const hoverScale = {
	hover: { scale: 1.05 },
	tap: { scale: 0.95 },
};

export const hoverRotate = {
	hover: { scale: 1.1, rotate: 5 },
	tap: { scale: 0.95 },
};
