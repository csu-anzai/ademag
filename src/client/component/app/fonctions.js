import axios from 'axios';

const data = {
    username:"username",
    password:"password"
}

/* GET */
export const status = () =>{
  axios.get(`http://localhost:5002/redacteur/`, { withCredentials: true })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

/* PUT */
export const login = () =>{
    axios.put(`http://localhost:5002/redacteur/login`, data, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

export const logout = ()=>{
    axios.put(`http://localhost:5002/redacteur/logout`, data, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

/* POST */
  export const createUser = () =>{
    axios.post(`http://localhost:5002/redacteur`, {
      value:["nom","prenom","2019-01-01","description","username","email","password","ed"]
    }, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

/* DELETE */
export const eliminate = () =>{
    axios.delete(`http://localhost:5002/redacteur`, { withCredentials: true })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}