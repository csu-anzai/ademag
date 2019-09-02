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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    margin:'5%',
    
  },
  paper: {
    width:'20%',
    textAlign: 'center',
    color: 'white',
    margin:'10%'

  },
  card: {
    minWidth: 275,
    maxWidth: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


function Boite (props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return(


        
        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be
            {bull}
            nev
            {bull}o{bull}
            lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

  )
}

export default function Index() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Box className={classes.root}>
      <Typography variant="h1" component="h1" gutterBottom>
          Theming Examples
        </Typography>
        <Typography variant="h3" gutterBottom>
          Site
        </Typography>
        <Divider style={{margin:'2%'}}/>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Box className={classes.card}>
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
        </Box>
        <Box className={classes.card}>
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
        </Box>
        <Divider style={{margin:'4%'}}/>
        <Grid item xs={12} style={{margin:'2%'}}>
        <Button variant="contained" className={classes.button}>
        Default
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="contained" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
        </Grid>
      </Grid>
    </Box>
  );
}