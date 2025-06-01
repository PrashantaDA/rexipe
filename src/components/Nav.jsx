import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChevronDown, FaBars } from "react-icons/fa";

const Nav = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navVariants = {
		hidden: { y: -100, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	const linkVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 },
	};

	const dropdownVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	};

	const mobileMenuVariants = {
		hidden: { opacity: 0, y: -100 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -100 },
	};

	const cuisines = [
		{ path: "/cuisine/Italian", label: "Italian" },
		{ path: "/cuisine/Mexican", label: "Mexican" },
		{ path: "/cuisine/Chinese", label: "Chinese" },
		{ path: "/cuisine/Japanese", label: "Japanese" },
		{ path: "/cuisine/Indian", label: "Indian" },
		{ path: "/cuisine/Thai", label: "Thai" },
	];

	const diets = [
		{ path: "/diet/Vegan", label: "Vegan" },
		{ path: "/diet/Vegetarian", label: "Vegetarian" },
		{ path: "/diet/Gluten-Free", label: "Gluten Free" },
		{ path: "/diet/Keto", label: "Keto" },
		{ path: "/diet/Paleo", label: "Paleo" },
		{ path: "/diet/Mediterranean", label: "Mediterranean" },
	];

	const navLinks = [
		{
			path: "/",
			label: "Home",
		},
		{
			path: "/featured",
			label: "Featured",
		},
	];

	const handleNavClick = (e, path) => {
		e.preventDefault();
		// Scroll to top first
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// Then navigate after a small delay to allow scroll animation
		setTimeout(() => {
			navigate(path);
		}, 100);
	};

	return (
		<AnimatePresence>
			<motion.nav
				variants={navVariants}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.5 }}
				className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-lg backdrop-blur-md" : "bg-transparent"}`}
			>
				<div className="container mx-auto px-6 py-3">
					<div className="flex items-center justify-between">
						{/* Logo and Brand */}
						<Link
							to="/"
							className="group flex items-center gap-4"
						>
							<motion.div
								initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
								animate={{ rotate: 0, scale: 1, opacity: 1 }}
								transition={{ duration: 0.5 }}
								className="relative"
							>
								<img
									className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
									src="/logo-no-background.png"
									alt="Rexipe Logo"
								/>
								<motion.div
									className="absolute -inset-1 rounded-full bg-accent/20 blur-md"
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.5, 0.8, 0.5],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								/>
							</motion.div>
							<div className="flex flex-col">
								<motion.h1
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="font-handlee text-2xl font-bold text-accent"
								>
									Rexipe
								</motion.h1>
								<motion.p
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.3 }}
									className="text-xs text-normal/80"
								>
									Cook with Confidence
								</motion.p>
							</div>
						</Link>

						{/* Navigation Links - Desktop */}
						<div className="hidden flex-1 items-center justify-center md:flex">
							{/* Cuisines Dropdown */}
							<div
								className="relative group mx-6"
								onMouseEnter={() => setActiveDropdown("cuisines")}
								onMouseLeave={() => setActiveDropdown(null)}
							>
								<motion.button className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-lg font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent">
									Cuisines
									<FaChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "cuisines" ? "rotate-180" : ""}`} />
								</motion.button>
								<AnimatePresence>
									{activeDropdown === "cuisines" && (
										<motion.div
											variants={dropdownVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											transition={{ duration: 0.2 }}
											className="absolute left-1/2 top-full mt-1 w-56 -translate-x-1/2 rounded-xl bg-primary/95 p-2 shadow-lg backdrop-blur-md"
										>
											{cuisines.map((cuisine) => (
												<Link
													key={cuisine.path}
													to={cuisine.path}
													onClick={(e) => handleNavClick(e, cuisine.path)}
													className="block rounded-lg px-4 py-2.5 text-normal transition-all hover:bg-accent/10 hover:text-accent"
												>
													{cuisine.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Diets Dropdown */}
							<div
								className="relative group mx-6"
								onMouseEnter={() => setActiveDropdown("diets")}
								onMouseLeave={() => setActiveDropdown(null)}
							>
								<motion.button className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-lg font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent">
									Diets
									<FaChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "diets" ? "rotate-180" : ""}`} />
								</motion.button>
								<AnimatePresence>
									{activeDropdown === "diets" && (
										<motion.div
											variants={dropdownVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											transition={{ duration: 0.2 }}
											className="absolute left-1/2 top-full mt-1 w-56 -translate-x-1/2 rounded-xl bg-primary/95 p-2 shadow-lg backdrop-blur-md"
										>
											{diets.map((diet) => (
												<Link
													key={diet.path}
													to={diet.path}
													onClick={(e) => handleNavClick(e, diet.path)}
													className="block rounded-lg px-4 py-2.5 text-normal transition-all hover:bg-accent/10 hover:text-accent"
												>
													{diet.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* Main Links - Desktop */}
						<motion.div
							variants={linkVariants}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.3 }}
							className="hidden items-center gap-6 md:flex"
						>
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									onClick={(e) => handleNavClick(e, link.path)}
									className={`rounded-lg px-4 py-2.5 text-lg font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent ${
										location.pathname === link.path ? "bg-accent/10 text-accent" : ""
									}`}
								>
									{link.label}
								</Link>
							))}
						</motion.div>

						{/* Mobile Menu Button */}
						<motion.button
							variants={linkVariants}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.4 }}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="relative z-50 block rounded-lg p-2.5 text-normal transition-all hover:bg-accent/10 hover:text-accent md:hidden"
						>
							<FaBars className="h-6 w-6" />
						</motion.button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							variants={mobileMenuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="glass-effect fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-primary/95 p-8 backdrop-blur-md md:hidden"
						>
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									onClick={(e) => {
										handleNavClick(e, link.path);
										setIsMobileMenuOpen(false);
									}}
									className={`rounded-lg px-6 py-3 text-2xl font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent ${
										location.pathname === link.path ? "bg-accent/10 text-accent" : ""
									}`}
								>
									{link.label}
								</Link>
							))}

							{/* Mobile Cuisines Dropdown */}
							<div className="relative">
								<motion.button
									onClick={() => setActiveDropdown(activeDropdown === "cuisines" ? null : "cuisines")}
									className="flex items-center gap-3 rounded-lg px-6 py-3 text-2xl font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent"
								>
									Cuisines
									<FaChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "cuisines" ? "rotate-180" : ""}`} />
								</motion.button>
								<AnimatePresence>
									{activeDropdown === "cuisines" && (
										<motion.div
											variants={dropdownVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											transition={{ duration: 0.2 }}
											className="mt-2 w-64 rounded-xl bg-primary/95 p-3 shadow-lg backdrop-blur-md"
										>
											{cuisines.map((cuisine) => (
												<Link
													key={cuisine.path}
													to={cuisine.path}
													onClick={(e) => {
														handleNavClick(e, cuisine.path);
														setIsMobileMenuOpen(false);
													}}
													className="block rounded-lg px-4 py-3 text-xl text-normal transition-all hover:bg-accent/10 hover:text-accent"
												>
													{cuisine.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Mobile Diets Dropdown */}
							<div className="relative">
								<motion.button
									onClick={() => setActiveDropdown(activeDropdown === "diets" ? null : "diets")}
									className="flex items-center gap-3 rounded-lg px-6 py-3 text-2xl font-medium text-normal transition-all hover:bg-accent/10 hover:text-accent"
								>
									Diets
									<FaChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "diets" ? "rotate-180" : ""}`} />
								</motion.button>
								<AnimatePresence>
									{activeDropdown === "diets" && (
										<motion.div
											variants={dropdownVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
											transition={{ duration: 0.2 }}
											className="mt-2 w-64 rounded-xl bg-primary/95 p-3 shadow-lg backdrop-blur-md"
										>
											{diets.map((diet) => (
												<Link
													key={diet.path}
													to={diet.path}
													onClick={(e) => {
														handleNavClick(e, diet.path);
														setIsMobileMenuOpen(false);
													}}
													className="block rounded-lg px-4 py-3 text-xl text-normal transition-all hover:bg-accent/10 hover:text-accent"
												>
													{diet.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</AnimatePresence>
	);
};

export default Nav;
