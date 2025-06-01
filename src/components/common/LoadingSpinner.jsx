import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "md", className = "" }) => {
	const sizeClasses = {
		sm: "h-6 w-6 border-2",
		md: "h-12 w-12 border-4",
		lg: "h-16 w-16 border-4",
	};

	return (
		<div className={`flex min-h-[60vh] items-center justify-center ${className}`}>
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
				className={`${sizeClasses[size]} rounded-full border-accent border-t-transparent`}
			/>
		</div>
	);
};

LoadingSpinner.propTypes = {
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	className: PropTypes.string,
};

export default LoadingSpinner;
