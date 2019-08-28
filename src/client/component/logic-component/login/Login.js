import React, { useEffect, useState }  from 'react'
import {Button, Typography, Box, Avatar, Link, SvgIcon} from '@material-ui/core/'
import {get, put, post, del, getLoginStatus} from '../../global-fonctions/fetchAxios'
import LoginView from './LoginView'

function Contenu(props) {
    return(
        <Box>
        <Typography> your are logued</Typography>
        <Button variant="contained" onClick={props.logout}>logout</Button>
        <Button variant="contained" color='secondary' onClick={props.eliminate}>delete count</Button>
        </Box>
    )
}

export default function Login(props){
    let [loginStatus, setLoginStatus] = useState(0);
    let [username, setUsernameX] = useState()
    let [password, setPassword] = useState()

    useEffect(() => {
        getLoginStatus(setLoginStatus)
    }, []);

    let login = async()=>{
        let result = await put({
          url:'/redacteur/login',
          username,
          password
        })
        result.err? console.log(result):console.log('Login OK')
        setLoginStatus(result.login)
    }

    let logout = async()=>{
        let result = await put({
          url:'/redacteur/logout'
        })
        setLoginStatus(result.login)
    }

    let eliminate = async()=>{
        let result = await del({
          url:'/redacteur/'
        })
        console.log(await result)
        getLoginStatus(setLoginStatus)
    }

    let createUser = async()=>{
        let result = await post({
          url:'/redacteur/',
          value:["nom","prenom","2019-01-01","description","username","email","password"]
        })
        console.log(result)
    }

    let usernameF = (evt)=>{
        setUsernameX(evt.target.value)
    }

    let passwordF = (evt)=>{
        setPassword(evt.target.value)
    }

    return (
        <Box>{
            loginStatus === 0? 
            <Typography>LOADING ...</Typography>:
            loginStatus == false? 
            <LoginView 
                singIn={login} 
                singUp ={createUser}
                username = {usernameF}
                password = {passwordF}
            /> : 
            <Contenu
                logout ={logout}
                eliminate = {eliminate}
            />
        }</Box>
    )
}