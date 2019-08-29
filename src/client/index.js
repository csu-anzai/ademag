import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './component/logic-component/app/App';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import routes from "./routes";

let getRoutes = routes => {
  return routes.map((prop, key) => {
    return (
      <Route
        exact path={prop.path}
        component={prop.component}
        key={key}
      />
    );
  });
};

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

let themeResposive = createMuiTheme(theme);
themeResposive = responsiveFontSizes(themeResposive);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/index" />
      {getRoutes(routes)}
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);






/*
    <ThemeProvider theme={themeResposive}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. *//*}
      <CssBaseline />




      <App />
  </ThemeProvider>

*/