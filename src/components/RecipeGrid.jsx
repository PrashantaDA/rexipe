/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "./Card";

const RecipeGrid = ({ title, items }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="my-10 bg-gradient-to-br from-secondary via-normal to-secondary py-10"
		>
			<div className="w-[90%] mx-auto">
				<h2 className="text-5xl font-bold mb-12 text-center text-dark drop-shadow-lg">{title}</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{items.map((item) => (
						<Link
							key={item.id}
							to={`/recipe/${item.id}`}
						>
							<motion.div
								whileHover={{ scale: 1.05, rotate: 2 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.3 }}
							>
								<Card
									img={item.image}
									title={item.title}
								/>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default RecipeGrid;
