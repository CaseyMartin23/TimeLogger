import React from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Companies } from "./components/Companies";
import { Hub } from "./pages/Hub";
import { Summary } from "./pages/Summary";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.css";
import Layout from "./components/Layout";
import { Tickets } from "./components/Tickets";
import { CompanyTickets } from "./components/CompanyTickets";
import { Ticket } from "./components/Ticket";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/companies" component={Companies} />
            <Route path="/company-tickets" component={CompanyTickets} />
            <Route path="/tickets" component={Tickets} />
            <Route path="/ticket" component={Ticket} />
            <Route path="/summary" component={Summary} />
            <Route path="/hub" component={Hub} />
          </Layout>
        </Switch>
      </Switch>
    </Router>
  );
};

export default App;
