import Home from "./Home";
import Recipe from "./Recipe";
import Searched from "./Searched";
import Cuisine from "./Cuisine";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Featured from "./Featured";

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
					path="/featured"
					element={<Featured />}
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
					element={<NotFound />}
				/>
			</Routes>
		</AnimatePresence>
	);
};
export default Pages;
