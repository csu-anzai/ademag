import React from 'react';
import axios from 'axios';
import './app.css';
import ReactImage from './react.png';

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

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}