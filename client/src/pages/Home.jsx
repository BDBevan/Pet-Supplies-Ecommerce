import LandingPage from "../components/LandingPage";

const Home = () => {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const handleSearch = (query) => {
    window.location.href = `/search?category=${encodeURIComponent(query)}`;
  };

  return <LandingPage onNavigate={handleNavigate} onSearch={handleSearch} />;
};

export default Home;
