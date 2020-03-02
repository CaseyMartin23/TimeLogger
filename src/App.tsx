import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
