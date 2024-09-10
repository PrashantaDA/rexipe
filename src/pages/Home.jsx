import { motion } from "framer-motion";
import Popular from "../components/Popular";

import DietCategory from "../components/Category/DietCategory";
import CuisineCategory from "../components/Category/CuisineCategory";

const Home = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 54, x: -54 }}
			animate={{ opacity: 1, y: 0, x: 0 }}
			exit={{ opacity: 0, y: -54, x: 54 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<DietCategory />
			<CuisineCategory />
			<Popular />
		</motion.div>
	);
};
export default Home;
