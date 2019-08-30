import axios from 'axios';

/* GET */
export const get = async(data) =>{
  return new Promise(async (resolve)=>{
    axios.get(`${__API__}${data.url}`, { withCredentials: true })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      resolve(err)
    })
  })
}

/* PUT */
export const put = async(data) =>{
  return new Promise(async (resolve)=>{
    axios.put(`${__API__}${data.url}`, data, { withCredentials: true })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      resolve(err)
    })
  })
}

/* POST */
export const post = async(data) =>{
  return new Promise(async (resolve)=>{
    axios.post(`${__API__}${data.url}`, data, { withCredentials: true })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      resolve(err)
    })
  })
}

/* DELETE */
export const del = async(data) =>{
  return new Promise(async (resolve)=>{
    axios.delete(`${__API__}${data.url}`, { withCredentials: true })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      resolve(err)
    })
  })
}

export const getLoginStatus = async(setLoginStatus)=>{
  let result = await get({
    url:'/redacteur/'
  })
  console.log(await result)
  setLoginStatus(result.login)
}
