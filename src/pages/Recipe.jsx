import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";

const Recipe = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [activeTab, setActiveTab] = useState("ingredients");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
				if (!response.ok) {
					throw new Error("Failed to fetch recipe. Please try again later.");
				}
				const data = await response.json();
				setRecipe(data);
			} catch (err) {
				console.error("Error fetching recipe:", err);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipe();
	}, [id]);

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

	if (!recipe) return null;

	const { title, image, summary, extendedIngredients, analyzedInstructions, readyInMinutes, servings, healthScore } = recipe;

	const renderIngredients = () => (
		<motion.ul
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ staggerChildren: 0.1 }}
			className="space-y-3"
		>
			{extendedIngredients?.map((ingredient, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.05 }}
					className="glass-effect flex items-center gap-3 rounded-lg p-3 text-normal/90"
				>
					<span className="h-2 w-2 rounded-full bg-accent" />
					{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
				</motion.li>
			))}
		</motion.ul>
	);

	const renderInstructions = () => (
		<motion.ol
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ staggerChildren: 0.1 }}
			className="space-y-4"
		>
			{analyzedInstructions.length > 0 ? (
				analyzedInstructions[0].steps.map((step, index) => (
					<motion.li
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="glass-effect rounded-lg p-4"
					>
						<div className="mb-2 flex items-center gap-3">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">{index + 1}</span>
							<h4 className="font-semibold text-accent">Step {index + 1}</h4>
						</div>
						<p className="text-normal/90">{step.step}</p>
					</motion.li>
				))
			) : (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center text-normal/60"
				>
					No instructions available.
				</motion.p>
			)}
		</motion.ol>
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-gradient-to-b from-primary to-primary/95"
		>
			<Breadcrumb currentPage={title} />

			<div className="container mx-auto px-4 py-8">
				{/* Recipe Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-8 text-center"
				>
					<h1 className="mb-4 font-handlee text-4xl font-bold text-accent md:text-5xl">{title}</h1>

					{/* Recipe Stats */}
					<div className="glass-effect mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4 rounded-xl p-4">
						<div className="flex items-center gap-2">
							<span className="text-accent">⏱️</span>
							<span className="text-normal/90">{readyInMinutes} mins</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-accent">👥</span>
							<span className="text-normal/90">{servings} servings</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-accent">❤️</span>
							<span className="text-normal/90">{healthScore}% healthy</span>
						</div>
					</div>
				</motion.div>

				{/* Main Content */}
				<div className="grid gap-8 lg:grid-cols-2">
					{/* Left Column - Image and Summary */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-6"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="overflow-hidden rounded-xl shadow-xl"
						>
							<img
								src={image}
								alt={title}
								className="h-full w-full object-cover"
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="glass-effect rounded-xl p-6"
						>
							<h2 className="mb-4 font-handlee text-2xl font-bold text-accent">About this Recipe</h2>
							<div
								className="prose prose-invert max-w-none text-normal/90"
								dangerouslySetInnerHTML={{ __html: summary }}
							/>
						</motion.div>
					</motion.div>

					{/* Right Column - Ingredients and Instructions */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-6"
					>
						<div className="glass-effect rounded-xl p-6">
							{/* Tab Navigation */}
							<div className="mb-6 flex gap-4">
								{["ingredients", "instructions"].map((tab) => (
									<motion.button
										key={tab}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`rounded-lg px-6 py-2 font-semibold transition-all duration-300 ${
											activeTab === tab ? "bg-accent text-primary" : "bg-card text-normal hover:bg-card-hover"
										}`}
										onClick={() => setActiveTab(tab)}
									>
										{tab.charAt(0).toUpperCase() + tab.slice(1)}
									</motion.button>
								))}
							</div>

							{/* Tab Content */}
							<div className="mt-6">{activeTab === "ingredients" ? renderIngredients() : renderInstructions()}</div>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Recipe;
