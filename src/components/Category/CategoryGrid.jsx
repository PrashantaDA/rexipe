/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import RecipeGrid from "../RecipeGrid";
import Breadcrumb from "../Breadcrumb";

const CategoryGrid = ({ items, category, type, initialDisplayCount = 8 }) => {
	const [displayCount, setDisplayCount] = useState(initialDisplayCount);

	const handleViewMore = () => {
		setDisplayCount((prevCount) => prevCount + 8);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="space-y-8"
		>
			<Breadcrumb currentPage={`${type === "cuisine" ? "Cuisine" : "Diet"}: ${category}`} />

			<RecipeGrid
				title={`${category} ${type === "cuisine" ? "Cuisine" : "Diet"} Recipes`}
				items={items.slice(0, displayCount)}
			/>

			{displayCount < items.length && (
				<motion.div
					variants={itemVariants}
					className="flex justify-center"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="glass-effect rounded-xl px-8 py-3 font-handlee text-lg font-semibold text-accent shadow-lg transition-all duration-300 hover:bg-card-hover hover:shadow-xl"
						onClick={handleViewMore}
					>
						Load More Recipes
					</motion.button>
				</motion.div>
			)}

			{displayCount >= items.length && items.length > 0 && (
				<motion.p
					variants={itemVariants}
					className="text-center text-normal/60"
				>
					You&apos;ve reached the end of the list. Try exploring other {type === "cuisine" ? "cuisines" : "diets"}!
				</motion.p>
			)}
		</motion.div>
	);
};

export default CategoryGrid;
