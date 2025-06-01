import { motion } from "framer-motion";
import { FaUtensils, FaGlobeAmericas, FaHeart } from "react-icons/fa";
import Popular from "../components/Popular";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const Home = () => {
	const features = [
		{
			icon: <FaUtensils className="text-4xl" />,
			title: "Discover Recipes",
			description: "Explore thousands of recipes from around the world, curated just for you.",
		},
		{
			icon: <FaGlobeAmericas className="text-4xl" />,
			title: "Global Cuisines",
			description: "Experience authentic flavors from different cultures and regions.",
		},
		{
			icon: <FaHeart className="text-4xl" />,
			title: "Healthy Choices",
			description: "Find recipes that match your dietary preferences and health goals.",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen"
		>
			{/* Hero Section */}
			<section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
				{/* Background Image with Overlay */}
				<div className="absolute inset-0">
					<img
						src="/hero-bg.jpg"
						alt="Hero Background"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />
					{/* Animated gradient overlay */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20"
						animate={{
							backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "linear",
						}}
						style={{ backgroundSize: "200% 200%" }}
					/>
				</div>

				{/* Hero Content */}
				<div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="max-w-4xl"
					>
						<motion.h1
							variants={itemVariants}
							className="mb-6 font-handlee text-5xl font-bold text-accent drop-shadow-lg md:text-7xl"
						>
							Discover Your Next Recipe
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className="mb-8 text-lg text-normal/90 md:text-xl"
						>
							Explore thousands of recipes from around the world. Find your perfect dish today.
						</motion.p>
						<motion.div
							variants={itemVariants}
							className="mx-auto w-full max-w-2xl"
						>
							<Search />
						</motion.div>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
				>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="text-accent"
					>
						<svg
							className="mx-auto h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
						<span className="mt-2 block text-sm">Scroll to explore</span>
					</motion.div>
				</motion.div>
			</section>

			{/* Features Section */}
			<section className="relative -mt-20 bg-gradient-to-b from-primary to-primary/95 py-24">
				<div className="container mx-auto px-4">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid gap-8 md:grid-cols-3"
					>
						{features.map((feature) => (
							<motion.div
								key={feature.title}
								variants={itemVariants}
								className="glass-effect group rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl"
							>
								<motion.div
									className="mb-4 inline-block text-accent"
									whileHover={{ scale: 1.1, rotate: 5 }}
									transition={{ type: "spring", stiffness: 300 }}
								>
									{feature.icon}
								</motion.div>
								<h3 className="mb-2 font-handlee text-2xl font-bold text-accent">{feature.title}</h3>
								<p className="text-normal/80">{feature.description}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<main className="relative z-20 space-y-24 bg-gradient-to-b from-primary/95 to-primary pb-24">
				{/* Popular Section */}
				<section className="container mx-auto px-4">
					<Popular />
				</section>

				{/* Call to Action */}
				<section className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="glass-effect rounded-2xl p-12 text-center"
					>
						<h2 className="mb-4 font-handlee text-4xl font-bold text-accent">Ready to Start Cooking?</h2>
						<p className="mb-8 text-lg text-normal/80">Join thousands of food enthusiasts and discover your next favorite recipe.</p>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-block"
						>
							<Link
								to="/featured"
								className="rounded-xl bg-accent px-8 py-3 font-semibold text-primary transition-colors hover:bg-tertiary"
							>
								Explore Recipes
							</Link>
						</motion.div>
					</motion.div>
				</section>
			</main>
		</motion.div>
	);
};

export default Home;
