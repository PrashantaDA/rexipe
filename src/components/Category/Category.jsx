/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Helper function to handle the active/inactive class names
const getNavLinkClass = ({ isActive }) =>
	isActive ? "text-tertiary flex flex-col items-center transition-all duration-300 " : "text-dark hover:text-tertiary flex flex-col items-center transition-all duration-300";

const Category = ({ title, categories }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className=" bg-gradient-to-br from-secondary via-normal to-secondary my-12"
		>
			<div className="w-[90%] mx-auto">
				<h2 className="text-5xl font-bold mb-4 text-center text-dark drop-shadow-lg">{title}</h2>
				<div className="w-[80%] mx-auto flex flex-wrap justify-between items-center gap-6 p-4 bg-primary rounded-lg shadow-lg">
					{categories.map((category) => (
						<NavLink
							key={category.name}
							to={category.path}
							className={getNavLinkClass}
						>
							{category.icon}
							<h4 className="mt-2 text-base">{category.name}</h4>
						</NavLink>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default Category;
