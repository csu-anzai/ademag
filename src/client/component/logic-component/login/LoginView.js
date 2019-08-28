import React from 'react';
import { useStyles } from './styleTheme';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function SignIn(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.header}>
        <img alt="react" src={`${__API__}/images/reactLogo.jpg`} className={classes.bigAvatar} />     
        <Box className={classes.title}>
          <Typography variant="h4">
              Malki
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
      </Box>
      <CssBaseline />
      <Box className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or Username"
            name="email"
            autoComplete="email"
            autoFocus
            style={{background:'white'}}
            onChange={props.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{background:'white'}}
            onChange={props.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.singIn}
          >
            Sign In
          </Button>
          <Typography>
            <Link href="#" variant="body2">
              Forgot password?
          </Link>
          </Typography>
          <Typography>
            <Link href="#" variant="body2" onClick={props.singUp}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Typography>
        </form>        
      </Box>
    </Container>
  );
}