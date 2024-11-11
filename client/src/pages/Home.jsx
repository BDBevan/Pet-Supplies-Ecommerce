import React from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AppNavbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearch = (query) => {
    navigate(`/collections?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* <AppNavbar /> */}
      <LandingPage onNavigate={handleNavigate} onSearch={handleSearch} />
    </>
  );
};

export default Home;
