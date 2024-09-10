import Home from "./Home";
import Recipe from "./Recipe";
import Searched from "./Searched";
import Cuisine from "./Cuisine";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Pages = () => {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes
				key={location.pathname}
				location={location}
			>
				<Route
					path="/"
					element={<Home />}
				/>

				<Route
					path="/:type/:name"
					element={<Cuisine />}
				/>
				<Route
					path="/searched/:search"
					element={<Searched />}
				/>
				<Route
					path="/recipe/:id"
					element={<Recipe />}
				/>
				<Route
					path="*"
					element={<div>404</div>}
				/>
			</Routes>
		</AnimatePresence>
	);
};
export default Pages;
