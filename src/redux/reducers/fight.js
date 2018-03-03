import { indexOf } from 'lodash'
import {
  ROUND_NEXT,
  FIGHT_START,
  FIGHT_END,
  FIGHT_SELECTION_CHARACTER_ADD,
  FIGHT_SELECTION_CHARACTER_REMOVE,
  FIGHT_SELECTION_VALIDATE,
  SKILL_USE,
  ACTION_END_TURN,
  ACTION_DELAY_TURN
} from '../actions/actionTypes'
const initialState = {
  round: 0,
  status: null,
  order: [],
  orderPlaying: [],
  orderDone: [],
  foes: [],
  characterPlaying: null
}
export default function fight(state = initialState, action) {
  let order = [...state.order]
  let orderPlaying = [...state.orderPlaying]
  let orderDone = [...state.orderDone]
  let orderItem = null
  let characterPlaying = orderPlaying[0]
  switch (action.type) {
    case ROUND_NEXT:
      return Object.assign({}, state, {
        round: state.round + 1,
        order,
        orderPlaying: order,
        orderDone: [],
        characterPlaying: order[0]
      })

    case FIGHT_START:
      return Object.assign({}, state, { round: 1, status: 'selection' })

    case FIGHT_END:
      return Object.assign({}, state, initialState)

    case FIGHT_SELECTION_CHARACTER_ADD:
      order.push(action.payload)
      return Object.assign({}, state, { order })

    case FIGHT_SELECTION_CHARACTER_REMOVE:
      order = order.filter(idCharacter => idCharacter !== action.payload)
      orderPlaying = orderPlaying.filter(
        idCharacter => idCharacter !== action.payload
      )
      orderDone = orderDone.filter(
        idCharacter => idCharacter !== action.payload
      )
      return Object.assign({}, state, { order, orderPlaying, orderDone })

    case FIGHT_SELECTION_VALIDATE:
      return Object.assign({}, state, {
        status: 'in-progress',
        orderPlaying: order,
        characterPlaying: order[0]
      })

    case SKILL_USE:
      // characterPlaying = { ...characterPlaying, ap: characterPlaying.ap - action.payload }
      return Object.assign({}, state, { characterPlaying })

    case ACTION_END_TURN:
      // order.splice(indexOf(order, characterPlaying), 1, characterPlaying)
      orderPlaying = orderPlaying.filter(
        idCharacter => idCharacter !== characterPlaying
      )
      orderDone.push(characterPlaying)
      characterPlaying = orderPlaying[0]
      return Object.assign({}, state, {
        orderPlaying,
        orderDone,
        characterPlaying
      })

    case ACTION_DELAY_TURN:
      orderItem = order.find(item => item === characterPlaying)
      orderPlaying = orderPlaying.filter(char => char !== characterPlaying)
      orderPlaying.push(orderItem)
      characterPlaying = orderPlaying[0]
      return Object.assign({}, state, { orderPlaying, characterPlaying })

    default:
      return state
  }
}
