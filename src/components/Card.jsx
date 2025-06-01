/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaClock, FaUsers, FaHeart, FaInfoCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import LazyImage from "./common/LazyImage";
import useSavedRecipes from "../hooks/useSavedRecipes";

const Card = ({ img = undefined, image = undefined, title, id, readyInMinutes = 0, servings = 1, healthScore = 0, viewMode = "grid" }) => {
	const { isRecipeSaved, saveRecipe, unsaveRecipe } = useSavedRecipes();
	const [isHovered, setIsHovered] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [savedAt, setSavedAt] = useState(null);

	useEffect(() => {
		// Get saved timestamp from localStorage
		const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
		const savedRecipe = savedRecipes.find((recipe) => recipe.id === id);
		if (savedRecipe?.savedAt) {
			setSavedAt(new Date(savedRecipe.savedAt));
		}
	}, [id]);

	const handleSaveClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (isRecipeSaved(id)) {
			unsaveRecipe(id);
			setSavedAt(null);
		} else {
			saveRecipe({ id, title, img, image, readyInMinutes, servings, healthScore, savedAt: new Date().toISOString() });
			setSavedAt(new Date());
		}
	};

	const formatTimeAgo = (date) => {
		if (!date) return "";
		const now = new Date();
		const diff = now - date;
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) return `${days}d ago`;
		if (hours > 0) return `${hours}h ago`;
		if (minutes > 0) return `${minutes}m ago`;
		return "Just now";
	};

	const cardContent = (
		<>
			{/* Image Container */}
			<div className={`relative overflow-hidden ${viewMode === "list" ? "aspect-[16/9] w-full sm:w-48 md:w-64 flex-shrink-0" : "aspect-[4/3] rounded-t-lg"}`}>
				<LazyImage
					src={img || image}
					alt={title}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					onError={(e) => {
						console.error("Image failed to load:", { id, title, img, image, error: e });
					}}
				/>
				{/* Save Button */}
				<button
					onClick={handleSaveClick}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					className={`absolute right-2 top-2 z-10 rounded-full p-2 transition-all ${
						isRecipeSaved(id) ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-black/70 text-white/90 hover:bg-accent hover:text-white"
					}`}
				>
					<FaBookmark className="h-5 w-5" />
					{/* Tooltip */}
					<AnimatePresence>
						{showTooltip && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-black/90 p-2 text-sm text-white shadow-lg backdrop-blur-sm"
							>
								{isRecipeSaved(id) ? "Remove from saved recipes" : "Save recipe"}
								{savedAt && <div className="mt-1 text-xs text-white/60">Saved {formatTimeAgo(savedAt)}</div>}
							</motion.div>
						)}
					</AnimatePresence>
				</button>
				{/* Quick Info Button */}
				<button
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className="absolute left-2 top-2 z-10 rounded-full bg-black/70 p-2 text-white/90 transition-all hover:bg-accent hover:text-white"
				>
					<FaInfoCircle className="h-5 w-5" />
					{/* Quick Info Tooltip */}
					<AnimatePresence>
						{isHovered && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-black/90 p-2 text-sm text-white shadow-lg backdrop-blur-sm"
							>
								<div className="flex items-center gap-2">
									<FaClock className="h-4 w-4 text-accent" />
									<span>{readyInMinutes} mins</span>
								</div>
								<div className="flex items-center gap-2">
									<FaUsers className="h-4 w-4 text-accent" />
									<span>{servings} servings</span>
								</div>
								<div className="flex items-center gap-2">
									<FaHeart className="h-4 w-4 text-accent" />
									<span>Health Score: {healthScore}</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</div>

			{/* Content */}
			<div className={`bg-black/80 p-4 ${viewMode === "list" ? "flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4" : ""}`}>
				<div className={viewMode === "list" ? "flex-1 min-w-0" : ""}>
					<h3 className={`font-medium text-white ${viewMode === "list" ? "text-base sm:text-lg truncate" : "line-clamp-2"}`}>{title}</h3>
					{viewMode === "list" && savedAt && <div className="mt-1 text-sm text-white/60">Saved {formatTimeAgo(savedAt)}</div>}
				</div>
				{viewMode === "list" && (
					<div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
						<div className="flex items-center gap-2 text-sm text-white/60">
							<FaClock className="h-4 w-4 text-accent" />
							<span>{readyInMinutes}m</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-white/60">
							<FaUsers className="h-4 w-4 text-accent" />
							<span>{servings}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-white/60">
							<FaHeart className="h-4 w-4 text-accent" />
							<span>{healthScore}</span>
						</div>
					</div>
				)}
			</div>
		</>
	);

	return viewMode === "list" ? (
		<div className="group flex flex-col sm:flex-row overflow-hidden rounded-lg bg-black/80 shadow-lg transition-all hover:shadow-xl hover:shadow-accent/20">{cardContent}</div>
	) : (
		<div className="group h-full overflow-hidden rounded-lg bg-black/80 shadow-lg transition-all hover:shadow-xl hover:shadow-accent/20">{cardContent}</div>
	);
};

Card.propTypes = {
	img: PropTypes.string,
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	readyInMinutes: PropTypes.number,
	servings: PropTypes.number,
	healthScore: PropTypes.number,
	viewMode: PropTypes.string,
};

export default Card;
