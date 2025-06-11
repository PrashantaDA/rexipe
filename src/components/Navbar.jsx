import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaBookmark, FaUtensils, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { GrCloudlinux } from "react-icons/gr";
import { navVariants } from "../utils/animations";
import useSavedRecipes from "../hooks/useSavedRecipes";

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const dropdownRef = useRef(null);
	const mobileMenuRef = useRef(null);
	const location = useLocation();
	const { savedRecipes } = useSavedRecipes();

	const categories = [
		{ name: "Italian", icon: "🍝", type: "cuisine" },
		{ name: "American", icon: "🍔", type: "cuisine" },
		{ name: "Thai", icon: "🍜", type: "cuisine" },
		{ name: "Japanese", icon: "🍱", type: "cuisine" },
		{ name: "Indian", icon: "🍛", type: "cuisine" },
		{ name: "Mexican", icon: "🌮", type: "cuisine" },
		{ name: "Mediterranean", icon: "🥙", type: "cuisine" },
		{ name: "Chinese", icon: "🥢", type: "cuisine" },
		{ name: "Vegetarian", icon: "🥗", type: "diet" },
		{ name: "Vegan", icon: "🌱", type: "diet" },
		{ name: "Gluten Free", icon: "🌾", type: "diet" },
		{ name: "Keto", icon: "🥑", type: "diet" },
	];

	const isActive = (path) => {
		if (path === "/") {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest("button")) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsDropdownOpen(false);
	}, [location]);

	const navLinks = [
		{ path: "/", icon: <FaHome />, label: "Home" },
		{ path: "/featured", icon: <GrCloudlinux />, label: "Featured" },
		{ path: "/saved", icon: <FaBookmark />, label: "Saved", badge: savedRecipes.length },
	];

	const renderNavLink = ({ path, icon, label, badge }) => (
		<Link
			to={path}
			className={`relative flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
				isActive(path)
					? "bg-gradient-to-r from-accent/30 via-accent/20 to-accent/10 text-accent shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]"
					: "text-white/90 hover:bg-accent/20 hover:text-accent"
			}`}
		>
			<span className="text-lg">{icon}</span>
			<span className=" md:inline font-medium">{label}</span>
			{badge > 0 && (
				<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-xs font-medium text-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]">
					{badge}
				</span>
			)}
		</Link>
	);

	return (
		<motion.nav
			variants={navVariants}
			initial="hidden"
			animate="visible"
			className="fixed left-0 right-0 top-0 z-50 bg-[#121212] shadow-[0_1px_3px_-1px_rgba(0,0,0,0.1)]"
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
				{/* Logo */}
				<Link
					to="/"
					className="group flex items-center gap-2"
				>
					<div className="relative">
						<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent/30 via-accent/20 to-accent/10 blur-sm transition-all group-hover:blur-md" />
						<FaUtensils className="relative h-6 w-6 text-accent" />
					</div>
					<span className="hidden bg-gradient-to-br from-accent via-accent/90 to-accent/80 bg-clip-text text-2xl font-bold text-transparent sm:inline font-handlee">Rexipe</span>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-2 md:flex">
					{navLinks.map((link) => (
						<div key={`desktop-${link.path}`}>{renderNavLink(link)}</div>
					))}

					{/* Categories Dropdown */}
					<div
						ref={dropdownRef}
						className="relative"
					>
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className={`group flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
								isDropdownOpen || location.pathname.startsWith("/cuisine/") || location.pathname.startsWith("/diet/")
									? "bg-gradient-to-r from-accent/30 via-accent/20 to-accent/10 text-accent shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]"
									: "text-white/90 hover:bg-accent/20 hover:text-accent"
							}`}
						>
							<span className="text-lg">
								<FaUtensils />
							</span>
							<span className="font-medium">Categories</span>
							<FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
						</button>

						<AnimatePresence>
							{isDropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.2 }}
									className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-lg bg-[#191919] p-2 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] ring-1 ring-accent/20"
								>
									<div className="space-y-2">
										{["cuisine", "diet"].map((type) => (
											<div key={`desktop-${type}`}>
												<h3 className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-accent">{type === "cuisine" ? "Cuisines" : "Diets"}</h3>
												<div className="space-y-1">
													{categories
														.filter((cat) => cat.type === type)
														.map((category) => (
															<Link
																key={`desktop-${type}-${category.name}`}
																to={`/${type}/${category.name.toLowerCase()}`}
																className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white/90 transition-all hover:bg-accent/20 hover:text-accent"
																onClick={() => setIsDropdownOpen(false)}
															>
																<span className="text-lg transition-transform group-hover:scale-110">{category.icon}</span>
																<span className="font-medium">{category.name}</span>
															</Link>
														))}
												</div>
											</div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="relative rounded-lg p-2 text-white/90 transition-all hover:bg-accent/20 hover:text-accent md:hidden"
					aria-label="Toggle menu"
				>
					<div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent/30 via-accent/20 to-accent/10 opacity-0 blur-sm transition-opacity hover:opacity-100" />
					<span className="relative">{isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}</span>
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						ref={mobileMenuRef}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute left-0 right-0 top-16 border-t border-accent/10 bg-[#121212] backdrop-blur-md md:hidden"
					>
						<div className="space-y-1 p-4">
							{navLinks.map((link) => (
								<div
									key={`mobile-${link.path}`}
									className="w-full"
								>
									{renderNavLink(link)}
								</div>
							))}

							{/* Mobile Categories */}
							<div className="space-y-4 pt-4">
								{["cuisine", "diet"].map((type) => (
									<div key={`mobile-${type}`}>
										<h3 className="mb-2 px-4 text-sm font-semibold uppercase tracking-wider text-accent">{type === "cuisine" ? "Cuisines" : "Diets"}</h3>
										<div className="grid grid-cols-2 gap-2">
											{categories
												.filter((cat) => cat.type === type)
												.map((category) => (
													<Link
														key={`mobile-${type}-${category.name}`}
														to={`/${type}/${category.name.toLowerCase()}`}
														className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/90 transition-all hover:bg-accent/20 hover:text-accent"
														onClick={() => setIsMobileMenuOpen(false)}
													>
														<span className="text-lg transition-transform group-hover:scale-110">{category.icon}</span>
														<span className="font-medium">{category.name}</span>
													</Link>
												))}
										</div>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default Navbar;
