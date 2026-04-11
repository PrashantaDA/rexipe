import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaBookmark, FaUtensils, FaBars, FaTimes, FaChevronDown, FaShoppingBasket, FaBoxOpen } from "react-icons/fa";
import useSavedRecipes from "../hooks/useSavedRecipes";

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const dropdownRef = useRef(null);
	const location = useLocation();
	const { savedRecipes } = useSavedRecipes();

	const shoppingListCount = 0;

	const categories = [
		{ name: "Italian", icon: "🍝", type: "cuisine" },
		{ name: "American", icon: "🍔", type: "cuisine" },
		{ name: "Thai", icon: "🍜", type: "cuisine" },
		{ name: "Indian", icon: "🍛", type: "cuisine" },
		{ name: "Mexican", icon: "🌮", type: "cuisine" },
		{ name: "Japanese", icon: "🍱", type: "cuisine" },
		{ name: "Vegetarian", icon: "🥗", type: "diet" },
		{ name: "Vegan", icon: "🌱", type: "diet" },
		{ name: "Keto", icon: "🥑", type: "diet" },
	];

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsDropdownOpen(false);
	}, [location]);

	const isActive = (path) => {
		if (path === "/") return location.pathname === path;
		return location.pathname.startsWith(path);
	};

	const navLinks = [
		{ path: "/", icon: <FaHome />, label: "Home" },
		{ path: "/pantry", icon: <FaBoxOpen />, label: "Pantry" },
		{ path: "/saved", icon: <FaBookmark />, label: "Saved", badge: savedRecipes.length },
		{ path: "/shopping-list", icon: <FaShoppingBasket />, label: "Groceries", badge: shoppingListCount },
	];

	return (
		<header className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 transition-all duration-300 pointer-events-none">
			<nav
				className={`mx-auto max-w-7xl rounded-full transition-all duration-500 pointer-events-auto ${
					isScrolled ? "glass-effect shadow-2xl py-2 px-6 border-white/10" : "bg-transparent py-4 px-2 border-transparent"
				}`}
			>
				<div className="flex items-center justify-between">
					{/* Brand */}
					<Link
						to="/"
						className="group flex items-center gap-3"
					>
						<div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
							<FaUtensils className="h-5 w-5" />
							<div className="absolute inset-0 rounded-xl bg-accent blur-md opacity-0 transition-opacity group-hover:opacity-40" />
						</div>
						<span className="font-outfit text-2xl font-black tracking-tighter text-white">
							REXIPE<span className="text-accent">.</span>
						</span>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
									isActive(link.path) ? "bg-accent/10 text-accent" : "text-white/70 hover:text-white"
								}`}
							>
								<span className="transition-transform group-hover:scale-110">{link.icon}</span>
								<span>{link.label}</span>
								{link.badge > 0 && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">{link.badge}</span>}
								{isActive(link.path) && (
									<motion.div
										layoutId="nav-glow"
										className="absolute inset-0 rounded-full bg-accent/5 ring-1 ring-accent/20"
									/>
								)}
							</Link>
						))}

						{/* Dropdown Toggle */}
						<div
							ref={dropdownRef}
							className="relative ml-2 border-l border-white/10 pl-2"
						>
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
									isDropdownOpen || location.pathname.includes("/cuisine/") || location.pathname.includes("/diet/") ? "text-accent" : "text-white/70 hover:text-white"
								}`}
							>
								<span>Discover</span>
								<FaChevronDown className={`h-3 w-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
							</button>

							<AnimatePresence>
								{isDropdownOpen && (
									<motion.div
										initial={{ opacity: 0, scale: 0.95, y: 10 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95, y: 10 }}
										className="absolute right-0 mt-3 w-[440px] overflow-hidden rounded-3xl glass-effect p-6 shadow-2xl"
									>
										<div className="grid grid-cols-2 gap-x-12 gap-y-8">
											<div>
												<h4 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-accent/80">World Cuisines</h4>
												<div className="grid grid-cols-2 gap-x-4 gap-y-2">
													{categories
														.filter((c) => c.type === "cuisine")
														.map((c) => (
															<Link
																key={c.name}
																to={`/cuisine/${c.name}`}
																className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
															>
																<span className="text-lg">{c.icon}</span>
																<span>{c.name}</span>
															</Link>
														))}
												</div>
											</div>
											<div>
												<h4 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-accent/80">Dietary Needs</h4>
												<div className="space-y-2">
													{categories
														.filter((c) => c.type === "diet")
														.map((c) => (
															<Link
																key={c.name}
																to={`/diet/${c.name}`}
																className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
															>
																<span className="text-lg">{c.icon}</span>
																<span>{c.name}</span>
															</Link>
														))}
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Mobile Toggle */}
					<button
						className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white md:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="pointer-events-auto mt-2 rounded-2xl glass-effect p-4 shadow-2xl md:hidden"
					>
						<div className="flex flex-col gap-2">
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className={`flex items-center gap-4 rounded-xl p-4 text-lg font-bold transition-all ${isActive(link.path) ? "bg-accent text-white" : "bg-white/5 text-white/70"}`}
								>
									{link.icon} {link.label}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
