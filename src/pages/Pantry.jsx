import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaPlus, FaTimes, FaSearch, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { commonStyles } from "../utils/styles";

const Pantry = () => {
    const [ingredient, setIngredient] = useState("");
    const [pantry, setPantry] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addIngredient = (e) => {
        e.preventDefault();
        const value = ingredient.trim().toLowerCase();
        if (value && !pantry.includes(value)) {
            setPantry([...pantry, value]);
            setIngredient("");
        }
    };

    const removeIngredient = (ing) => {
        setPantry(pantry.filter((item) => item !== ing));
    };

    const findRecipes = async () => {
        if (pantry.length === 0) return;
        
        try {
            setIsLoading(true);
            setError(null);
            const ingredientsStr = pantry.join(",");
            const response = await fetch(
                `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${import.meta.env.VITE_API_KEY}&ingredients=${ingredientsStr}&number=12&ranking=1`
            );
            
            if (!response.ok) throw new Error("Failed to find recipes. Check your connection.");
            
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-search when pantry changes
    useEffect(() => {
        if (pantry.length > 0) {
            const timeoutId = setTimeout(findRecipes, 800);
            return () => clearTimeout(timeoutId);
        } else {
            setRecipes([]);
        }
    }, [pantry]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen pt-32 pb-20 ${commonStyles.gradientBg}`}
        >
            <div className={commonStyles.container}>
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/20 text-accent"
                    >
                        <FaBoxOpen className="h-10 w-10" />
                    </motion.div>
                    <h1 className={commonStyles.heading2}>Your Virtual Pantry</h1>
                    <p className={commonStyles.subtitle}>Tell us what you have, we&apos;ll tell you what to cook.</p>
                </div>

                {/* Search / Input Area */}
                <div className="mx-auto mb-16 max-w-2xl">
                    <form onSubmit={addIngredient} className="relative mb-6">
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            placeholder="Add an ingredient (e.g. Tomato, Chicken, Garlic)..."
                            className="w-full rounded-2xl border border-white/10 bg-secondary/30 p-5 pr-16 text-lg text-white shadow-2xl backdrop-blur-md transition-all focus:border-accent/50 focus:outline-none focus:ring-4 focus:ring-accent/5"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white transition-transform active:scale-90"
                        >
                            <FaPlus />
                        </button>
                    </form>

                    {/* Pantry Chips */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <AnimatePresence>
                            {pantry.map((ing) => (
                                <motion.span
                                    key={ing}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-sm"
                                >
                                    {ing}
                                    <button onClick={() => removeIngredient(ing)} className="hover:text-white">
                                        <FaTimes />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>
                    
                    {pantry.length === 0 && (
                        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/30 italic">
                            <FaInfoCircle /> Add some ingredients to start your gourmet search
                        </div>
                    )}
                </div>

                {/* Results Area */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <LoadingSpinner key="loader" />
                    ) : recipes.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={commonStyles.grid.responsive}
                        >
                            {recipes.map((recipe) => (
                                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                                    <Card
                                        id={recipe.id}
                                        title={recipe.title}
                                        image={recipe.image}
                                        readyInMinutes={recipe.readyInMinutes} // findByIngredients doesn't always provide these, but we'll try
                                        healthScore={75} // placeholder if not in findByIngredients
                                    />
                                </Link>
                            ))}
                        </motion.div>
                    ) : pantry.length > 0 && !isLoading && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-white/40">Searching for the best matches...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {error && (
                    <div className="mt-8 rounded-2xl bg-rose-500/10 p-6 text-center text-rose-500 border border-rose-500/20">
                        {error}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Pantry;
