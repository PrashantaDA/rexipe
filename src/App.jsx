import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/common/BackToTop";
import Cuisine from "./pages/Cuisine";
import Featured from "./pages/Featured";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import SavedRecipes from "./pages/SavedRecipes";
import Searched from "./pages/Searched";
import NotFound from "./pages/NotFound";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<Routes location={location}>
			<Route
				path="/"
				element={
					<AnimatePresence mode="wait">
						<Home key="home" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/featured"
				element={
					<AnimatePresence mode="wait">
						<Featured key="featured" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/cuisine/:name"
				element={
					<AnimatePresence mode="wait">
						<Cuisine key="cuisine" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/diet/:name"
				element={
					<AnimatePresence mode="wait">
						<Cuisine key="diet" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/searched/:search"
				element={
					<AnimatePresence mode="wait">
						<Searched key="searched" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/recipe/:id"
				element={
					<AnimatePresence mode="wait">
						<Recipe key="recipe" />
					</AnimatePresence>
				}
			/>
			<Route
				path="/saved"
				element={
					<AnimatePresence mode="wait">
						<SavedRecipes key="saved" />
					</AnimatePresence>
				}
			/>
			<Route
				path="*"
				element={
					<AnimatePresence mode="wait">
						<NotFound key="not-found" />
					</AnimatePresence>
				}
			/>
		</Routes>
	);
};

const App = () => {
	return (
		<>
			<Navbar />
			<AnimatedRoutes />
			<Footer />
			<BackToTop />
		</>
	);
};

export default App;
