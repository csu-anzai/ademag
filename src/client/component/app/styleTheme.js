import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { deepPurple, blue } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      width:'10%'
    },
    login: {
      margin: theme.spacing(1),
      width:'10%',
      '&:hover': {
        background: 'linear-gradient(45deg, #40bf80 30%,  #339966 90%)',
        color:'white'
      }
    },
    status: {
      margin: theme.spacing(1),
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      width:'10%',
      '&:hover': {
        color:'white'
      }
    },
    logout:{
      margin: theme.spacing(1),
      width:'10%',
      '&:hover': {
        background: 'linear-gradient(45deg, #ff0066 30%,  #ff0000 90%)',
        color:'white'
      }
    },
    input: {
      display: 'none',
    },
    header:{
      textAlign: 'center',
      textTransform: 'uppercase',
      bgcolor: '#282c34',
      p:1,
      position: 'relative',
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    bigAvatar: {
      margin: 50,
      width: 180,
      height: 180,
    }
}));


export const theme = createMuiTheme({
    root:{
      padding: '4',
    },
    palette: {
      primary: deepPurple
    },
    typography: {
      h1:{
        color:'green'
      },
      h2:{
        color:'red'
      },
      h3:{
        color:'blue'
      },
      h4:{
        color:'yellow'
      },
      h5:{
        color:'white'
      },
      h6:{
        color:'gris'
      },
    }
});