import { FaLeaf, FaSeedling, FaWheat, FaFire, FaAppleAlt, FaFish } from "react-icons/fa";
import Category from "./Category";

const DietCategory = () => {
	const categories = [
		{
			name: "Vegan",
			path: "/diet/Vegan",
			icon: <FaLeaf className="text-3xl" />,
		},
		{
			name: "Vegetarian",
			path: "/diet/Vegetarian",
			icon: <FaSeedling className="text-3xl" />,
		},
		{
			name: "Gluten Free",
			path: "/diet/Gluten-Free",
			icon: <FaWheat className="text-3xl" />,
		},
		{
			name: "Keto",
			path: "/diet/Keto",
			icon: <FaFire className="text-3xl" />,
		},
		{
			name: "Paleo",
			path: "/diet/Paleo",
			icon: <FaAppleAlt className="text-3xl" />,
		},
		{
			name: "Mediterranean",
			path: "/diet/Mediterranean",
			icon: <FaFish className="text-3xl" />,
		},
	];

	return (
		<Category
			title="Diet Categories"
			categories={categories}
			type="diet"
		/>
	);
};

export default DietCategory;
