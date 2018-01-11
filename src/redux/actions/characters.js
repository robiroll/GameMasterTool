import { CHAR_GET } from './actionTypes'

export const getCharacter = id => ({
  type: CHAR_GET,
  payload: id
})
