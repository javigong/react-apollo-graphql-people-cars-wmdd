import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomePage from "./components/pages/HomePage";
import ShowPage from "./components/pages/ShowPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" exact component={HomePage} />
        <Route path="/people/:id" component={ShowPage} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
