import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaTrash, FaSort, FaThLarge, FaList, FaSearch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import useSavedRecipes from "../hooks/useSavedRecipes";
import { pageVariants, containerVariants, itemVariants } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const SavedRecipes = () => {
    const { savedRecipes, clearSavedRecipes } = useSavedRecipes();
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRecipes = useMemo(() => {
        let result = [...savedRecipes];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((recipe) => recipe.title.toLowerCase().includes(query));
        }
        result.sort((a, b) => {
            let comp = 0;
            if (sortBy === "name") comp = a.title.localeCompare(b.title);
            else if (sortBy === "time") comp = a.readyInMinutes - b.readyInMinutes;
            else if (sortBy === "health") comp = a.healthScore - b.healthScore;
            return sortOrder === "asc" ? comp : -comp;
        });
        return result;
    }, [savedRecipes, sortBy, sortOrder, searchQuery]);

    const handleSort = (newSort) => {
        if (sortBy === newSort) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        else { setSortBy(newSort); setSortOrder("asc"); }
    };

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
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
                    <div>
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                            <FaBookmark className="h-8 w-8" />
                        </div>
                        <h1 className={commonStyles.heading2}>Your Cookbook</h1>
                        <p className={commonStyles.subtitle}>Everything you&apos;ve saved for later.</p>
                    </div>
                </div>

                {/* Toolbar */}
                {savedRecipes.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 flex flex-wrap items-center justify-between gap-6 glass-card p-6 rounded-[2rem]"
                    >
                        {/* Search */}
                        <div className="relative flex-1 min-w-[280px]">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search your recipes..."
                                className="w-full rounded-2xl bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/40"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {/* Sort Controls */}
                            <div className="flex rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                                {["name", "time", "health"].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleSort(s)}
                                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${
                                            sortBy === s ? "bg-accent text-white shadow-lg" : "text-white/40 hover:text-white"
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            {/* View Mode */}
                            <div className="flex rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg ${viewMode === "grid" ? "text-accent" : "text-white/20"}`}
                                >
                                    <FaThLarge />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg ${viewMode === "list" ? "text-accent" : "text-white/20"}`}
                                >
                                    <FaList />
                                </button>
                            </div>

                            <button
                                onClick={clearSavedRecipes}
                                className="p-3 text-white/20 hover:text-rose-500 transition-colors"
                                title="Clear All"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Grid Area */}
                <AnimatePresence mode="wait">
                    {!savedRecipes.length ? (
                        <motion.div
                            key="empty-total"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card flex flex-col items-center gap-6 rounded-[3rem] p-20 text-center"
                        >
                            <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                                <FaBookmark className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Your cookbook is empty</h3>
                            <p className="max-w-xs text-white/40">Start exploring our collection and save the recipes that inspire you.</p>
                            <Link to="/featured" className="modern-button px-10">Discover Recipes</Link>
                        </motion.div>
                    ) : !filteredRecipes.length ? (
                        <motion.div
                            key="empty-filtered"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center"
                        >
                            <p className="text-white/20 italic">No matches found for &quot;{searchQuery}&quot;</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={viewMode === "grid" ? commonStyles.grid.responsive : "space-y-6 max-w-4xl mx-auto"}
                        >
                            {filteredRecipes.map((recipe) => (
                                <motion.div key={recipe.id} variants={itemVariants} className="relative group">
                                    <Link to={`/recipe/${recipe.id}`}>
                                        <Card
                                            id={recipe.id}
                                            title={recipe.title}
                                            image={recipe.image || recipe.img}
                                            readyInMinutes={recipe.readyInMinutes}
                                            healthScore={recipe.healthScore}
                                            viewMode={viewMode}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SavedRecipes;
