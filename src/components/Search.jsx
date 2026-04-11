import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/searched/${searchTerm}`);
            setSearchTerm("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto"
        >
            <div
                className={`group relative flex items-center transition-all duration-500 ease-out ${
                    isFocused ? "scale-[1.02]" : ""
                }`}
            >
                {/* Search Background with Blur */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isFocused 
                    ? "bg-white/10 blur-xl opacity-100" 
                    : "bg-white/5 blur-md opacity-0 group-hover:opacity-40"
                }`} />

                {/* Input Container */}
                <div className={`relative flex w-full items-center gap-4 rounded-2xl border bg-secondary/40 px-6 py-4 backdrop-blur-xl transition-all duration-300 ${
                    isFocused 
                    ? "border-accent/50 shadow-2xl ring-4 ring-accent/5" 
                    : "border-white/10 group-hover:border-white/20"
                }`}>
                    <FaSearch className={`text-xl transition-colors duration-300 ${
                        isFocused ? "text-accent" : "text-white/20"
                    }`} />
                    
                    <input
                        className="w-full bg-transparent text-lg font-medium text-white placeholder:text-white/20 focus:outline-none"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Discover recipes, ingredients..."
                    />

                    <AnimatePresence>
                        {searchTerm.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="hidden sm:flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-light"
                                type="submit"
                            >
                                Search
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Quick Suggestions */}
            {!isFocused && !searchTerm && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {["Pasta", "Chicken", "Healthy", "Desserts"].map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => navigate(`/searched/${tag}`)}
                            className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-accent transition-colors"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}
        </form>
    );
};

export default Search;
