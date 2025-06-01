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
			className="gradient-bg py-12"
		>
			<div className="mx-auto w-[90%]">
				<h2 className="mb-12 text-center text-5xl font-bold text-accent drop-shadow-lg font-handlee">{title}</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{items.map((item) => (
						<Link
							key={item.id}
							to={`/recipe/${item.id}`}
						>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
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
