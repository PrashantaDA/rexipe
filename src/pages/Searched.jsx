import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUtensils } from "react-icons/fa";
import RecipeGrid from "../components/RecipeGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants, hoverScale } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const Searched = () => {
	const { search } = useParams();
	const [searchedRecipes, setSearchedRecipes] = useState([]);
	const [visibleCount, setVisibleCount] = useState(8);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getSearched = async (query) => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${query}&number=100`);
			if (!response.ok) {
				throw new Error("Failed to fetch recipes. Please try again later.");
			}
			const data = await response.json();
			setSearchedRecipes(data.results || []);
		} catch (err) {
			console.error("Error fetching recipes:", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSearched(search);
	}, [search]);

	const handleLoadMore = () => {
		setVisibleCount((prevCount) => prevCount + 8);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				onRetry={() => getSearched(search)}
			/>
		);
	}

	if (searchedRecipes.length === 0) {
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
							<FaSearch className="h-12 w-12 text-accent" />
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
							We couldn&apos;t find any recipes matching &quot;{search}&quot;. Try searching for something else!
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	const shouldShowLoadMore = searchedRecipes.length > visibleCount;

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
						<FaSearch className="h-12 w-12 text-accent" />
					</motion.div>
					<motion.h1
						variants={itemVariants}
						className={commonStyles.heading1}
					>
						Search Results
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className={commonStyles.subtitle}
					>
						Found {searchedRecipes.length} recipes matching &quot;{search}&quot;
					</motion.p>
				</motion.div>

				{/* Recipe Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<RecipeGrid
						title={`Search Results for "${search}"`}
						items={searchedRecipes.slice(0, visibleCount)}
					/>

					{/* Load More Button */}
					<AnimatePresence>
						{shouldShowLoadMore && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="mt-12 flex justify-center"
							>
								<motion.button
									variants={hoverScale}
									whileHover="hover"
									whileTap="tap"
									onClick={handleLoadMore}
									className={`${commonStyles.button.primary} flex items-center gap-2`}
								>
									<FaUtensils className="h-4 w-4" />
									Load More Recipes
								</motion.button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Searched;
