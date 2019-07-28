import React from './node_modules/react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src='https://ademag.org/images/001.jpg' alt="Logo1" width='250px' height='250px'/>
        <img src='https://ademag.org/images/002.png' alt="Logo2" width='250px' height='250px'/>
        <img src='https://ademag.org/images/003.jpg' alt="Logo3" width='250px' height='250px'/>
        <img src='https://ademag.org/images/004.jpg' alt="Logo4" width='250px' height='250px'/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
    </div>
  );
}

export default App;
