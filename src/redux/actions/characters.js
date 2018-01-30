import { CHAR_ADD, CHAR_GET } from './actionTypes'

export const addCharacter = id => ({
  type: CHAR_ADD,
  payload: id
})

export const getCharacter = id => ({
  type: CHAR_GET,
  payload: id
})
