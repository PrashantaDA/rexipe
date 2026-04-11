import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBasket, FaTrash, FaCheckCircle, FaRegCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSavedRecipes from "../hooks/useSavedRecipes";
import { commonStyles } from "../utils/styles";

const ShoppingList = () => {
    const { 
        shoppingList, 
        removeFromShoppingList, 
        toggleShoppingItem, 
        clearShoppingList 
    } = useSavedRecipes();

    const completedCount = shoppingList.filter(item => item.completed).length;
    const progress = shoppingList.length > 0 ? (completedCount / shoppingList.length) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen pt-32 pb-20 ${commonStyles.gradientBg}`}
        >
            <div className={commonStyles.container}>
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                            <FaShoppingBasket className="h-8 w-8" />
                        </div>
                        <h1 className={commonStyles.heading2}>Shopping List</h1>
                        <p className={commonStyles.subtitle}>Your personalized grocery collection.</p>
                    </div>
                    
                    {shoppingList.length > 0 && (
                        <button 
                            onClick={clearShoppingList}
                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/30 hover:text-rose-500 transition-colors"
                        >
                            <FaTrash className="h-3 w-3" /> Clear Everything
                        </button>
                    )}
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-3xl">
                    {!shoppingList.length ? (
                        <div className="glass-card flex flex-col items-center gap-6 rounded-[2rem] p-12 text-center">
                            <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                                <FaShoppingBasket className="h-12 w-12" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">No ingredients here yet</h3>
                                <p className="text-white/40">Browse recipes and add ingredients to your list to get started.</p>
                            </div>
                            <Link to="/featured" className="modern-button group">
                                Explore Recipes <FaArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Progress Bar */}
                            <div className="glass-card overflow-hidden rounded-2xl p-6">
                                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-white/40">Task Completion</span>
                                    <span className="text-accent">{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/5">
                                    <motion.div 
                                        className="h-full rounded-full bg-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* List Content */}
                            <div className="glass-card overflow-hidden rounded-3xl">
                                <ul className="divide-y divide-white/5">
                                    <AnimatePresence initial={false}>
                                        {shoppingList.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className={`group flex items-center justify-between p-5 transition-colors ${item.completed ? "bg-white/[0.02]" : "hover:bg-white/[0.04]"}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => toggleShoppingItem(item.id)}
                                                        className={`text-2xl transition-all ${item.completed ? "text-accent" : "text-white/20 hover:text-white/40"}`}
                                                    >
                                                        {item.completed ? <FaCheckCircle /> : <FaRegCircle />}
                                                    </button>
                                                    <div className={item.completed ? "opacity-40" : ""}>
                                                        <h4 className={`font-semibold text-white ${item.completed ? "line-through" : ""}`}>
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-xs text-white/40">
                                                            {item.amount} {item.unit}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => removeFromShoppingList(item.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-rose-500 transition-all"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            </div>
                            
                            <div className="flex justify-center pt-8">
                                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors">
                                    <FaArrowLeft className="h-3 w-3" /> Still missing something? Find more
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ShoppingList;
