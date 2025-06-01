import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGlobeAmericas, FaHeart } from "react-icons/fa";
import CategoryGrid from "../components/Category/CategoryGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const Cuisine = () => {
	const { name } = useParams();
	const location = useLocation();
	const type = location.pathname.startsWith("/cuisine") ? "cuisine" : "diet";

	const [recipes, setRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getRecipes = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=24&${type === "cuisine" ? "cuisine" : "diet"}=${name}`;

				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch recipes. Please try again later.");
				}
				const data = await response.json();
				setRecipes(data.results || []);
			} catch (error) {
				console.error("Error fetching recipes:", error);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (name) {
			getRecipes();
		}
	}, [name, type]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				onRetry={() => window.location.reload()}
			/>
		);
	}

	if (recipes.length === 0) {
		return (
			<motion.div
				variants={pageVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className={commonStyles.gradientBg}
			>
				{/* Background Pattern */}
				<div className={commonStyles.dotPattern} />

				<div className={commonStyles.container}>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className={commonStyles.empty}
					>
						<motion.div
							variants={itemVariants}
							className="mb-6 inline-block"
						>
							{type === "cuisine" ? <FaGlobeAmericas className="h-12 w-12 text-accent" /> : <FaHeart className="h-12 w-12 text-accent" />}
						</motion.div>
						<motion.h2
							variants={itemVariants}
							className={commonStyles.heading2}
						>
							No Recipes Found
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className={commonStyles.body}
						>
							We couldn&apos;t find any {type} recipes for &quot;{name}&quot;. Try searching for something else!
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			variants={pageVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={commonStyles.gradientBg}
		>
			{/* Background Pattern */}
			<div className={commonStyles.dotPattern} />

			<div className={commonStyles.container}>
				<CategoryGrid
					items={recipes}
					category={name}
					type={type}
				/>
			</div>
		</motion.div>
	);
};

export default Cuisine;
