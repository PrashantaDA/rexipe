import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRandom, FaUtensils, FaClock, FaSync, FaTrash } from "react-icons/fa";
import Card from "../components/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const CACHE_KEY = "featured_recipes";
const CACHE_TIMESTAMP_KEY = "featured_recipes_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Featured = () => {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const isCacheValid = () => {
		const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
		if (!timestamp) return false;

		const lastFetchTime = parseInt(timestamp);
		const currentTime = Date.now();
		return currentTime - lastFetchTime < CACHE_DURATION;
	};

	const getCachedRecipes = () => {
		try {
			const cachedData = localStorage.getItem(CACHE_KEY);
			const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
			if (cachedData && timestamp) {
				const recipes = JSON.parse(cachedData);
				setLastUpdated(new Date(parseInt(timestamp)));
				return recipes;
			}
		} catch (err) {
			console.error("Error reading cache:", err);
			clearCache(); // Clear invalid cache
		}
		return null;
	};

	const cacheRecipes = (recipesData) => {
		try {
			const timestamp = Date.now();
			localStorage.setItem(CACHE_KEY, JSON.stringify(recipesData));
			localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
			setLastUpdated(new Date(timestamp));
		} catch (err) {
			console.error("Error caching recipes:", err);
			showToastMessage("Failed to cache recipes. Please try again.");
		}
	};

	const clearCache = () => {
		try {
			localStorage.removeItem(CACHE_KEY);
			localStorage.removeItem(CACHE_TIMESTAMP_KEY);
			setLastUpdated(null);
			setRecipes([]); // Clear recipes from state
			showToastMessage("Cache cleared successfully!");
			// Fetch new recipes after clearing cache
			fetchRandomRecipes(true);
		} catch (err) {
			console.error("Error clearing cache:", err);
			showToastMessage("Failed to clear cache. Please try again.");
		}
	};

	const showToastMessage = (message) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	const fetchRandomRecipes = async (forceRefresh = false) => {
		try {
			setIsLoading(true);
			setError(null);

			// Check cache only if not forcing refresh
			if (!forceRefresh && isCacheValid()) {
				const cachedRecipes = getCachedRecipes();
				if (cachedRecipes && cachedRecipes.length > 0) {
					setRecipes(cachedRecipes);
					setIsLoading(false);
					return;
				}
			}

			setIsRefreshing(true);
			const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=18&tags=main course`);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || "Failed to fetch recipes. Please try again later.");
			}

			const data = await response.json();
			const recipesData = data.recipes || [];

			if (recipesData.length === 0) {
				throw new Error("No recipes found. Please try again.");
			}

			cacheRecipes(recipesData);
			setRecipes(recipesData);
			showToastMessage(forceRefresh ? "Recipes refreshed successfully!" : "Recipes loaded successfully!");
		} catch (err) {
			console.error("Error fetching recipes:", err);
			setError(err.message);
			showToastMessage(err.message || "Failed to update recipes. Please try again.");
			// If there's an error and we have cached data, use it as fallback
			const cachedRecipes = getCachedRecipes();
			if (cachedRecipes && cachedRecipes.length > 0) {
				setRecipes(cachedRecipes);
				showToastMessage("Using cached recipes due to fetch error.");
			}
		} finally {
			setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	useEffect(() => {
		fetchRandomRecipes();
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				onRetry={() => fetchRandomRecipes(true)}
			/>
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
						<FaRandom className="h-12 w-12 text-accent" />
					</motion.div>
					<motion.h1
						variants={itemVariants}
						className={commonStyles.heading1}
					>
						Featured Recipes
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className={commonStyles.subtitle}
					>
						Discover our daily curated selection of delicious recipes
					</motion.p>

					{/* Action Buttons */}
					<motion.div
						variants={itemVariants}
						className="mt-6 flex flex-wrap items-center justify-center gap-4"
					>
						<button
							type="button"
							onClick={() => fetchRandomRecipes(true)}
							disabled={isRefreshing}
							className={`${commonStyles.button.primary} flex items-center gap-2 relative z-10`}
						>
							<FaSync className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
							<span>Refresh Recipes</span>
						</button>
						<button
							type="button"
							onClick={clearCache}
							className={`${commonStyles.button.secondary} flex items-center gap-2 relative z-10`}
						>
							<FaTrash className="h-4 w-4" />
							<span>Clear Cache</span>
						</button>
					</motion.div>

					{/* Last Updated */}
					{lastUpdated && (
						<motion.div
							variants={itemVariants}
							className="mt-4 flex items-center justify-center gap-2 text-sm text-normal/60"
						>
							<FaClock className="h-4 w-4" />
							<span>Last updated: {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
						</motion.div>
					)}
				</motion.div>

				{/* Toast Notification */}
				<AnimatePresence>
					{showToast && (
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform"
						>
							<div className={commonStyles.glassCard}>{toastMessage}</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Recipes Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className={commonStyles.grid.responsive}
				>
					{recipes.map((recipe) => (
						<motion.div
							key={recipe.id}
							variants={itemVariants}
							whileHover={{ y: -4 }}
							className="group"
						>
							<Link to={`/recipe/${recipe.id}`}>
								<Card
									image={recipe.image}
									title={recipe.title}
									id={recipe.id}
									readyInMinutes={recipe.readyInMinutes}
									servings={recipe.servings}
									healthScore={recipe.healthScore}
								/>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* Empty State */}
				{recipes.length === 0 && (
					<motion.div
						variants={itemVariants}
						className={commonStyles.empty}
					>
						<FaUtensils className="mx-auto mb-4 h-12 w-12 text-accent" />
						<h3 className={commonStyles.heading3}>No Recipes Found</h3>
						<p className="mb-4 text-normal/80">We couldn&apos;t find any recipes at the moment. Please try again later.</p>
						<button
							type="button"
							onClick={() => fetchRandomRecipes(true)}
							className={`${commonStyles.button.primary} relative z-10`}
						>
							Try Again
						</button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default Featured;
