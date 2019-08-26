import React, { useEffect }  from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import {useStyles, theme} from './styleTheme'
import {get, put, post, del} from '../global-fonctions/fetchAxios'
import {Button, Typography, Box, Avatar} from '@material-ui/core/'

const status = async()=>{
  let result = await get({
    url:'/redacteur/'
  })
  console.log(await result)
}

const loginUser = async()=>{
  let result = await put({
    url:'/redacteur/login',
    username:"username",
    password:"password"
  })
  console.log(await result)
}

const logout = async()=>{
  let result = await put({
    url:'/redacteur/logout'
  })
  console.log(await result)
}

const createUser = async()=>{
  let result = await post({
    url:'/redacteur/',
    value:["nom","prenom","2019-01-01","description","username","email","password"]
  })
  console.log(await result)
}

const eliminate = async()=>{
  let result = await del({
    url:'/redacteur/'
  })
  console.log(await result)
}

export default function App(){
  const classes = useStyles();
  useEffect(() => {
    console.log('app.js executed')
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