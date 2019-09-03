import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import routerController from './fonctions/routerController'
import routes from "./routes";
import theme from './theme';

let themeResposive = createMuiTheme(theme);
themeResposive = responsiveFontSizes(themeResposive);

ReactDOM.render(
  <ThemeProvider theme={themeResposive}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/index" />
        {routerController(routes)}
        <Route component={routes[0].component} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root')
);