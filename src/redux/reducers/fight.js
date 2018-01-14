import {
  TURN_NEXT,
  FIGHT_START,
  FIGHT_END,
  FIGHT_SELECTION_CHARACTER_ADD,
  FIGHT_SELECTION_FOE_ADD,
  FIGHT_SELECTION_CHARACTER_REMOVE,
  FIGHT_SELECTION_VALIDATE,
  FIGHT_CHAR_END_TURN,
  FIGHT_CHAR_DELAY
} from '../actions/actionTypes'
const initialState = {
  turn: 0,
  status: null,
  order: [],
  orderPlaying: [],
  orderDone: [],
  foes: []
}
export default function fight(state = initialState, action) {
  let foes = [...state.foes]
  let foe = {}
  let order = [...state.order]
  let orderPlaying = [...state.orderPlaying]
  let orderDone = [...state.orderDone]
  let orderItem = null
  switch (action.type) {
    case TURN_NEXT:
      return Object.assign({}, state, { turn: state.turn + 1, orderPlaying: order, orderDone: [] })
    case FIGHT_START:
      return Object.assign({}, state, { turn: 1, status: 'selection' })
    case FIGHT_END:
      return Object.assign({}, state, initialState)
    case FIGHT_SELECTION_CHARACTER_ADD:
      order.push(action.payload)
      return Object.assign({}, state, { order })
    case FIGHT_SELECTION_FOE_ADD:
      Object.assign(foe, action.payload)
      foes.push(foe)
      order.push(foe)
      return Object.assign({}, state, { order, foes })
    case FIGHT_SELECTION_CHARACTER_REMOVE:
      order = order.filter(char => char.idCharacter !== action.payload)
      orderPlaying = orderPlaying.filter(char => char.idCharacter !== action.payload)
      orderDone = orderDone.filter(char => char.idCharacter !== action.payload)
      return Object.assign({}, state, { order, orderPlaying, orderDone })
    case FIGHT_SELECTION_VALIDATE:
      return Object.assign({}, state, { status: 'in-progress', orderPlaying: order })
    case FIGHT_CHAR_END_TURN:
      orderItem = order.find(item => item.idCharacter === action.payload)
      orderPlaying = orderPlaying.filter(char => char.idCharacter !== action.payload)
      orderDone.push(orderItem)
      return Object.assign({}, state, { orderPlaying, orderDone })
    case FIGHT_CHAR_DELAY:
      orderItem = order.find(item => item.idCharacter === action.payload)
      orderPlaying = orderPlaying.filter(char => char.idCharacter !== action.payload)
      orderPlaying.push(orderItem)
      return Object.assign({}, state, { orderPlaying })
    default:
      return state
  }
}
