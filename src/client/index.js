import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routerController from './asset/routerController'
import routes from "./routes";

import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/index" />
      {routerController(routes)}
      <Route component={routes[0].component} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);