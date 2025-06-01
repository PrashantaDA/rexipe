/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ img, title, id, readyInMinutes, servings, healthScore }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		// Scroll to top first
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// Then navigate after a small delay to allow scroll animation
		setTimeout(() => {
			navigate(id ? `/recipe/${id}` : "#");
		}, 100);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			whileHover={{ y: -4 }}
			className="group relative h-[300px] overflow-hidden rounded-xl bg-primary shadow-lg transition-all duration-300 hover:shadow-xl"
		>
			<Link
				to={id ? `/recipe/${id}` : "#"}
				onClick={handleClick}
				className="block h-full"
			>
				{/* Image Container - Fixed height */}
				<div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-accent/5 to-primary/5">
					{/* Loading Placeholder */}
					{!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-accent/10 to-primary/10" />}
					{/* Image */}
					<motion.img
						src={img}
						alt={title}
						className={`h-full w-full object-cover transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} group-hover:scale-110`}
						onLoad={() => setImageLoaded(true)}
						initial={false}
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
					/>
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
				</div>

				{/* Content - Fixed height */}
				<div className="flex h-[90px] flex-col justify-between p-4">
					{/* Title */}
					<h3 className="font-handlee text-xl font-bold text-accent line-clamp-2 transition-colors duration-300 group-hover:text-white">{title}</h3>

					{/* Recipe Stats - Only show if available */}
					{(readyInMinutes || servings || healthScore) && (
						<div className="flex flex-wrap gap-2">
							{readyInMinutes && (
								<motion.span
									whileHover={{ scale: 1.05 }}
									className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
								>
									<span className="text-sm">⏱️</span>
									{readyInMinutes}m
								</motion.span>
							)}
							{servings && (
								<motion.span
									whileHover={{ scale: 1.05 }}
									className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
								>
									<span className="text-sm">👥</span>
									{servings}
								</motion.span>
							)}
							{healthScore && (
								<motion.span
									whileHover={{ scale: 1.05 }}
									className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
								>
									<span className="text-sm">❤️</span>
									{healthScore}%
								</motion.span>
							)}
						</div>
					)}
				</div>

				{/* Hover Indicator */}
				<div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 transition-all duration-300 group-hover:ring-accent/20" />
			</Link>
		</motion.div>
	);
};

export default Card;
