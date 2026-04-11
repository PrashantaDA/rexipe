import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaUsers, FaHeart, FaList, FaBookOpen, FaPlus, FaShoppingCart, FaStar } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import { pageVariants, containerVariants, itemVariants, fadeInUp } from "../utils/animations";
import { commonStyles } from "../utils/styles";
import useSavedRecipes from "../hooks/useSavedRecipes";
import { useToast } from "../components/common/Toast";

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [activeTab, setActiveTab] = useState("ingredients");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToShoppingList, shoppingList } = useSavedRecipes();
    const { addToast } = useToast();
    const [addedItems, setAddedItems] = useState(new Set());

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
                if (!response.ok) throw new Error("Failed to fetch recipe.");
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleAddIngredient = (ingredient) => {
        addToShoppingList({
            id: ingredient.id || Math.random().toString(36).substr(2, 9),
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            image: ingredient.image
        });
        setAddedItems(prev => new Set([...prev, ingredient.name]));
        addToast(`${ingredient.name} added to groceries!`);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
    if (!recipe) return null;

    const { title, image, summary, extendedIngredients, analyzedInstructions, readyInMinutes, servings, healthScore } = recipe;

    const renderIngredients = () => (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            {extendedIngredients?.map((ingredient, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.03] p-4 border border-white/5 hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/5">
                            <img 
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                                alt={ingredient.name} 
                                className="h-full w-full object-contain p-2"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-white capitalize">{ingredient.name}</p>
                            <p className="text-xs text-white/40">{ingredient.amount} {ingredient.unit}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => handleAddIngredient(ingredient)}
                        className={`group flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                            addedItems.has(ingredient.name) 
                            ? "bg-emerald-500/20 text-emerald-500" 
                            : "bg-white/5 text-white/40 hover:bg-accent hover:text-white"
                        }`}
                        title="Add to Shopping List"
                    >
                        {addedItems.has(ingredient.name) ? <FaShoppingCart className="h-4 w-4" /> : <FaPlus className="h-3 w-3" />}
                    </button>
                </motion.div>
            ))}
        </motion.div>
    );

    const renderInstructions = () => (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {analyzedInstructions.length > 0 ? (
                analyzedInstructions[0].steps.map((step, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative pl-12">
                        <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-sm font-black text-accent">
                            {index + 1}
                        </span>
                        <div className="rounded-2xl bg-white/[0.03] p-6 border border-white/5">
                            <p className="text-white/80 leading-relaxed">{step.step}</p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <p className="text-center py-10 text-white/20 italic">No detailed steps provided for this recipe.</p>
            )}
        </motion.div>
    );

    return (
        <motion.div 
            variants={pageVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className={`min-h-screen pt-28 pb-20 ${commonStyles.gradientBg}`}
        >
            <div className={commonStyles.container}>
                <Breadcrumb currentPage={title} />
                
                {/* Hero section for Recipe */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
                    <motion.div variants={fadeInUp} className="relative">
                        <div className="aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-white/10">
                            <img src={image} alt={title} className="h-full w-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 glass-card rounded-3xl p-6 shadow-2xl flex items-center gap-6">
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Health</p>
                                <p className="text-2xl font-black text-emerald-400">{healthScore}</p>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Time</p>
                                <p className="text-2xl font-black text-white">{readyInMinutes}m</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.h1 variants={fadeInUp} className={commonStyles.heading2}>{title}</motion.h1>
                        
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            {[
                                { icon: <FaClock />, label: "Duration", val: `${readyInMinutes} min` },
                                { icon: <FaUsers />, label: "Portions", val: `${servings} people` },
                                { icon: <FaStar />, label: "Score", val: healthScore }
                            ].map(stat => (
                                <div key={stat.label} className="flex flex-col gap-1 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                                        {stat.icon} {stat.label}
                                    </span>
                                    <span className="text-white font-black">{stat.val}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div 
                            variants={fadeInUp}
                            className="text-white/40 prose prose-invert max-w-none text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-700 cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: summary }}
                        />
                        
                        <div className="flex gap-4">
                            <button className="modern-button px-8">Full Screen Mode</button>
                            <button className={commonStyles.button.secondary}>Print Recipe</button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center gap-4 mb-12">
                        {[
                            { id: "ingredients", icon: <FaList />, label: "Ingredients" },
                            { id: "instructions", icon: <FaBookOpen />, label: "Instructions" }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-bold transition-all ${
                                    activeTab === tab.id 
                                    ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                    : "bg-white/5 text-white/40 hover:bg-white/10"
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "ingredients" ? renderIngredients() : renderInstructions()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Recipe;
