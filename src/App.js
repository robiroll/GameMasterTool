import React, { Component } from 'react'
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
        <Character />
      </div>
    )
  }
}

export default App
