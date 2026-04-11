import Home from "./Home";
import Recipe from "./Recipe";
import Searched from "./Searched";
import Cuisine from "./Cuisine";
import Pantry from "./Pantry";
import ShoppingList from "./ShoppingList";
import SavedRecipes from "./SavedRecipes";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Featured from "./Featured";

const Pages = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes
                key={location.pathname}
                location={location}
            >
                <Route path="/" element={<Home />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/pantry" element={<Pantry />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="/saved" element={<SavedRecipes />} />
                <Route path="/cuisine/:name" element={<Cuisine />} />
                <Route path="/diet/:name" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};
export default Pages;
