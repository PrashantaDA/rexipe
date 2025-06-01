import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookmark, FaTrash, FaSort, FaThLarge, FaList, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import useSavedRecipes from "../hooks/useSavedRecipes";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const SavedRecipes = () => {
	const { savedRecipes, clearSavedRecipes } = useSavedRecipes();
	const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
	const [sortBy, setSortBy] = useState("name"); // "name", "time", "health"
	const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
	const [searchQuery, setSearchQuery] = useState("");

	// Memoized sorted and filtered recipes
	const filteredRecipes = useMemo(() => {
		let result = [...savedRecipes];

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter((recipe) => recipe.title.toLowerCase().includes(query));
		}

		// Apply sorting
		result.sort((a, b) => {
			let comparison = 0;
			switch (sortBy) {
				case "name":
					comparison = a.title.localeCompare(b.title);
					break;
				case "time":
					comparison = a.readyInMinutes - b.readyInMinutes;
					break;
				case "health":
					comparison = a.healthScore - b.healthScore;
					break;
				default:
					comparison = 0;
			}
			return sortOrder === "asc" ? comparison : -comparison;
		});

		return result;
	}, [savedRecipes, sortBy, sortOrder, searchQuery]);

	const handleSort = (newSortBy) => {
		if (sortBy === newSortBy) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(newSortBy);
			setSortOrder("asc");
		}
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
						<FaBookmark className="h-12 w-12 text-accent" />
					</motion.div>
					<motion.h1
						variants={itemVariants}
						className={commonStyles.heading1}
					>
						Saved Recipes
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className={commonStyles.subtitle}
					>
						Your collection of favorite recipes
					</motion.p>

					{/* Search and Controls */}
					{savedRecipes.length > 0 && (
						<motion.div
							variants={itemVariants}
							className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4"
						>
							{/* Search Bar */}
							<div className="relative">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search saved recipes..."
									className="w-64 rounded-lg border border-accent/20 bg-black/70 px-4 py-2 pl-10 text-sm text-white placeholder:text-white/60 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
								/>
								<FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
							</div>

							{/* Sort Options */}
							<div className="relative flex items-center gap-2">
								<button
									type="button"
									onClick={() => handleSort("name")}
									className={`relative z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
										sortBy === "name" ? "bg-accent/20 text-accent" : "bg-black/70 text-white/80 hover:bg-accent/10 hover:text-accent"
									}`}
								>
									<FaSort className="h-4 w-4" />
									Name
								</button>
								<button
									type="button"
									onClick={() => handleSort("time")}
									className={`relative z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
										sortBy === "time" ? "bg-accent/20 text-accent" : "bg-black/70 text-white/80 hover:bg-accent/10 hover:text-accent"
									}`}
								>
									<FaSort className="h-4 w-4" />
									Time
								</button>
								<button
									type="button"
									onClick={() => handleSort("health")}
									className={`relative z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
										sortBy === "health" ? "bg-accent/20 text-accent" : "bg-black/70 text-white/80 hover:bg-accent/10 hover:text-accent"
									}`}
								>
									<FaSort className="h-4 w-4" />
									Health
								</button>
							</div>

							{/* View Toggle */}
							<div className="relative flex items-center gap-2 rounded-lg bg-black/70 p-1">
								<button
									type="button"
									onClick={() => setViewMode("grid")}
									className={`relative z-10 rounded-lg p-2 transition-all ${
										viewMode === "grid" ? "bg-accent/20 text-accent" : "text-white/80 hover:bg-accent/10 hover:text-accent"
									}`}
								>
									<FaThLarge className="h-4 w-4" />
								</button>
								<button
									type="button"
									onClick={() => setViewMode("list")}
									className={`relative z-10 rounded-lg p-2 transition-all ${
										viewMode === "list" ? "bg-accent/20 text-accent" : "text-white/80 hover:bg-accent/10 hover:text-accent"
									}`}
								>
									<FaList className="h-4 w-4" />
								</button>
							</div>

							{/* Clear All Button */}
							<button
								type="button"
								onClick={clearSavedRecipes}
								className="relative z-10 flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2 text-sm text-white/80 transition-all hover:bg-accent/10 hover:text-accent"
							>
								<FaTrash className="h-4 w-4" />
								Clear All
							</button>
						</motion.div>
					)}
				</motion.div>

				{/* Recipes Grid/List */}
				{!savedRecipes.length ? (
					<motion.div
						variants={itemVariants}
						className="relative rounded-lg bg-black/70 p-8 text-center"
					>
						<FaBookmark className="mx-auto mb-4 h-12 w-12 text-accent" />
						<h3 className="mb-2 text-xl font-semibold text-white">No Saved Recipes</h3>
						<p className="mb-4 text-white/80">You haven&apos;t saved any recipes yet. Start exploring and save your favorites!</p>
						<div className="relative z-10">
							<Link
								to="/featured"
								className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90"
							>
								Explore Recipes
							</Link>
						</div>
					</motion.div>
				) : !filteredRecipes.length ? (
					<motion.div
						variants={itemVariants}
						className="rounded-lg bg-black/70 p-8 text-center"
					>
						<FaSearch className="mx-auto mb-4 h-12 w-12 text-accent" />
						<h3 className="mb-2 text-xl font-semibold text-white">No Matching Recipes</h3>
						<p className="mb-4 text-white/80">No recipes match your search criteria. Try adjusting your filters.</p>
						<button
							onClick={() => {
								setSearchQuery("");
								setSortBy("name");
								setSortOrder("asc");
							}}
							className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90"
						>
							Clear Filters
						</button>
					</motion.div>
				) : (
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className={`relative z-0 ${viewMode === "grid" ? commonStyles.grid.responsive : "mx-auto w-full space-y-4 px-4 sm:w-[90vw] md:w-[80vw] lg:w-[70vw]"}`}
					>
						{filteredRecipes.map((recipe) => (
							<motion.div
								key={recipe.id}
								variants={itemVariants}
								whileHover={{ y: -4 }}
								className={`group relative ${viewMode === "list" ? "w-full" : ""}`}
							>
								<Card
									img={recipe.img}
									image={recipe.image}
									title={recipe.title}
									id={recipe.id}
									readyInMinutes={recipe.readyInMinutes}
									servings={recipe.servings}
									healthScore={recipe.healthScore}
									viewMode={viewMode}
								/>
								<Link
									to={`/recipe/${recipe.id}`}
									className="absolute inset-0 z-0"
									aria-label={`View recipe: ${recipe.title}`}
								/>
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default SavedRecipes;
