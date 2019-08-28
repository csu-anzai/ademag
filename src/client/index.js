import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import Index from "./views/Index";
import Login from "./views/Login";


ReactDOM.render(
  <BrowserRouter>
    <div>
      <header>
        <Link to="/home">About</Link>
        {' '}
        <Link to="/">Login</Link>
        {' '}
        <strong>react-router-dom-example</strong>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Index} />
          <Route component={Index} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);