import React from "react";
import Boite from '../../component/Boite/BoiteView'
import { Redirect } from 'react-router-dom'

export default function Icons(props) {

  const partager =(evt)=>{
    console.log('clik')
    return window.location="/index"
  }
    return (
      <>
       <div>
         <h1>Icons</h1>
          <Boite
            title='titre'
            description = 'description'
            value='kldjfhl'
            photoUrl='https://picsum.photos/id/997/200/300'
            partager={partager}
          />
       </div>
      </>
    );
}