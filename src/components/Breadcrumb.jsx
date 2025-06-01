/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // You can use any icon from react-icons

const Breadcrumb = ({ currentPage }) => {
	return (
		<nav className="glass-effect mb-6 flex items-center justify-center gap-2 py-4 px-4 text-lg">
			<Link
				to="/"
				className="flex items-center gap-2 text-accent transition-colors hover:text-tertiary"
			>
				<FaHome className="text-xl" />
				<h4>Home</h4>
			</Link>

			<span className="text-normal/60">/</span>
			<span className="font-semibold text-normal">{currentPage}</span>
		</nav>
	);
};

export default Breadcrumb;
