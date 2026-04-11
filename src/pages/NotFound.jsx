import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUtensils, FaHome } from "react-icons/fa";

const NotFound = () => {
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
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-primary to-primary/95 px-4">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:40px_40px]" />
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="relative z-10 text-center"
			>
				{/* 404 Number */}
				<motion.div
					variants={itemVariants}
					className="mb-8 flex items-center justify-center gap-4"
				>
					<motion.div
						animate={{
							rotate: [0, -10, 10, -10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: "reverse",
						}}
						className="text-9xl font-bold text-accent"
					>
						4
					</motion.div>
					<motion.div
						animate={{
							y: [0, -20, 0],
							rotate: [0, 360],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatType: "reverse",
						}}
						className="text-9xl font-bold text-accent"
					>
						<FaUtensils className="inline-block h-24 w-24" />
					</motion.div>
					<motion.div
						animate={{
							rotate: [0, 10, -10, 10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: "reverse",
						}}
						className="text-9xl font-bold text-accent"
					>
						4
					</motion.div>
				</motion.div>

				{/* Message */}
				<motion.h1
					variants={itemVariants}
					className="mb-4 font-outfit text-4xl font-bold text-accent md:text-5xl"
				>
					Oops! Recipe Not Found
				</motion.h1>
				<motion.p
					variants={itemVariants}
					className="mb-8 text-lg text-normal/80 md:text-xl"
				>
					Looks like this recipe has been whisked away! Let&apos;s get you back to cooking.
				</motion.p>

				{/* Action Buttons */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					<Link
						to="/"
						className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
					>
						<FaHome className="h-5 w-5" />
						<span>Back to Home</span>
					</Link>
					<Link
						to="/featured"
						className="group flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-accent transition-all hover:bg-accent/10"
					>
						<FaUtensils className="h-5 w-5" />
						<span>View Featured Recipes</span>
					</Link>
				</motion.div>

				{/* Decorative Elements */}
				<motion.div
					variants={itemVariants}
					className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-accent/20 blur-xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.5, 0.8, 0.5],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				/>
				<motion.div
					variants={itemVariants}
					className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-accent/20 blur-xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.5, 0.8, 0.5],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						repeatType: "reverse",
						delay: 1,
					}}
				/>
			</motion.div>
		</div>
	);
};

export default NotFound;
