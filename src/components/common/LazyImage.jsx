import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const LazyImage = ({ src, alt, className, placeholder = "/placeholder.jpg" }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);
	const imgRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = src;
						observer.unobserve(img);
					}
				});
			},
			{
				rootMargin: "50px 0px",
				threshold: 0.01,
			}
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => {
			if (imgRef.current) {
				observer.unobserve(imgRef.current);
			}
		};
	}, [src]);

	const handleLoad = () => {
		setIsLoaded(true);
	};

	const handleError = () => {
		setError(true);
		setIsLoaded(true);
	};

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Placeholder */}
			<AnimatePresence>
				{!isLoaded && (
					<motion.div
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0"
					>
						<img
							src={placeholder}
							alt="Loading..."
							className="h-full w-full object-cover blur-sm"
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Actual Image */}
			<motion.img
				ref={imgRef}
				alt={alt}
				className={`h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
				onLoad={handleLoad}
				onError={handleError}
				initial={{ opacity: 0 }}
				animate={{ opacity: isLoaded ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Error State */}
			{error && (
				<div className="absolute inset-0 flex items-center justify-center bg-primary/80">
					<span className="text-sm text-normal/60">Failed to load image</span>
				</div>
			)}
		</div>
	);
};

LazyImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
	placeholder: PropTypes.string,
};

export default LazyImage;
