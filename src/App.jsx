import { useLocation } from "react-router-dom";
import Pages from "./pages/Pages";
import Nav from "./components/Nav";
import Search from "./components/Search";
import Footer from "./components/Footer";

const App = () => {
	const location = useLocation();

	return (
		<div className="App">
			<Nav />
			{/* Render Search only if the current path is "/" (home page) */}
			{location.pathname === "/" && <Search />}
			<Pages />
			<Footer />
		</div>
	);
};

export default App;
