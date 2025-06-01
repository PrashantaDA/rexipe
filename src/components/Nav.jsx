import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
	return (
		<div className="glass-effect sticky top-0 z-50 flex items-center justify-between gap-8 px-4 py-4 shadow-lg backdrop-blur-sm md:px-16">
			<div className="flex items-center">
				<Link to="/">
					<motion.img
						initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 0.5 }}
						className="mr-2 w-[60px]"
						src={"/logo-no-background.png"}
						alt="logo"
					/>
				</Link>
				<motion.h1
					initial={{ opacity: 0, scale: 0.8, x: -54 }}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="font-handlee text-lg font-semibold text-accent"
				>
					Cook with Confidence.
				</motion.h1>
			</div>

			<motion.div
				initial={{ opacity: 0, scale: 0.8, x: 54 }}
				animate={{ opacity: 1, scale: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className="flex items-center gap-2"
			>
				<Link
					className="flex items-center gap-2 transition-colors hover:text-accent"
					to="https://spoonacular.com/food-api"
				>
					<div className="flex flex-col items-center justify-center text-center">
						<img
							className="w-[40px]"
							src={"/logo-spoonacular.svg"}
							alt="spoonacular"
						/>
						<span className="text-sm font-semibold">Spoonacular API</span>
					</div>
				</Link>
			</motion.div>
		</div>
	);
};

export default Nav;
