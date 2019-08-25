import React, { useEffect }  from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
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

  useEffect(() => {
    status()
  }, []);

    return (
      <div>
      <Appbar></Appbar>
      <Container>
        <Button color="primary" onClick={status}>status</Button>
        <Button color="primary" onClick={loginUser}>loginUser</Button>
        <Button color="primary" onClick={logout}>logout</Button>
        <Button color="primary" onClick={createUser}>createUser</Button>
        <Button color="primary" onClick={eliminate}>eliminate</Button>
      </Container>
    </div>
    );
}