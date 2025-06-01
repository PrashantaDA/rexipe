import { FaPizzaSlice, FaPepperHot, FaDrumstickBite, FaFish, FaBreadSlice, FaLeaf } from "react-icons/fa";
import Category from "./Category";

const CuisineCategory = () => {
	const categories = [
		{
			name: "Italian",
			path: "/cuisine/Italian",
			icon: <FaPizzaSlice className="text-3xl" />,
		},
		{
			name: "Mexican",
			path: "/cuisine/Mexican",
			icon: <FaPepperHot className="text-3xl" />,
		},
		{
			name: "Chinese",
			path: "/cuisine/Chinese",
			icon: <FaDrumstickBite className="text-3xl" />,
		},
		{
			name: "Japanese",
			path: "/cuisine/Japanese",
			icon: <FaFish className="text-3xl" />,
		},
		{
			name: "Indian",
			path: "/cuisine/Indian",
			icon: <FaBreadSlice className="text-3xl" />,
		},
		{
			name: "Thai",
			path: "/cuisine/Thai",
			icon: <FaLeaf className="text-3xl" />,
		},
	];

	return (
		<Category
			title="Cuisine Categories"
			categories={categories}
			type="cuisine"
		/>
	);
};

export default CuisineCategory;
