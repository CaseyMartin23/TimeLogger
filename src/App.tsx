import React from "react";
import "./App.css";
// import { Login } from "./pages/Login";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Companies } from "./components/Companies";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.css";
import Layout from "./components/Layout";
import { Tickets } from "./components/Tickets";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/companies" component={Companies} />
            <Route path="/tickets" component={Tickets} />
          </Layout>
        </Switch>
      </Switch>
    </Router>
  );
};

export default App;
