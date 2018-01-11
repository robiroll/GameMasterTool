import { TURN_NEXT, TURN_END } from '../actions/actionTypes'
const initialState = {
  turn: 0
}
export default function fight(state = initialState, action) {
  switch (action.type) {
    case TURN_NEXT:
      return Object.assign({}, state, { turn: state.turn + 1 })
    case TURN_END:
      return Object.assign({}, state, { turn: 0 })
    default:
      return state
  }
}
