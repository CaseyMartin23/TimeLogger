import React from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
