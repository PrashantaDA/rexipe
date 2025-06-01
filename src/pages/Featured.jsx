import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRandom, FaUtensils, FaSync, FaTrash, FaClock } from "react-icons/fa";
import Card from "../components/Card";

const CACHE_KEY = "featured_recipes";
const CACHE_TIMESTAMP_KEY = "featured_recipes_timestamp";

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

		const lastFetchDate = new Date(parseInt(timestamp));
		const currentDate = new Date();

		return lastFetchDate.getDate() === currentDate.getDate() && lastFetchDate.getMonth() === currentDate.getMonth() && lastFetchDate.getFullYear() === currentDate.getFullYear();
	};

	const getCachedRecipes = () => {
		const cachedData = localStorage.getItem(CACHE_KEY);
		const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
		if (timestamp) {
			setLastUpdated(new Date(parseInt(timestamp)));
		}
		return cachedData ? JSON.parse(cachedData) : null;
	};

	const cacheRecipes = (recipesData) => {
		const timestamp = Date.now();
		localStorage.setItem(CACHE_KEY, JSON.stringify(recipesData));
		localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
		setLastUpdated(new Date(timestamp));
	};

	const clearCache = () => {
		localStorage.removeItem(CACHE_KEY);
		localStorage.removeItem(CACHE_TIMESTAMP_KEY);
		setLastUpdated(null);
		showToastMessage("Cache cleared successfully!");
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

			// Check if we have valid cached data and not forcing refresh
			if (!forceRefresh && isCacheValid()) {
				const cachedRecipes = getCachedRecipes();
				if (cachedRecipes) {
					setRecipes(cachedRecipes);
					setIsLoading(false);
					return;
				}
			}

			setIsRefreshing(true);
			const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=18&tags=main course`);
			if (!response.ok) {
				throw new Error("Failed to fetch recipes. Please try again later.");
			}
			const data = await response.json();
			const recipesData = data.recipes || [];

			cacheRecipes(recipesData);
			setRecipes(recipesData);
			showToastMessage("Recipes updated successfully!");
		} catch (err) {
			console.error("Error fetching recipes:", err);
			setError(err.message);
			showToastMessage("Failed to update recipes. Please try again.");
		} finally {
			setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	useEffect(() => {
		fetchRandomRecipes();
	}, []);

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
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	if (isLoading && !isRefreshing) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					className="h-12 w-12 rounded-full border-4 border-accent border-t-transparent"
				/>
			</div>
		);
	}

	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="glass-effect mx-auto mt-8 max-w-2xl rounded-xl p-8 text-center shadow-xl"
			>
				<h2 className="mb-4 text-2xl font-bold text-accent">Oops! Something went wrong</h2>
				<p className="mb-4 text-normal/80">{error}</p>
				<button
					onClick={() => fetchRandomRecipes(true)}
					className="rounded-full bg-accent px-6 py-2 text-primary transition-colors hover:bg-accent/90"
				>
					Try Again
				</button>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-gradient-to-b from-primary to-primary/95 py-12"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:40px_40px]" />
			</div>

			<div className="container relative mx-auto px-4">
				{/* Header Section */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mb-12 text-center"
				>
					<div className="mb-4 flex items-center justify-center gap-4">
						<motion.div
							variants={itemVariants}
							className="inline-block rounded-full bg-accent/10 p-4"
						>
							<FaRandom className="h-8 w-8 text-accent" />
						</motion.div>
						<div className="flex gap-2">
							<motion.button
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => fetchRandomRecipes(true)}
								disabled={isRefreshing}
								className="rounded-full bg-accent/10 p-2 text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
								title="Refresh Recipes"
							>
								<FaSync className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
							</motion.button>
							<motion.button
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={clearCache}
								className="rounded-full bg-accent/10 p-2 text-accent transition-colors hover:bg-accent/20"
								title="Clear Cache"
							>
								<FaTrash className="h-5 w-5" />
							</motion.button>
						</div>
					</div>
					<motion.h1
						variants={itemVariants}
						className="mb-4 font-handlee text-4xl font-bold text-accent md:text-5xl"
					>
						Featured Recipes
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className="mx-auto max-w-2xl text-lg text-normal/80"
					>
						Discover a curated selection of random recipes to inspire your next culinary adventure.
					</motion.p>
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
							<div className="glass-effect rounded-full px-6 py-3 text-accent shadow-lg">{toastMessage}</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Recipes Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
									img={recipe.image}
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
						className="glass-effect mx-auto mt-12 max-w-md rounded-xl p-8 text-center"
					>
						<FaUtensils className="mx-auto mb-4 h-12 w-12 text-accent" />
						<h3 className="mb-2 text-xl font-bold text-accent">No Recipes Found</h3>
						<p className="mb-4 text-normal/80">We couldn&apos;t find any recipes at the moment. Please try again later.</p>
						<button
							onClick={() => fetchRandomRecipes(true)}
							className="rounded-full bg-accent px-6 py-2 text-primary transition-colors hover:bg-accent/90"
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
