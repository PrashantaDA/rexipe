import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryGrid from "../components/Category/CategoryGrid";

const Cuisine = () => {
	const { name, type } = useParams(); // Assume 'type' is either 'cuisine' or 'diet'
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getRecipes = async (name, type) => {
			let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=24`;

			// Append either 'cuisine' or 'diet' parameter based on the type
			if (type === "cuisine") {
				url += `&cuisine=${name}`;
			} else if (type === "diet") {
				url += `&diet=${name}`;
			}

			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch recipes.");
				}
				const data = await response.json();
				setRecipes(data.results || []);
			} catch (error) {
				console.error("Error fetching recipes:", error);
				setError(error.message);
			}
		};

		if (name && type) {
			getRecipes(name, type);
		}
	}, [name, type]);

	return (
		<div>
			{error ? (
				<p className="text-red-500 text-center">{error}</p>
			) : (
				<CategoryGrid
					items={recipes}
					category={name}
				/>
			)}
		</div>
	);
};

export default Cuisine;
