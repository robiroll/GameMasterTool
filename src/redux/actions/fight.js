import { TURN_NEXT, TURN_END } from './actionTypes'

export const nextTurn = () => ({
  type: TURN_NEXT
})

export const endTurn = () => ({
  type: TURN_END
})
