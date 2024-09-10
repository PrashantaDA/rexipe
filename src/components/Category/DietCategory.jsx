import { FaLeaf, FaCarrot } from "react-icons/fa";
import { GiChickenLeg, GiFoodChain } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import Category from "./Category";

const dietCategories = [
	{
		name: "Vegan",
		path: "/diet/Vegan",
		icon: <FaCarrot className="text-3xl" />,
	},

	{
		name: "Vegetarian",
		path: "/diet/Vegetarian",
		icon: <FaLeaf className="text-3xl" />,
	},
	{
		name: "Keto",
		path: "/diet/Keto",
		icon: <GiChickenLeg className="text-3xl" />,
	},
	{
		name: "Pescetarian",
		path: "/diet/Pescetarian",
		icon: <GiFoodChain className="text-3xl" />,
	},
	{
		name: "Paleo",
		path: "/diet/Paleo",
		icon: <TbMeat className="text-3xl" />,
	},
];

const DietCategory = () => (
	<Category
		title="Diet Categories"
		categories={dietCategories}
	/>
);

export default DietCategory;
