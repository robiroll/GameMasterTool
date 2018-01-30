import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from './firebase'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Character from './Containers/Character'
import Characters from './Containers/Characters'
import Dashboard from './Containers/Dashboard'
import './App.css'
import fight from './redux/reducers/fight'
import characters from './redux/reducers/characters'

// let middlewares = [thunk]
// const store = createStore(
//   combineReducers({
//     fight,
//     characters
//   }),
//   applyMiddleware(...middlewares),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// const store = () => {
// let store = createStore(fight, applyMiddleware(...middlewares))
// return store
// }

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  fight,
  characters
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  constructor(props) {
    super(props)
    // console.log(store)
    // firebaseInit()
  }
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
