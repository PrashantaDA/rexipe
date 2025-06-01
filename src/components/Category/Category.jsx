/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Category = ({ title, categories, type }) => {
	const location = useLocation();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const getDescription = () => {
		if (type === "cuisine") {
			return "Explore authentic recipes from different cultures around the world. From traditional dishes to modern fusion cuisine, discover the rich flavors and techniques that make each cuisine unique.";
		}
		return "Find recipes that match your dietary preferences and lifestyle. Whether you're following a specific diet or looking for healthier alternatives, we've got you covered with delicious and nutritious options.";
	};

	return (
		<section className="container mx-auto px-4 py-16">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="space-y-12"
			>
				{/* Header */}
				<div className="text-center">
					<motion.h2
						variants={itemVariants}
						className="mb-4 font-handlee text-4xl font-bold text-accent md:text-5xl"
					>
						{title}
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className="mx-auto max-w-2xl text-lg text-normal/80"
					>
						{getDescription()}
					</motion.p>
				</div>

				{/* Categories Grid */}
				<motion.div
					variants={containerVariants}
					className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
				>
					{categories.map((category) => (
						<motion.div
							key={category.path}
							variants={itemVariants}
							className="group relative h-[280px] overflow-hidden rounded-2xl"
						>
							<Link
								to={category.path}
								className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center"
							>
								{/* Background Gradient */}
								<motion.div
									className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-primary/80"
									initial={false}
									animate={{
										backgroundPosition: ["0% 0%", "100% 100%"],
									}}
									transition={{
										duration: 10,
										repeat: Infinity,
										repeatType: "reverse",
									}}
									style={{ backgroundSize: "200% 200%" }}
								/>

								{/* Glass Effect Overlay */}
								<div className="absolute inset-0 backdrop-blur-[2px]" />

								{/* Content */}
								<div className="relative z-10 flex h-full flex-col items-center justify-center">
									{/* Icon Container */}
									<motion.div
										className="mb-6 rounded-full bg-white/10 p-6 backdrop-blur-sm"
										whileHover={{ scale: 1.1, rotate: 5 }}
										transition={{ type: "spring", stiffness: 300 }}
									>
										<div className="text-4xl text-white">{category.icon}</div>
									</motion.div>

									{/* Category Name */}
									<h3 className="mb-4 font-handlee text-3xl font-bold text-white drop-shadow-lg">{category.name}</h3>

									{/* Explore Button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-auto"
									>
										<div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
											<span>Explore</span>
											<FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
										</div>
									</motion.div>
								</div>

								{/* Active Indicator */}
								{location.pathname === category.path && (
									<motion.div
										layoutId={`active-${type}`}
										className="absolute inset-0 rounded-2xl border-2 border-white"
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
									/>
								)}

								{/* Hover Overlay */}
								<motion.div
									className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									initial={false}
								/>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* View All Button */}
				<motion.div
					variants={itemVariants}
					className="mt-12 text-center"
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-block"
					>
						<Link
							to={type === "cuisine" ? "/cuisine/Italian" : "/diet/Vegan"}
							className="rounded-full bg-accent px-8 py-3 font-semibold text-primary transition-colors hover:bg-tertiary"
						>
							View All {type === "cuisine" ? "Cuisines" : "Diets"}
						</Link>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Category;
