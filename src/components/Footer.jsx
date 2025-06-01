import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const footerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const iconVariants = {
		hover: { scale: 1.2, rotate: 5 },
		tap: { scale: 0.9 },
	};

	return (
		<motion.footer
			variants={footerVariants}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.5 }}
			className="relative mt-16 overflow-hidden bg-gradient-to-b from-primary to-primary/95 py-8"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:40px_40px]" />
			</div>

			<div className="container relative mx-auto px-4">
				<div className="flex flex-col items-center justify-center space-y-4">
					{/* Brand Section */}
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="flex items-center gap-4"
					>
						<div className="rounded-full bg-accent/10 p-2">
							<img
								src="/logo-no-background.png"
								alt="Rexipe Logo"
								className="h-10 w-10"
							/>
						</div>
						<div>
							<h3 className="font-handlee text-2xl font-bold text-accent">Rexipe</h3>
							<p className="text-sm text-normal/80">Your culinary journey starts here</p>
						</div>
					</motion.div>

					{/* Social Links */}
					<div className="flex items-center gap-4">
						{[
							{ icon: <FaGithub />, href: "https://github.com", label: "GitHub" },
							{ icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
							{ icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
						].map((social) => (
							<motion.a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								variants={iconVariants}
								whileHover="hover"
								whileTap="tap"
								className="rounded-full bg-accent/10 p-2 text-xl text-accent transition-colors hover:bg-accent hover:text-primary"
								aria-label={social.label}
							>
								{social.icon}
							</motion.a>
						))}
					</div>

					{/* Bottom Bar */}
					<div className="border-t border-normal/10 pt-4 text-center">
						<p className="text-sm text-normal/60">
							&copy; {currentYear} Rexipe. All rights reserved.{" "}
							<a
								href="https://spoonacular.com/food-api"
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent hover:underline"
							>
								Powered by Spoonacular API
							</a>
						</p>
					</div>
				</div>
			</div>
		</motion.footer>
	);
};

export default Footer;
