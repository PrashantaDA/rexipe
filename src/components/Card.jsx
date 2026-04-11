/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaClock, FaHeart, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import LazyImage from "./common/LazyImage";
import useSavedRecipes from "../hooks/useSavedRecipes";

/**
 * Premium Gourmet Recipe Card
 */
const Card = ({ 
    img = undefined, 
    image = undefined, 
    title, 
    id, 
    readyInMinutes = 0, 
    servings = 1, 
    healthScore = 0, 
    viewMode = "grid" 
}) => {
    const { isRecipeSaved, saveRecipe, unsaveRecipe } = useSavedRecipes();
    const [isHovered, setIsHovered] = useState(false);

    const handleSaveClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isRecipeSaved(id)) {
            unsaveRecipe(id);
        } else {
            saveRecipe({ 
                id, 
                title, 
                img: img || image, 
                readyInMinutes, 
                servings, 
                healthScore 
            });
        }
    };

    const isGrid = viewMode === "grid";

    return (
        <motion.div
            className={`modern-card group ${!isGrid ? "flex flex-row h-32" : "flex flex-col h-full"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
        >
            {/* Image Container */}
            <div className={`relative overflow-hidden ${isGrid ? "aspect-[3/4]" : "w-32 sm:w-48 h-full flex-shrink-0"}`}>
                <LazyImage
                    src={img || image}
                    alt={title}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-80" />

                {/* Save Button */}
                <button
                    onClick={handleSaveClick}
                    className={`absolute right-3 top-3 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                        isRecipeSaved(id) 
                        ? "bg-accent text-white shadow-lg" 
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                >
                    <FaBookmark className={`h-4 w-4 ${isRecipeSaved(id) ? "scale-110" : ""}`} />
                </button>

                {/* Score Tag (Floating) */}
                {isGrid && healthScore > 70 && (
                    <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        HEALTHY
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className={`flex flex-1 flex-col justify-end p-4 sm:p-5 ${isGrid ? "absolute inset-0 pointer-events-none" : "bg-secondary/20"}`}>
                <div className="pointer-events-auto">
                    {/* Top Meta (for List view) */}
                    {!isGrid && (
                        <div className="mb-1 flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-accent">
                            <span>{readyInMinutes} MINS</span>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span>{servings} SERVINGS</span>
                        </div>
                    )}

                    <h3 className={`font-outfit font-bold text-white transition-colors group-hover:text-accent-light ${isGrid ? "text-xl leading-tight" : "text-base sm:text-lg line-clamp-1"}`}>
                        {title}
                    </h3>

                    <div className={`mt-3 flex items-center gap-4 transition-all duration-500 ${isGrid ? "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-100"}`}>
                        <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <FaClock className="text-accent" />
                            <span>{readyInMinutes}m</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <FaStar className="text-yellow-500" />
                            <span>{healthScore}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <FaHeart className="text-rose-500" />
                            <span>{servings}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interaction Layer for Grid */}
            {isGrid && (
                <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {/* Add visual button or link if needed, usually the whole card is a link */}
                </div>
            )}
        </motion.div>
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
