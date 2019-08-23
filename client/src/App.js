import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import Button from '@material-ui/core/Button';


import './App.css';

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

const login = (data) =>{
  axios.post(`http://localhost:5002/redacteur/login`, {name:'super'}, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

const post = (data) =>{
  axios.post(`http://localhost:5002/redacteur`, {}, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

const get = (data) =>{
  axios.get(`http://localhost:5002/redacteur/`, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

const data2 = {
	username:"username",
	password:"password"
}

const put = (data) =>{
  axios.put(`http://localhost:5002/redacteur/login`, data2, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

const eliminate = (data) =>{
  axios.delete(`http://localhost:5002/redacteur`, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

export default function App() {
  return (
    <Box  >
      <Box css={{ bgcolor: 'palevioletred', p: 1, textTransform: 'uppercase' }}>
        <header className="App">
          <div className="App-header">
            <h1>id:{'aqui'}</h1>
            <button onClick={login}>login</button>
            <button onClick={post}>post</button>
            <button onClick={get}>get</button>
            <button onClick={put}>put</button>
            <button onClick={eliminate}>delete</button>
          </div>
        </header>
      </Box >

      <Box clone pt={2} pr={1} pb={1} pl={2}>
      <Paper elevation={0}>
        
        <Grid container spacing={2} justify="flex-end" alignItems="center" wrap="nowrap">
          <Grid item>
            <Box bgcolor="primary.main" clone>
              <Avatar>
                <SignalWifiOffIcon />
              </Avatar>
            </Box>
          </Grid>
          <Grid item>
            <Typography>You have lost connection to the internet. This app is offline.</Typography>
          </Grid>
        </Grid>

        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            <Button color="primary">Turn on wifi</Button>
          </Grid>
        </Grid>

      </Paper>
    </Box>
      <Container maxWidth="sm">
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create React App v4-beta example
            </Typography>
            <ProTip />
            <Copyright />
          </Box>
      </Container>
    </Box >
  );
}
