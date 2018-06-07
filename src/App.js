import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import fbConfig from './firebase'
import { Provider } from 'react-redux'
import fight from './redux/reducers/fight'

import CharacterPage from './Containers/CharacterPage'
import Characters from './Containers/Characters'
import Skills from './Containers/Skills'
import Items from './Containers/Items'
import Dashboard from './Containers/Dashboard'
import Layout from './Layout'
import './App.css'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(fbConfig, rrfConfig) // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  fight
  // characters
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
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div className="app--wrapper">
            <BrowserRouter>
              <Switch>
                <Layout>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/characters" component={Characters} />
                  <Route exact path="/skills" component={Skills} />
                  <Route exact path="/characters/:idCharacter" component={CharacterPage} />
                  <Route exact path="/items" component={Items} />
                </Layout>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
