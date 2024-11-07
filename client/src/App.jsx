import "./App.css";
import { Outlet } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
