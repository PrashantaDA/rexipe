import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategoryGrid from "../components/Category/CategoryGrid";

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
				<p className="text-normal/80">{error}</p>
			</motion.div>
		);
	}

	if (recipes.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="glass-effect mx-auto mt-8 max-w-2xl rounded-xl p-8 text-center shadow-xl"
			>
				<h2 className="mb-4 text-2xl font-bold text-accent">No Recipes Found</h2>
				<p className="text-normal/80">
					We couldn&apos;t find any {type === "cuisine" ? "cuisine" : "diet"} recipes for &quot;{name}&quot;. Try searching for something else!
				</p>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 py-8"
		>
			<CategoryGrid
				items={recipes}
				category={name}
				type={type}
			/>
		</motion.div>
	);
};

export default Cuisine;
