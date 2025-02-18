import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { AddressPage } from "./pages/AddressPage";
import { BlockPage } from "./pages/BlockPage";
import { TransactionPage } from "./pages/TransactionPage";
import { BlockTransactionsPage } from "./pages/BlockTransactionsPage";
import { CreateTransactionPage } from "./pages/CreateTransactionPage";
import { ContractPage } from "./pages/ContractPage";
import { config } from "./config";
import { ChainProvider } from "./contexts/network";

const client = new ApolloClient({
  uri: config.apiUrl,
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChainProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path={"/address/:address"} component={AddressPage} />
            <Route path={"/block/:block/transactions"} component={BlockTransactionsPage} />
            <Route path={"/block/:block"} component={BlockPage} />
            <Route path={"/transaction/:transaction"} component={TransactionPage} />
            <Route path={"/create-transaction/:transaction"} component={CreateTransactionPage} />
            <Route path={"/contract/:contract"} component={ContractPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ChainProvider>
    </ApolloProvider>
  );
}

export default App;
