import "./App.css";
import { Outlet } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
