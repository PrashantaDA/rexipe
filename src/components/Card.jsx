import { motion } from "framer-motion";

const Card = ({ img, title }) => {
	return (
		<div className="modern-card group cursor-pointer">
			<motion.div
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
				className="relative w-full h-64 overflow-hidden rounded-xl"
			>
				<img
					src={img}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-gradient-end via-gradient-middle to-transparent" />
				{/* Text */}
				<motion.h3
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="absolute bottom-4 left-4 text-xl font-semibold text-card-text z-10"
				>
					{title}
				</motion.h3>
			</motion.div>
		</div>
	);
};

export default Card;
