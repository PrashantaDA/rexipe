import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
	return (
		<div className="flex text-center justify-between items-center py-4 xs:px-4 md:px-16 gap-8 bg-secondary text-dark shadow-md">
			<div className="flex items-center xs:flex-">
				<Link to="/">
					<motion.img
						initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 0.5 }}
						className="w-[60px] mr-2"
						src={"/logo-no-background.png"}
						alt="logo"
					/>
				</Link>
				<motion.h1
					initial={{ opacity: 0, scale: 0.8, x: -54 }}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="text-sm font-semibold"
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
					className="flex items-center gap-2"
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
