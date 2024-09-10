import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";

const Recipe = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [activeTab, setActiveTab] = useState("ingredients");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
				if (!response.ok) {
					throw new Error("Failed to fetch recipe");
				}
				const data = await response.json();
				setRecipe(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipe();
	}, [id]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!recipe) return null;

	const { title, image, summary, extendedIngredients, analyzedInstructions } = recipe;

	const renderIngredients = () => (
		<ul className="list-disc pl-5">
			{extendedIngredients?.map((ingredient, index) => (
				<li
					key={index}
					className="mb-2"
				>
					{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
				</li>
			))}
		</ul>
	);

	const renderInstructions = () => (
		<ol className="list-decimal pl-5">
			{analyzedInstructions.length > 0
				? analyzedInstructions[0].steps.map((step, index) => (
						<li
							key={index}
							className="mb-2"
						>
							{step.step}
						</li>
				  ))
				: "No instructions available."}
		</ol>
	);

	return (
		<div className="bg-normal ">
			<Breadcrumb currentPage={title} />
			<div className="mx-auto p-8 xs:w-[100%] md:max-w-[80%]">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-4xl font-bold text-dark mb-6"
				>
					{title}
				</motion.h1>
				<div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-8">
					<div>
						<motion.img
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							src={image}
							alt={title}
							className="max-w-[100%] aspect-[4/3] object-contain rounded-lg shadow-lg mb-6"
						/>
						<p
							className="text-dark my-6"
							dangerouslySetInnerHTML={{ __html: summary }}
						/>
					</div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="bg-primary rounded-lg shadow-md p-6">
							<div className="flex flex-wrap mb-4">
								{["ingredients", "instructions"].map((tab) => (
									<button
										key={tab}
										className={`mr-2 mb-2 px-4 py-2 rounded-lg ${activeTab === tab ? "bg-tertiary text-primary" : "bg-dark text-normal"}`}
										onClick={() => setActiveTab(tab)}
									>
										{tab.charAt(0).toUpperCase() + tab.slice(1)}
									</button>
								))}
							</div>
							<div className="bg-dark p-4 rounded-lg">{activeTab === "ingredients" ? renderIngredients() : renderInstructions()}</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Recipe;
