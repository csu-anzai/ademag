import axios from 'axios';

/* GET */
export const status = () =>{
  axios.get(`${__API__}/redacteur/`, { withCredentials: true })
  .then(res => {
    console.log(res.data)
    console.log(__API__)
  })
  .catch(err => { // then print response status
      console.log(err)
  })
}

/* PUT */
export const login = (data) =>{
    axios.put(`${__API__}/redacteur/login`, data, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

export const logout = ()=>{
    axios.put(`${__API__}/redacteur/logout`, {}, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

/* POST */
  export const create = (data) =>{
    axios.post(`${__API__}/redacteur`, data, { withCredentials: true })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}

/* DELETE */
export const eliminate = () =>{
    axios.delete(`${__API__}/redacteur`, { withCredentials: true })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => { // then print response status
        console.log(err)
    })
}