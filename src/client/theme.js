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
    fontSize: 8,
    htmlFontSize: 9,
  },
  spacing: 4,
  textAlign: 'left',
})

export default theme;