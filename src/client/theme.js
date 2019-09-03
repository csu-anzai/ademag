import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {purple, red} from '@material-ui/core/colors/';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary:purple,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text:{
      primary: "rgba(0, 31, 11, 0.96)",
      secondary: "rgba(88, 111, 94, 0.98)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 13,
    h1: {
      fontSize: 2.2,
      fontFamily:'sans-serif',
    },
    h2: {
      fontSize: 1.9,
      fontFamily:'sans-serif',
    },
    h3: {
      fontSize: 1.7,
      fontFamily:'sans-serif',
    },
    h4: {
      fontSize: 1.5,
      fontFamily:'sans-serif',
    },
    h5: {
      fontSize: 1.3,
      fontFamily:'sans-serif',
    },
    h6: {
      fontSize: 1.1,
      fontFamily:'sans-serif',
    },
  },
  spacing: 4,
  textAlign: 'left',
  
})

export default theme;