import { findIndex } from 'lodash'
import {
  TURN_NEXT,
  FIGHT_START,
  FIGHT_END,
  FIGHT_SELECTION_CHARACTER_ADD,
  FIGHT_SELECTION_FOE_ADD,
  FIGHT_SELECTION_CHARACTER_REMOVE,
  FIGHT_SELECTION_VALIDATE,
  FIGHT_CHAR_END_TURN,
  FIGHT_CHAR_DELAY,
  SKILL_USE,
  ACTION_USE,
  ACTION_ATTACK,
  ACTION_MOVE,
  ACTION_END_TURN,
  ACTION_DELAY_TURN
} from '../actions/actionTypes'
const initialState = {
  turn: 0,
  status: null,
  order: [],
  orderPlaying: [],
  orderDone: [],
  foes: [],
  characterPlaying: null
}
export default function fight(state = initialState, action) {
  let foes = [...state.foes]
  let foe = {}
  let order = [...state.order]
  let orderPlaying = [...state.orderPlaying]
  let orderDone = [...state.orderDone]
  let orderItem = null
  let characterPlaying = { ...state.characterPlaying }
  switch (action.type) {
    case TURN_NEXT:
      order.map(char => {
        char.ap += char.apBase
        if (char.ap > char.apMax) char.ap = char.apMax
      })
      return Object.assign({}, state, {
        turn: state.turn + 1,
        order,
        orderPlaying: order,
        orderDone: [],
        characterPlaying: order[0]
      })

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
      return Object.assign({}, state, { status: 'in-progress', orderPlaying: order, characterPlaying: order[0] })

    case SKILL_USE:
      characterPlaying = { ...characterPlaying, ap: characterPlaying.ap - action.payload }
      return Object.assign({}, state, { characterPlaying })

    case ACTION_ATTACK:
      characterPlaying = { ...characterPlaying, ap: characterPlaying.ap - action.payload.size }
      return Object.assign({}, state, { characterPlaying })

    case ACTION_MOVE:
      characterPlaying = { ...characterPlaying, ap: characterPlaying.ap - 1 }
      return Object.assign({}, state, { characterPlaying })

    case ACTION_END_TURN:
      order.splice(findIndex(order, { idCharacter: characterPlaying.idCharacter }), 1, characterPlaying)
      orderPlaying = orderPlaying.filter(char => char.idCharacter !== characterPlaying.idCharacter)
      orderDone.push(characterPlaying)
      characterPlaying = orderPlaying[0]
      return Object.assign({}, state, { order, orderPlaying, orderDone, characterPlaying })

    case ACTION_DELAY_TURN:
      orderItem = order.find(item => item.idCharacter === characterPlaying.idCharacter)
      orderPlaying = orderPlaying.filter(char => char.idCharacter !== characterPlaying.idCharacter)
      orderPlaying.push(orderItem)
      characterPlaying = orderPlaying[0]
      return Object.assign({}, state, { orderPlaying, characterPlaying })

    default:
      return state
  }
}
