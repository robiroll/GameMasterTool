import { CHAR_ADD } from './actionTypes'

export const addCharacter = id => ({
  type: CHAR_ADD,
  payload: id
})
