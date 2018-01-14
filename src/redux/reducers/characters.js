import { CHAR_GET } from '../actions/actionTypes'
import firebase from '../../firebase'
const initialState = {
  characters: [],
  selectedCharacter: {}
}
export default function fight(state = initialState, action) {
  let selectedCharacter = {}
  let newState = {}
  const characters = firebase.database().ref('characters')
  characters.once('value').then(snapshot => {
    // console.log(snapshot.val())
  })
  switch (action.type) {
    case CHAR_GET:
      selectedCharacter = action.payload
      newState = {
        ...state,
        selectedCharacter
      }
      return newState
    default:
      return state
  }
}
