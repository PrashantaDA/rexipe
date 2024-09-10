import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "./Card";

const Popular = () => {
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		getPopular();
	}, []);

	const getPopular = async () => {
		const check = localStorage.getItem("popular");
		if (check) {
			setPopular(JSON.parse(check));
		} else {
			const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=12`);
			const data = await api.json();
			localStorage.setItem("popular", JSON.stringify(data.recipes));
			setPopular(data.recipes);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="my-10 bg-gradient-to-br from-primary via-normal to-primary py-10"
		>
			<div className="w-[90%] mx-auto">
				<h2 className="text-5xl font-bold mb-12 text-center text-dark drop-shadow-lg">Popular Picks</h2>
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
				>
					{popular.map((recipe) => (
						<SplideSlide key={recipe.id}>
							<Link to={`/recipe/${recipe.id}`}>
								<motion.div
									whileHover={{ scale: 1.05, rotate: 2 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.3 }}
								>
									<Card
										img={recipe.image}
										title={recipe.title}
									/>
								</motion.div>
							</Link>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</motion.div>
	);
};

export default Popular;
