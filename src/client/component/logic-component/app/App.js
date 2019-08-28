import React, { useEffect, useState }  from 'react'
import {Button, Typography, Box, Avatar, Link, SvgIcon} from '@material-ui/core/'
import {useStyles} from './styleTheme'
import {get, put, post, del, getLoginStatus} from '../../global-fonctions/fetchAxios'
import LoginC from '../login/Login'
import SignUp from '../signUp/SignUp'




export default function App(){
  //configurations
  const classes = useStyles();

  useEffect(() => {
    console.log('app.js executed')
  }, []);  

  return (
    <Box className={classes.app}>
      <Box className={classes.header}>
        <LoginC/>
        <SignUp/>
      </Box>
    </Box>
  );
}