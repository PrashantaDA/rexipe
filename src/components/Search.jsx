import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/searched/${searchTerm}`);
		setSearchTerm("");
	};

	return (
		<motion.form
			onSubmit={handleSubmit}
			className="xs:w-4/5 md:w-[70%] mx-auto my-10 shadow-md"
			initial={{ y: -5 }}
			animate={{ y: 0 }}
			transition={{
				type: "spring",
				stiffness: 150,
				damping: 25,
			}}
		>
			<motion.div
				className="flex items-center justify-between gap-4 bg-dark bg-opacity-90 text-primary px-4 py-1 rounded-md"
				whileHover={{ scale: 1.01 }}
				whileTap={{ scale: 0.99 }}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 30,
				}}
			>
				<FaSearch size={20} />
				<motion.input
					initial={{ opacity: 0.9 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					whileTap={{ scale: 0.995 }}
					className="bg-primary w-full text-normal outline-none border-none p-2 text-xl bg-opacity-0 placeholder:text-normal placeholder:opacity-70"
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder="Search Recipe..."
				/>
			</motion.div>
		</motion.form>
	);
};
export default Search;
