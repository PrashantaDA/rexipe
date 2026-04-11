import { useState, useEffect, useCallback } from "react";

const SAVED_RECIPES_KEY = "saved_recipes";
const SHOPPING_LIST_KEY = "shopping_list";

// Global singletons to maintain state
let globalSavedRecipes = [];
let globalShoppingList = [];
let listeners = new Set();

const notifyListeners = () => {
    listeners.forEach((listener) => listener({ 
        recipes: globalSavedRecipes, 
        shopping: globalShoppingList 
    }));
};

const useSavedRecipes = () => {
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem(SAVED_RECIPES_KEY);
            const shopping = localStorage.getItem(SHOPPING_LIST_KEY);
            
            if (saved) globalSavedRecipes = JSON.parse(saved);
            if (shopping) globalShoppingList = JSON.parse(shopping);
            
            return { recipes: globalSavedRecipes, shopping: globalShoppingList };
        } catch (err) {
            console.error("Error loading state:", err);
            return { recipes: [], shopping: [] };
        }
    });

    useEffect(() => {
        const listener = (newState) => setState(newState);
        listeners.add(listener);
        return () => listeners.delete(listener);
    }, []);

    // RECIPE ACTIONS
    const saveRecipe = useCallback((recipe) => {
        if (!globalSavedRecipes.some((r) => r.id === recipe.id)) {
            globalSavedRecipes = [...globalSavedRecipes, recipe];
            localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(globalSavedRecipes));
            notifyListeners();
        }
    }, []);

    const unsaveRecipe = useCallback((recipeId) => {
        globalSavedRecipes = globalSavedRecipes.filter((r) => r.id !== recipeId);
        localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(globalSavedRecipes));
        notifyListeners();
    }, []);

    const isRecipeSaved = useCallback((recipeId) => {
        return globalSavedRecipes.some((r) => r.id === recipeId);
    }, []);

    // SHOPPING LIST ACTIONS
    const addToShoppingList = useCallback((item) => {
        // item: { id, name, amount, unit, image }
        if (!globalShoppingList.some((i) => i.id === item.id)) {
            globalShoppingList = [...globalShoppingList, { ...item, completed: false }];
            localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(globalShoppingList));
            notifyListeners();
        }
    }, []);

    const removeFromShoppingList = useCallback((itemId) => {
        globalShoppingList = globalShoppingList.filter((i) => i.id !== itemId);
        localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(globalShoppingList));
        notifyListeners();
    }, []);

    const toggleShoppingItem = useCallback((itemId) => {
        globalShoppingList = globalShoppingList.map((i) => 
            i.id === itemId ? { ...i, completed: !i.completed } : i
        );
        localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(globalShoppingList));
        notifyListeners();
    }, []);

    const clearSavedRecipes = useCallback(() => {
        globalSavedRecipes = [];
        localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(globalSavedRecipes));
        notifyListeners();
    }, []);

    const clearShoppingList = useCallback(() => {
        globalShoppingList = [];
        localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(globalShoppingList));
        notifyListeners();
    }, []);

    return {
        savedRecipes: state.recipes,
        shoppingList: state.shopping,
        saveRecipe,
        unsaveRecipe,
        isRecipeSaved,
        addToShoppingList,
        removeFromShoppingList,
        toggleShoppingItem,
        clearShoppingList,
        clearSavedRecipes
    };
};

export default useSavedRecipes;
