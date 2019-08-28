import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(6, 3, 0),
    },
    app:{

    },
    header:{
      textAlign: 'center',
      textTransform: 'uppercase',
      bgcolor: '#282c34',
      p:1,
      backgroundColor: '#white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
    footer:{
      minHeight: '10vh',
      display: 'flex',
      fontSize: 'calc(10px + 2vmin)',
    },
    button: {
      margin: theme.spacing(1),
      width:'100%'
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
      width:'100%',
      '&:hover': {
        background: 'linear-gradient(45deg, #ff0066 30%,  #ff0000 90%)',
        color:'white'
      }
    },
    input: {
      display: 'none',
    },
    avatar: {
      margin: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
    lightBulb: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(0),
    },

}));