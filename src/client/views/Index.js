import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import Index from "./Index";
import Login from "./Login";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <main>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Index} />
          <Route component={Index} />
        </Switch>
      </main>
      </div>
    )
  }
}
export default App