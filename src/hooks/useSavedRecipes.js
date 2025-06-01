import { useState, useEffect, useCallback } from "react";

const SAVED_RECIPES_KEY = "saved_recipes";

// Create a singleton to maintain state across component remounts
let globalSavedRecipes = [];
let listeners = new Set();

const notifyListeners = () => {
	listeners.forEach((listener) => listener(globalSavedRecipes));
};

const useSavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState(() => {
		// Initialize from localStorage on first mount
		try {
			const saved = localStorage.getItem(SAVED_RECIPES_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				globalSavedRecipes = parsed;
				return parsed;
			}
		} catch (err) {
			console.error("Error loading saved recipes:", err);
		}
		return globalSavedRecipes;
	});

	// Subscribe to global state changes
	useEffect(() => {
		const listener = (newRecipes) => {
			setSavedRecipes(newRecipes);
		};
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}, []);

	// Save to localStorage whenever global state changes
	useEffect(() => {
		try {
			localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(globalSavedRecipes));
		} catch (err) {
			console.error("Error saving recipes:", err);
		}
	}, [globalSavedRecipes]);

	const saveRecipe = useCallback((recipe) => {
		console.log("Attempting to save recipe:", recipe);
		// Check if recipe is already saved
		if (!globalSavedRecipes.some((r) => r.id === recipe.id)) {
			console.log("Adding new recipe to saved recipes:", recipe);
			globalSavedRecipes = [...globalSavedRecipes, recipe];
			notifyListeners();
		} else {
			console.log("Recipe already saved:", recipe.id);
		}
	}, []);

	const unsaveRecipe = useCallback((recipeId) => {
		globalSavedRecipes = globalSavedRecipes.filter((recipe) => recipe.id !== recipeId);
		notifyListeners();
	}, []);

	const isRecipeSaved = useCallback((recipeId) => {
		return globalSavedRecipes.some((recipe) => recipe.id === recipeId);
	}, []);

	const clearSavedRecipes = useCallback(() => {
		globalSavedRecipes = [];
		notifyListeners();
	}, []);

	return {
		savedRecipes,
		saveRecipe,
		unsaveRecipe,
		isRecipeSaved,
		clearSavedRecipes,
	};
};

export default useSavedRecipes;
