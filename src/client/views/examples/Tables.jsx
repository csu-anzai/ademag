import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root:{
    marginTop:'2%',
    
  },
  paper: {
    width:'20%',
    textAlign: 'center',
    color: 'white',
    margin:'2%'

  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          Theming Examples
        </Typography>
        <Typography variant="h3" gutterBottom>
          Site
        </Typography>
        <Divider style={{margin:'2%'}}/>

          <Grid >
          <Typography variant="h1" component="h1" gutterBottom>
            Heading 1
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom>
            Heading 2
          </Typography>
          <Typography variant="h3" component="h3" gutterBottom>
            Heading 3
          </Typography>
          <Typography variant="h4" component="h4" gutterBottom>
            Heading 4
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            Heading 5
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom>
            Heading 6
          </Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1" gutterBottom>
              Example subtitle1 text
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Example subtitle2 text
            </Typography>
            <Typography variant="body1" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
              dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2" gutterBottom>
              body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
              dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </Grid>
          <Grid item xs >
                <Paper style={{backgroundColor:'Yellow', color:'black' }} className={classes.paper}>Yellow</Paper>
                <Paper style={{backgroundColor:'Green'}} className={classes.paper}>Green</Paper>
                <Paper style={{backgroundColor:'Blue'}} className={classes.paper}>Blue</Paper>
                <Paper style={{backgroundColor:'Purple'}} className={classes.paper}>Purple</Paper>
                <Paper style={{backgroundColor:'Brown'}} className={classes.paper}>Brown</Paper>
              
              
                <Paper style={{backgroundColor:'Orange'}} className={classes.paper}>Orange</Paper>
                <Paper style={{backgroundColor:'Olive'}} className={classes.paper}>Olive</Paper>
                <Paper style={{backgroundColor:'Teal'}} className={classes.paper}>Teal</Paper>
                <Paper style={{backgroundColor:'Violet'}} className={classes.paper}>Violet</Paper>
                <Paper style={{backgroundColor:'Pink'}} className={classes.paper}>Pink</Paper>
                <Paper style={{backgroundColor:'Grey'}} className={classes.paper}>Grey</Paper>

          </Grid>

        <Divider style={{margin:'2%'}}/>

        <Grid container spacing={6}>




          <Grid item xs ={6}>
            <Paper className={classes.paper}>xs1.1</Paper>
            <Grid item xs={6} style={{marginTop:'5%', padding:'10px'}}>
                <Paper style={{backgroundColor:'red'}} className={classes.paper}>red</Paper>
                <Paper style={{backgroundColor:'Yellow'}} className={classes.paper}>Yellow</Paper>
                <Paper style={{backgroundColor:'Green'}} className={classes.paper}>Green</Paper>
                <Paper style={{backgroundColor:'Blue'}} className={classes.paper}>Blue</Paper>
                <Paper style={{backgroundColor:'Purple'}} className={classes.paper}>Purple</Paper>
                <Paper style={{backgroundColor:'Brown'}} className={classes.paper}>Brown</Paper>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}