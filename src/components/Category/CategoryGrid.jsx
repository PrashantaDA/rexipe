/* eslint-disable react/prop-types */
import { useState } from "react";
import RecipeGrid from "../RecipeGrid";
import Breadcrumb from "../Breadcrumb";
import { motion } from "framer-motion";

const CategoryGrid = ({ items, category, initialDisplayCount = 8 }) => {
	const [displayCount, setDisplayCount] = useState(initialDisplayCount);

	const handleViewMore = () => {
		setDisplayCount((prevCount) => prevCount + 8);
	};

	return (
		<>
			<Breadcrumb currentPage={`${category}`} />
			<RecipeGrid
				title={`${category} Picks`}
				items={items.slice(0, displayCount)}
			/>
			{displayCount < items.length && (
				<div className="text-center mt-8">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-tertiary text-normal px-6 py-2 rounded-full font-semibold shadow-md hover:bg-opacity-90 transition-all duration-300 mb-10"
						onClick={handleViewMore}
					>
						View More
					</motion.button>
				</div>
			)}
		</>
	);
};

export default CategoryGrid;
