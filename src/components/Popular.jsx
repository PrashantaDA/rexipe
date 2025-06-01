import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "./Card";

const Popular = () => {
	const [popular, setPopular] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getPopular();
	}, []);

	const getPopular = async () => {
		try {
			setIsLoading(true);
			const check = localStorage.getItem("popular");
			if (check) {
				setPopular(JSON.parse(check));
			} else {
				const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=12`);
				const data = await api.json();
				localStorage.setItem("popular", JSON.stringify(data.recipes));
				setPopular(data.recipes);
			}
		} catch (error) {
			console.error("Error fetching popular recipes:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					className="h-12 w-12 rounded-full border-4 border-accent border-t-transparent"
				/>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="glass-effect rounded-2xl p-8 shadow-xl"
		>
			<div className="mb-12 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="font-handlee text-5xl font-bold text-accent drop-shadow-lg"
				>
					Popular Picks
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4 text-lg text-normal/80"
				>
					Discover what everyone&apos;s cooking
				</motion.p>
			</div>

			<Splide
				options={{
					perPage: 4,
					pagination: false,
					arrows: true,
					rewind: true,
					gap: "2rem",
					breakpoints: {
						1200: {
							perPage: 3,
							gap: "2rem",
						},
						768: {
							perPage: 2,
							gap: "1.5rem",
						},
						640: {
							perPage: 1,
							gap: "1rem",
						},
					},
				}}
				className="mx-auto max-w-7xl"
			>
				{popular.map((recipe) => (
					<SplideSlide key={recipe.id}>
						<Link to={`/recipe/${recipe.id}`}>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								transition={{ duration: 0.3 }}
								className="h-full"
							>
								<Card
									img={recipe.image}
									title={recipe.title}
									id={recipe.id}
									readyInMinutes={recipe.readyInMinutes}
									servings={recipe.servings}
									healthScore={recipe.healthScore}
								/>
							</motion.div>
						</Link>
					</SplideSlide>
				))}
			</Splide>
		</motion.div>
	);
};

export default Popular;
