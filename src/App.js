import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Character from './Containers/Character'
import Characters from './Containers/Characters'
import Dashboard from './Containers/Dashboard'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app--header">
          <h1 className="app--title">Welcome to RPG</h1>
        </header>
        <div className="app--wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/characters" component={Characters} />
              <Route exact path="/:idCharacter" component={Character} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App
