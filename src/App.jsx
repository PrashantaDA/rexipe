import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/common/BackToTop";
import Pages from "./pages/Pages";
import useScrollToTop from "./hooks/useScrollToTop";

const App = () => {
    // Ensuring scroll to top on route change
    useScrollToTop();

    return (
        <div className="min-h-screen bg-primary font-inter">
            <Navbar />
            <Pages />
            <Footer />
            <BackToTop />
        </div>
    );
};

export default App;
