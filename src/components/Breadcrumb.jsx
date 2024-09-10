/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // You can use any icon from react-icons

const Breadcrumb = ({ currentPage }) => {
	return (
		<nav className="bg-dark py-4 flex justify-center items-center mb-6 xs:text-sm md:text-2xl">
			<Link
				to="/"
				className="text-tertiary hover:underline flex items-start"
			>
				<FaHome className="mr-2" />
				<h4>Home</h4>
			</Link>

			<span className="mx-2">/</span>
			<span className="text-primary font-semibold">{currentPage}</span>
		</nav>
	);
};

export default Breadcrumb;
