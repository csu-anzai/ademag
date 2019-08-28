import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/logic-component/app/App';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

let themeResposive = createMuiTheme(theme);
themeResposive = responsiveFontSizes(themeResposive);

ReactDOM.render(

    <ThemeProvider theme={themeResposive}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
  </ThemeProvider>,
  document.querySelector('#root')
);