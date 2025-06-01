import PropTypes from "prop-types";

const Skeleton = ({ className, variant = "rectangular" }) => {
	const baseClasses = "animate-pulse bg-white/10";
	const variantClasses = {
		rectangular: "rounded-lg",
		circular: "rounded-full",
		text: "h-4 w-3/4 rounded",
		title: "h-6 w-1/2 rounded",
		avatar: "h-12 w-12 rounded-full",
	};

	return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
};

Skeleton.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.oneOf(["rectangular", "circular", "text", "title", "avatar"]),
};

export default Skeleton;
