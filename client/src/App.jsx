import "./App.css";
import { Outlet } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavbar />
      <Outlet />  
      </ApolloProvider>
  );
}

export default App;
