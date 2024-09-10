import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";

const Searched = () => {
	const { search } = useParams();
	const [searchedRecipes, setSearchedRecipes] = useState([]);
	const [loading, setLoading] = useState(true); // Add loading state

	const getSearched = async (query) => {
		setLoading(true); // Set loading to true when fetching starts
		const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${query}&number=100`);
		const recipes = await data.json();
		setSearchedRecipes(recipes.results);
		setLoading(false); // Set loading to false when fetching completes
	};

	useEffect(() => {
		getSearched(search);
	}, [search]);

	return (
		<>
			{loading ? (
				<p className="flex justify-center h-screen text-center mt-8 text-2xl font-bold text-dark">Loading...</p>
			) : searchedRecipes.length > 0 ? (
				<RecipeGrid
					title={`Search Results for "${search}"`}
					items={searchedRecipes}
				/>
			) : (
				<p className="text-center mt-8 text-lg text-dark">No recipes found for &quot;{search}&quot;.</p>
			)}
		</>
	);
};

export default Searched;
