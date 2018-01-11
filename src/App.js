import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Character from './Containers/Character'
import Characters from './Containers/Characters'
import Dashboard from './Containers/Dashboard'
import './App.css'
import fight from './redux/reducers/fight'

const store = createStore(fight, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App
