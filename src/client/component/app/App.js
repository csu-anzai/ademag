import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import {useStyles, theme} from './styleTheme'
import ReactImage from './react.png';
import './App.css'

import {
  login, 
  logout, 
  createUser, 
  eliminate, 
  status
} from './fonctions'

export default function App(){
  const classes = useStyles();

    return (
      <Box className={classes.app}>
          <Box className={classes.header}>
            <Typography variant="h1" className={classes.h1}>Title Exemple h1: {'Example'}</Typography>
            <Typography variant="h2">Title Exemple h2: {'Example'}</Typography>
            <Avatar alt="react" src={ReactImage} className={classes.bigAvatar} />
            <ThemeProvider theme={theme}>
              <Typography variant="h5">Title Exemple h5: {'avec ThemeProvider'}</Typography>
              <Button variant="contained" className={classes.status} onClick={status}>status</Button>
              <Button variant="contained" className={classes.login} onClick={login}>login</Button>
              <Button variant="contained" className={classes.logout} onClick={logout}>logout</Button>
              <Button variant="contained" color='primary' className={classes.button} onClick={createUser}>create user</Button>
              <Button variant="contained" color='secondary' className={classes.button} onClick={eliminate}>delete count</Button>
            </ThemeProvider>
          </Box>
      </Box >
    );
}