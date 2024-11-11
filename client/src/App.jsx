import "./App.css";
import { Outlet } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [cartCount, setCartItems] = useState(
    JSON.parse(localStorage.getItem("counts")) || 0
  );
  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar cartCount={cartCount} />
        <main className="flex-grow-1">
          <Outlet context={{ setCartItems, cartCount }} />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
