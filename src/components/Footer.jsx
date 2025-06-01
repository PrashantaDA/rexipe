import { Link } from "react-router-dom";
import { FaUtensils, FaHeart } from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative mt-16 border-t border-accent/10 bg-[#121212] py-8">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]" />
			</div>

			<div className="relative mx-auto max-w-7xl px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Brand Section */}
					<div className="space-y-4">
						<Link
							to="/"
							className="inline-flex items-center gap-2"
						>
							<div className="relative">
								<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent/30 via-accent/20 to-accent/10 blur-sm" />
								<FaUtensils className="relative h-6 w-6 text-accent" />
							</div>
							<span className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 bg-clip-text text-xl font-bold text-transparent font-handlee">Rexipe</span>
						</Link>
						<p className="text-sm text-white/60">Discover, save, and cook amazing recipes from around the world. Your personal recipe companion.</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/featured"
									className="text-sm text-white/60 transition-colors hover:text-accent"
								>
									Featured Recipes
								</Link>
							</li>
							<li>
								<Link
									to="/saved"
									className="text-sm text-white/60 transition-colors hover:text-accent"
								>
									Saved Recipes
								</Link>
							</li>
						</ul>
					</div>

					{/* Categories */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Categories</h3>
						<div className="grid grid-cols-2 gap-2">
							<div>
								<h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">Cuisines</h4>
								<ul className="space-y-1">
									<li>
										<Link
											to="/cuisine/italian"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Italian
										</Link>
									</li>
									<li>
										<Link
											to="/cuisine/indian"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Indian
										</Link>
									</li>
									<li>
										<Link
											to="/cuisine/mexican"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Mexican
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">Diets</h4>
								<ul className="space-y-1">
									<li>
										<Link
											to="/diet/vegetarian"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Vegetarian
										</Link>
									</li>
									<li>
										<Link
											to="/diet/vegan"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Vegan
										</Link>
									</li>
									<li>
										<Link
											to="/diet/keto"
											className="text-sm text-white/60 transition-colors hover:text-accent"
										>
											Keto
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 border-t border-accent/10 pt-8 text-center">
					<p className="text-sm text-white/40">
						Made with <FaHeart className="inline-block h-3 w-3 text-accent" /> by{" "}
						<a
							href="https://github.com/prashantada"
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent hover:underline"
						>
							Prashanta D Acharya
						</a>
					</p>
					<p className="mt-2 text-xs text-white/40">
						© {currentYear} Rexipe. All rights reserved. Powered by{" "}
						<a
							href="https://spoonacular.com/food-api"
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent hover:underline"
						>
							Spoonacular API
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
