import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaUsers, FaHeart, FaList, FaBookOpen } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants, fadeInUp, hoverScale } from "../utils/animations";
import { commonStyles } from "../utils/styles";

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

	if (!recipe) return null;

	const { title, image, summary, extendedIngredients, analyzedInstructions, readyInMinutes, servings, healthScore } = recipe;

	const renderIngredients = () => (
		<motion.ul
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="space-y-3"
		>
			{extendedIngredients?.map((ingredient, index) => (
				<motion.li
					key={index}
					variants={itemVariants}
					className={`${commonStyles.card} flex items-center gap-3`}
				>
					<span className="h-2 w-2 rounded-full bg-accent" />
					{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
				</motion.li>
			))}
		</motion.ul>
	);

	const renderInstructions = () => (
		<motion.ol
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="space-y-4"
		>
			{analyzedInstructions.length > 0 ? (
				analyzedInstructions[0].steps.map((step, index) => (
					<motion.li
						key={index}
						variants={itemVariants}
						className={commonStyles.card}
					>
						<div className="mb-2 flex items-center gap-3">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">{index + 1}</span>
							<h4 className="font-semibold text-accent">Step {index + 1}</h4>
						</div>
						<p className={commonStyles.body}>{step.step}</p>
					</motion.li>
				))
			) : (
				<motion.p
					variants={itemVariants}
					className="text-center text-normal/60"
				>
					No instructions available.
				</motion.p>
			)}
		</motion.ol>
	);

	const stats = [
		{ icon: <FaClock className="h-5 w-5" />, label: "Cook Time", value: `${readyInMinutes} mins` },
		{ icon: <FaUsers className="h-5 w-5" />, label: "Servings", value: `${servings} servings` },
		{ icon: <FaHeart className="h-5 w-5" />, label: "Health Score", value: `${healthScore}%` },
	];

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

			<Breadcrumb currentPage={title} />

			<div className={commonStyles.container}>
				{/* Recipe Header */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mb-12 text-center"
				>
					<motion.h1
						variants={itemVariants}
						className={commonStyles.heading1}
					>
						{title}
					</motion.h1>

					{/* Recipe Stats */}
					<motion.div
						variants={itemVariants}
						className={`${commonStyles.glassCard} mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3`}
					>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								variants={fadeInUp}
								transition={{ delay: index * 0.1 }}
								className="flex flex-col items-center gap-2"
							>
								<div className="text-accent">{stat.icon}</div>
								<span className="text-sm text-normal/60">{stat.label}</span>
								<span className="font-semibold text-normal">{stat.value}</span>
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* Main Content */}
				<div className="grid gap-8 lg:grid-cols-2">
					{/* Left Column - Image and Summary */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-6"
					>
						<motion.div
							variants={itemVariants}
							className="overflow-hidden rounded-xl shadow-xl"
						>
							<img
								src={image}
								alt={title}
								className="h-full w-full object-cover"
							/>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className={commonStyles.glassCard}
						>
							<h2 className={`${commonStyles.heading2} mb-4`}>About this Recipe</h2>
							<div
								className={`${commonStyles.body} prose prose-invert max-w-none`}
								dangerouslySetInnerHTML={{ __html: summary }}
							/>
						</motion.div>
					</motion.div>

					{/* Right Column - Ingredients and Instructions */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-6"
					>
						<div className={commonStyles.glassCard}>
							{/* Tab Navigation */}
							<div className="mb-6 flex gap-4">
								{[
									{ id: "ingredients", icon: <FaList className="h-5 w-5" />, label: "Ingredients" },
									{ id: "instructions", icon: <FaBookOpen className="h-5 w-5" />, label: "Instructions" },
								].map((tab) => (
									<motion.button
										key={tab.id}
										variants={hoverScale}
										whileHover="hover"
										whileTap="tap"
										className={`flex items-center gap-2 rounded-lg px-6 py-2 font-semibold transition-all duration-300 ${
											activeTab === tab.id ? "bg-accent text-primary" : "bg-card text-normal hover:bg-card-hover"
										}`}
										onClick={() => setActiveTab(tab.id)}
									>
										{tab.icon}
										{tab.label}
									</motion.button>
								))}
							</div>

							{/* Tab Content */}
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
									className="mt-6"
								>
									{activeTab === "ingredients" ? renderIngredients() : renderInstructions()}
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Recipe;
