/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Helper function to handle the active/inactive class names
const getNavLinkClass = ({ isActive }) =>
	isActive
		? "glass-effect text-accent flex flex-col items-center rounded-xl p-6 transition-all duration-300 shadow-lg"
		: "glass-effect text-normal hover:text-accent flex flex-col items-center rounded-xl p-6 transition-all duration-300 hover:bg-card-hover hover:shadow-lg";

const Category = ({ title, categories }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="glass-effect mx-auto max-w-7xl rounded-2xl p-8 shadow-xl"
		>
			<div className="mb-12 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="font-handlee text-5xl font-bold text-accent drop-shadow-lg"
				>
					{title}
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4 text-lg text-normal/80"
				>
					{title === "Diet Categories" ? "Find recipes that match your dietary preferences" : "Explore recipes from different cuisines around the world"}
				</motion.p>
			</div>

			<div className="mx-auto grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{categories.map((category, index) => (
					<NavLink
						key={category.name}
						to={category.path}
						className={getNavLinkClass}
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="flex flex-col items-center gap-4"
						>
							<motion.div
								whileHover={{ scale: 1.1, rotate: 5 }}
								transition={{ duration: 0.2 }}
								className="text-4xl text-accent"
							>
								{category.icon}
							</motion.div>
							<h4 className="text-center text-base font-semibold">{category.name}</h4>
						</motion.div>
					</NavLink>
				))}
			</div>
		</motion.div>
	);
};

export default Category;
