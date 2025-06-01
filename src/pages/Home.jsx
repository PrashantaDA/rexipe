import { motion } from "framer-motion";
import Popular from "../components/Popular";
import DietCategory from "../components/Category/DietCategory";
import CuisineCategory from "../components/Category/CuisineCategory";
import Search from "../components/Search";

const Home = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen"
		>
			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
				{/* Background Image with Overlay */}
				<div className="absolute inset-0">
					<img
						src="/hero-bg.jpg"
						alt="Hero Background"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />
				</div>

				{/* Hero Content */}
				<div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-6 font-handlee text-5xl font-bold text-accent md:text-7xl"
					>
						Discover Your Next Recipe
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-8 max-w-2xl text-lg text-normal/90 md:text-xl"
					>
						Explore thousands of recipes from around the world. Find your perfect dish today.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="w-full max-w-2xl"
					>
						<Search />
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<main className="relative z-20 -mt-20 space-y-24 pb-24">
				{/* Popular Section */}
				<section className="container mx-auto px-4">
					<Popular />
				</section>

				{/* Categories Sections */}
				<section className="space-y-24">
					<DietCategory />
					<CuisineCategory />
				</section>
			</main>
		</motion.div>
	);
};

export default Home;
