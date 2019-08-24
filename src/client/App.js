import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';




export default function App(){
    return (
      <div>
        <h1>Loading.. please wait!</h1>
        <img src={ReactImage} alt="react" />
      </div>
    );
}
