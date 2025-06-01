import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

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
		<motion.form
			onSubmit={handleSubmit}
			className="w-full"
			initial={{ y: -5 }}
			animate={{ y: 0 }}
			transition={{
				type: "spring",
				stiffness: 150,
				damping: 25,
			}}
		>
			<motion.div
				className={`glass-effect flex items-center justify-between gap-4 rounded-xl px-6 py-4 shadow-lg transition-all duration-300 ${isFocused ? "ring-2 ring-accent" : ""}`}
				whileHover={{ scale: 1.01 }}
				whileTap={{ scale: 0.99 }}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 30,
				}}
			>
				<FaSearch className={`text-xl transition-colors duration-300 ${isFocused ? "text-accent" : "text-normal/60"}`} />
				<motion.input
					initial={{ opacity: 0.9 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					whileTap={{ scale: 0.995 }}
					className="modern-input w-full bg-transparent text-lg placeholder:text-normal/60 focus:outline-none"
					type="text"
					value={searchTerm}
					onChange={handleChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="Search for recipes, cuisines, or ingredients..."
				/>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="rounded-lg bg-accent px-6 py-2 font-semibold text-primary transition-colors hover:bg-tertiary"
					type="submit"
				>
					Search
				</motion.button>
			</motion.div>
		</motion.form>
	);
};

export default Search;
