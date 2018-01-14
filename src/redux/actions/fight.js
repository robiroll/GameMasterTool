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
} from './actionTypes'

export const nextTurn = () => ({
  type: TURN_NEXT
})

export const startFight = () => ({
  type: FIGHT_START
})
export const endFight = () => ({
  type: FIGHT_END
})

export const selectCharacter = idCharacter => ({
  type: FIGHT_SELECTION_CHARACTER_ADD,
  payload: idCharacter
})

export const selectFoe = idCharacter => ({
  type: FIGHT_SELECTION_FOE_ADD,
  payload: idCharacter
})

export const removeCharacter = idCharacter => ({
  type: FIGHT_SELECTION_CHARACTER_REMOVE,
  payload: idCharacter
})

export const validateCharacters = () => ({
  type: FIGHT_SELECTION_VALIDATE
})

export const endCharaterTurn = idCharacter => ({
  type: FIGHT_CHAR_END_TURN,
  payload: idCharacter
})

export const delayCharacterTurn = idCharacter => ({
  type: FIGHT_CHAR_DELAY,
  payload: idCharacter
})
