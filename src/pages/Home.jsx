import { motion } from "framer-motion";
import { FaUtensils, FaGlobeAmericas, FaHeart, FaChevronDown, FaBoxOpen, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popular from "../components/Popular";
import Search from "../components/Search";
import { pageVariants, containerVariants, itemVariants, fadeInUp, hoverScale } from "../utils/animations";
import { commonStyles } from "../utils/styles";

const Home = () => {
    const features = [
        {
            icon: <FaMagic className="h-8 w-8" />,
            title: "Smart Pantry",
            description: "Have ingredients but no plan? Our pantry assistant finds recipes for exactly what you have.",
            link: "/pantry"
        },
        {
            icon: <FaGlobeAmericas className="h-8 w-8" />,
            title: "Global Flavors",
            description: "From Italian classics to hidden Thai gems, experience the world through your plate.",
            link: "/featured"
        },
        {
            icon: <FaHeart className="h-8 w-8" />,
            title: "Wellness First",
            description: "Nutrient-rich, health-scored recipes tailored to your specific dietary lifestyle.",
            link: "/diet/keto"
        },
    ];

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-x-hidden min-h-screen bg-primary"
        >
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] w-full">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-bg.jpg"
                        alt="Gourmet Background"
                        className="h-full w-full object-cover grayscale-[20%] brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/80 to-primary" />
                    
                    {/* Floating Aura Glows */}
                    <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
                    <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[150px]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                    <motion.div
                        variants={containerVariants}
                        className="max-w-5xl text-center"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">The Art of Cooking</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className={`${commonStyles.heading1} tracking-tight`}
                        >
                            Elevate Your <br /> 
                            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Culinary Experience</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className={`${commonStyles.subtitle} mx-auto mt-8 max-w-2xl text-white/50`}
                        >
                            Access thousands of high-end recipes curated for the modern chef. 
                            Find inspiration, manage your pantry, and master the kitchen.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mx-auto mt-12 w-full max-w-3xl"
                        >
                            <Search />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Animated Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Discover</span>
                        <FaChevronDown className="h-4 w-4" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Area */}
            <section className="relative z-10 -mt-24 pointer-events-none">
                <div className={commonStyles.container}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid gap-6 md:grid-cols-3 pointer-events-auto"
                    >
                        {features.map((feature, index) => (
                            <Link key={feature.title} to={feature.link}>
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -10 }}
                                    className="glass-card flex flex-col items-center p-10 text-center transition-all duration-500 hover:bg-white/[0.08]"
                                >
                                    <div className="mb-6 rounded-2xl bg-accent/10 p-4 text-accent">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-outfit text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Content Sections */}
            <main className="relative z-20 space-y-32 py-32">
                <section className={commonStyles.container}>
                    <div className="mb-16 flex items-end justify-between px-2">
                        <div>
                            <h2 className={commonStyles.heading2}>Popular Picks</h2>
                            <p className="mt-2 text-white/30 italic">Handpicked favorites from our community</p>
                        </div>
                        <Link to="/featured" className="hidden sm:block text-sm font-bold text-accent hover:text-accent-light uppercase tracking-widest transition-colors">
                            View All Recipes &rarr;
                        </Link>
                    </div>
                    <Popular />
                </section>

                {/* Call to Action Grid Section */}
                <section className={commonStyles.container}>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-accent/20 to-transparent p-12 border border-white/5"
                        >
                            <FaBoxOpen className="absolute -right-8 -top-8 h-48 w-48 text-white/5 rotate-12" />
                            <h3 className="font-outfit text-3xl font-black text-white mb-4">Empty Fridge?</h3>
                            <p className="text-white/60 mb-8 max-w-sm">Use our Smart Pantry feature to find recipes based on what you already have at home.</p>
                            <Link to="/pantry" className="modern-button px-10">Start Searching</Link>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent p-12 border border-white/5"
                        >
                            <FaHeart className="absolute -right-8 -top-8 h-48 w-48 text-white/5 -rotate-12" />
                            <h3 className="font-outfit text-3xl font-black text-white mb-4">Saved Favorites</h3>
                            <p className="text-white/60 mb-8 max-w-sm">Access your personal cookbook anywhere. Save recipes and sync them instantly.</p>
                            <Link to="/saved" className="modern-button bg-white text-primary hover:bg-white/90 px-10">View Cookbook</Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </motion.div>
    );
};

export default Home;
