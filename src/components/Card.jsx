/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Card = ({ img, title }) => {
	return (
		<div>
			<motion.div
				whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
				whileTap={{ scale: 0.95 }}
				className="relative w-full bg-normal p-4 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out"
			>
				<motion.div className="w-full h-64 overflow-hidden rounded-lg mb-4">
					<motion.img
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.3 }}
						className="w-full h-full object-cover"
						src={img}
						alt={title}
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0.4 }}
					whileHover={{ opacity: 0.6 }}
					transition={{ duration: 0.3 }}
					className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark via-transparent to-transparent"
				></motion.div>
				<motion.h3
					whileHover={{ y: -5 }}
					transition={{ duration: 0.3 }}
					className="absolute bottom-4 left-4 text-normal text-xl font-semibold bg-dark bg-opacity-50 px-3 py-2 rounded-md"
				>
					{title}
				</motion.h3>
			</motion.div>
		</div>
	);
};
export default Card;
