import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { FaBowlRice } from "react-icons/fa6";
import { GiChopsticks, GiNoodles } from "react-icons/gi";
import Category from "./Category";

const cuisineCategories = [
	{
		name: "Italian",
		path: "/cuisine/Italian",
		icon: <FaPizzaSlice className="text-3xl" />,
	},
	{
		name: "American",
		path: "/cuisine/American",
		icon: <FaHamburger className="text-3xl" />,
	},
	{
		name: "Thai",
		path: "/cuisine/Thai",
		icon: <FaBowlRice className="text-3xl" />,
	},
	{
		name: "Japanese",
		path: "/cuisine/Japanese",
		icon: <GiChopsticks className="text-3xl" />,
	},
	{
		name: "Indian",
		path: "/cuisine/Indian",
		icon: <FaBowlRice className="text-3xl" />,
	},
	{
		name: "Korean",
		path: "/cuisine/Korean",
		icon: <GiNoodles className="text-3xl" />,
	},
];

const CuisineCategory = () => (
	<Category
		title="Cuisine Categories"
		categories={cuisineCategories}
	/>
);

export default CuisineCategory;
