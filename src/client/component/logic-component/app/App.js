import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact />
          <Route path='/index' exact />
          <Route path='/post/:id' />
        </Switch>
      </BrowserRouter>
    );
  }
}