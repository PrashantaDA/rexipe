import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRandom, FaUtensils, FaClock, FaSync, FaTrash } from "react-icons/fa";
import Card from "../components/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";
import { useToast } from "../components/common/Toast";

const CACHE_KEY = "featured_recipes";
const CACHE_TIMESTAMP_KEY = "featured_recipes_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const Featured = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { addToast } = useToast();

    const isCacheValid = () => {
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (!timestamp) return false;
        return Date.now() - parseInt(timestamp) < CACHE_DURATION;
    };

    const getCachedRecipes = () => {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            if (cachedData && timestamp) {
                setLastUpdated(new Date(parseInt(timestamp)));
                return JSON.parse(cachedData);
            }
        } catch (err) {
            console.error("Error reading cache:", err);
            localStorage.removeItem(CACHE_KEY);
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
        }
    };

    const clearCache = () => {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        setLastUpdated(null);
        setRecipes([]);
        addToast("Cache cleared", "info");
        fetchRandomRecipes(true);
    };

    const fetchRandomRecipes = async (forceRefresh = false) => {
        try {
            setIsLoading(true);
            setError(null);

            if (!forceRefresh && isCacheValid()) {
                const cached = getCachedRecipes();
                if (cached && cached.length > 0) {
                    setRecipes(cached);
                    setIsLoading(false);
                    return;
                }
            }

            setIsRefreshing(true);
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=12&tags=main course`);

            if (!response.ok) throw new Error("API Limit reached or network error.");

            const data = await response.json();
            const recipesData = data.recipes || [];

            cacheRecipes(recipesData);
            setRecipes(recipesData);
            if (forceRefresh) addToast("Gourmet selection refreshed!");
        } catch (err) {
            setError(err.message);
            const cached = getCachedRecipes();
            if (cached) setRecipes(cached);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRandomRecipes();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error && recipes.length === 0) return <ErrorState message={error} onRetry={() => fetchRandomRecipes(true)} />;

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`min-h-screen pt-32 pb-20 ${commonStyles.gradientBg}`}
        >
            <div className={commonStyles.container}>
                {/* Header Section */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent"
                    >
                        <FaRandom className="h-8 w-8" />
                    </motion.div>
                    <h1 className={commonStyles.heading2}>Daily Featured</h1>
                    <p className={commonStyles.subtitle}>Handpicked gourmet inspirations for your next meal.</p>

                    <div className="mt-8 flex items-center gap-4">
                        <button
                            onClick={() => fetchRandomRecipes(true)}
                            disabled={isRefreshing}
                            className={`${commonStyles.button.primary} flex items-center gap-2`}
                        >
                            <FaSync className={isRefreshing ? "animate-spin" : ""} /> Refresh
                        </button>
                        <button
                            onClick={clearCache}
                            className={commonStyles.button.secondary}
                        >
                            Clear Cache
                        </button>
                    </div>
                    
                    {lastUpdated && (
                        <p className="mt-4 text-[10px] uppercase font-bold tracking-widest text-white/20">
                            Last Refreshed: {lastUpdated.toLocaleTimeString()}
                        </p>
                    )}
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={commonStyles.grid.responsive}
                >
                    {recipes.map((recipe) => (
                        <motion.div key={recipe.id} variants={itemVariants}>
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
            </div>
        </motion.div>
    );
};

export default Featured;
