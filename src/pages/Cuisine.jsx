import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaGlobeAmericas, FaHeart } from "react-icons/fa";
import CategoryGrid from "../components/Category/CategoryGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const Cuisine = () => {
	const { name, type } = useParams();
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getRecipes = async (name, type) => {
			try {
				setIsLoading(true);
				setError(null);
				let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=24`;

				if (type === "cuisine") {
					url += `&cuisine=${name}`;
				} else if (type === "diet") {
					url += `&diet=${name}`;
				}

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

		if (name && type) {
			getRecipes(name, type);
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
							We couldn&apos;t find any {type === "cuisine" ? "cuisine" : "diet"} recipes for &quot;{name}&quot;. Try searching for something else!
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	const getCategoryIcon = () => {
		switch (type) {
			case "cuisine":
				return <FaGlobeAmericas className="h-12 w-12 text-accent" />;
			case "diet":
				return <FaHeart className="h-12 w-12 text-accent" />;
			default:
				return <FaUtensils className="h-12 w-12 text-accent" />;
		}
	};

	const getCategoryTitle = () => {
		const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
		return type === "cuisine" ? `${formattedName} Cuisine` : `${formattedName} Diet`;
	};

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
				{/* Header Section */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mb-12 text-center"
				>
					<motion.div
						variants={itemVariants}
						className="mb-6 inline-block"
					>
						{getCategoryIcon()}
					</motion.div>
					<motion.h1
						variants={itemVariants}
						className={commonStyles.heading1}
					>
						{getCategoryTitle()}
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className={commonStyles.subtitle}
					>
						Discover our collection of {type === "cuisine" ? "authentic" : "healthy"} {type === "cuisine" ? "cuisine" : "diet"} recipes
					</motion.p>
				</motion.div>

				{/* Recipe Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<CategoryGrid
						items={recipes}
						category={name}
						type={type}
					/>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Cuisine;
