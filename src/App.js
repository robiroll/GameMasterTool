import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Character from './Containers/Character'
import './App.css'

class App extends Component {
  state = {
    turn: 0
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to RPG</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Character} />
            <Route path="/:idCharacter" component={Character} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
