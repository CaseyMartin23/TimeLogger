import React from "react";
import "./App.css";
// import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" component={Login} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
