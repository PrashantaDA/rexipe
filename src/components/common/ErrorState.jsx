import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ErrorState = ({ message, onRetry, retryText = "Try Again" }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="glass-effect mx-auto mt-8 max-w-2xl rounded-xl p-8 text-center shadow-xl"
		>
			<h2 className="mb-4 text-2xl font-bold text-accent">Oops! Something went wrong</h2>
			<p className="mb-4 text-normal/80">{message}</p>
			{onRetry && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onRetry}
					className="rounded-full bg-accent px-6 py-2 text-primary transition-colors hover:bg-accent/90"
				>
					{retryText}
				</motion.button>
			)}
		</motion.div>
	);
};

ErrorState.propTypes = {
	message: PropTypes.string.isRequired,
	onRetry: PropTypes.func,
	retryText: PropTypes.string,
};

export default ErrorState;
