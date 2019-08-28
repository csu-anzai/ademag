import React, { useEffect, useState }  from 'react'
import {get, put, post, del, getLoginStatus} from '../../global-fonctions/fetchAxios'
import SignUpView from './SignUpView'
import {yyyymmdd} from '../../global-fonctions/dateFormat'

export default function SignUp(props){
    let [value, setValue] = useState(["nom","prenom",new Date('2019-01-01'),"description","username","email","password", 30])
    let [validate, setValidate] = useState(false)
    
    
    let createUser = async()=>{
        if(!validate) return console.log('you need to accept the conditions') 

        let valueTemp = value
        valueTemp[2]= await `${yyyymmdd(value[2])}`
        console.log(valueTemp)
        let result = await post({
          url:'/redacteur/',
          value:valueTemp
        })
        console.log(result)
    }

    let prenom =(evt)=>{
        //console.log(evt.target.value)
        let tempValue = value
        tempValue[0] = evt.target.value
        setValue(tempValue)
    }

    let nom =(evt)=>{
        //console.log(evt.target.value)
        let tempValue = value
        tempValue[1] = evt.target.value
        setValue(tempValue)
    }

    let birthdate =(date)=>{
        //console.log(date)
        let tempValue = value
        tempValue[2] = date
        setValue(tempValue)
    }

    let description =(evt)=>{
       //console.log(evt.target.value)
        let tempValue = value
        tempValue[3] = evt.target.value
        setValue(tempValue)
    }

    let username =(evt)=>{
        //console.log(evt.target.value)
        let tempValue = value
        tempValue[4] = evt.target.value
        setValue(tempValue)
    }

    let email =(evt)=>{
        //console.log(evt.target.value)
        let tempValue = value
        tempValue[5] = evt.target.value
        setValue(tempValue)
    }

    let password =(evt)=>{
        //console.log(evt.target.value)
        let tempValue = value
        tempValue[6] = evt.target.value
        setValue(tempValue)
    }

    let sex =(genre)=>{
        console.log(genre)
        let tempValue = value
        tempValue[7] = genre
        setValue(tempValue)
    }

    let acept =()=>{
        setValidate(!validate)
    }

    return <SignUpView
        sumitButton ={createUser}
        prenom={prenom}
        nom={nom}
        birthdate={birthdate}
        currerBirthdate={value[2]}
        description={description}
        username={username}
        email={email}
        password={password}
        sexeValue={value[7]}
        sex={sex}
        acept={acept}
    />

}