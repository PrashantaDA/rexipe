import { motion } from "framer-motion";
import { FaUtensils, FaGlobeAmericas, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popular from "../components/Popular";
import Search from "../components/Search";
import { pageVariants, containerVariants, itemVariants, hoverScale, fadeInUp } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const Home = () => {
	const features = [
		{
			icon: <FaUtensils className="h-8 w-8" />,
			title: "Discover Recipes",
			description: "Explore thousands of recipes from around the world, curated just for you.",
		},
		{
			icon: <FaGlobeAmericas className="h-8 w-8" />,
			title: "Global Cuisines",
			description: "Experience authentic flavors from different cultures and regions.",
		},
		{
			icon: <FaHeart className="h-8 w-8" />,
			title: "Healthy Choices",
			description: "Find recipes that match your dietary preferences and health goals.",
		},
	];

	return (
		<motion.div
			variants={pageVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="min-h-screen"
		>
			{/* Hero Section */}
			<section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
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
							className={commonStyles.heading1}
						>
							Discover Your Next Recipe
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className={commonStyles.subtitle}
						>
							Explore thousands of recipes from around the world. Find your perfect dish today.
						</motion.p>
						<motion.div
							variants={itemVariants}
							className="mx-auto mt-8 w-full max-w-2xl"
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
						<FaChevronDown className="mx-auto h-6 w-6" />
						<span className="mt-2 block text-sm">Scroll to explore</span>
					</motion.div>
				</motion.div>
			</section>

			{/* Features Section */}
			<section className="relative -mt-20 bg-gradient-to-b from-primary to-primary/95 py-24">
				{/* Background Pattern */}
				<div className={commonStyles.dotPattern} />

				<div className={commonStyles.container}>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid gap-8 md:grid-cols-3"
					>
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								variants={fadeInUp}
								transition={{ delay: index * 0.1 }}
								className={`${commonStyles.glassCard} group p-8 text-center transition-all duration-300 hover:shadow-xl`}
							>
								<motion.div
									className="mb-4 inline-block text-accent"
									variants={hoverScale}
									whileHover="hover"
								>
									{feature.icon}
								</motion.div>
								<h3 className={`${commonStyles.heading3} mb-2`}>{feature.title}</h3>
								<p className={commonStyles.body}>{feature.description}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<main className="relative z-20 space-y-24 bg-gradient-to-b from-primary/95 to-primary pb-24">
				{/* Popular Section */}
				<section className={commonStyles.container}>
					<Popular />
				</section>

				{/* Call to Action */}
				<section className={commonStyles.container}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className={`${commonStyles.glassCard} p-12 text-center`}
					>
						<h2 className={`${commonStyles.heading2} mb-4`}>Ready to Start Cooking?</h2>
						<p className={`${commonStyles.subtitle} mb-8`}>Join thousands of food enthusiasts and discover your next favorite recipe.</p>
						<motion.div
							variants={hoverScale}
							whileHover="hover"
							whileTap="tap"
							className="inline-block"
						>
							<Link
								to="/featured"
								className={commonStyles.button.primary}
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
