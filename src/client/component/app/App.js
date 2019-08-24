import React, { useEffect }  from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import {useStyles, theme} from './styleTheme'
import './App.css'

import {
  login, 
  logout, 
  create, 
  eliminate, 
  status
} from './fetchAxios'

const loginUser =()=>{
  login({
    username:"username",
    password:"password"
  })
}

const createUser =()=>{
  create({
    value:["nom","prenom","2019-01-01","description","username","email","password","ed"]
  })
}

export default function App(){
  
  const classes = useStyles();
  useEffect(() => {
    status()
  }, []);

    return (
      <Box className={classes.header}>
        <ThemeProvider theme={theme}>
          <Typography variant="h1">Title Exemple h1</Typography>
          <Typography variant="h2">Title Exemple h2</Typography>
          <Typography variant="h3">Title Exemple h3</Typography>
          <Avatar alt="react" src={`${__API__}/images/react.png`} className={classes.bigAvatar} />
          <Typography variant="h4">Title Exemple h4</Typography>
          <Typography variant="h5">Title Exemple h5</Typography>
          <Typography variant="h6">Title Exemple h6</Typography>
          <Button variant="contained" className={classes.status} onClick={status}>status</Button>
          <Button variant="contained" className={classes.login} onClick={loginUser}>login</Button>
          <Button variant="contained" className={classes.logout} onClick={logout}>logout</Button>
          <Button variant="contained" color='primary' className={classes.button} onClick={createUser}>create user</Button>
          <Button variant="contained" color='secondary' className={classes.button} onClick={eliminate}>delete count</Button>
        </ThemeProvider>
      </Box>
    );
}