import {
  ROUND_NEXT,
  FIGHT_START,
  FIGHT_END,
  FIGHT_SELECTION_CHARACTER_ADD,
  FIGHT_SELECTION_CHARACTER_REMOVE,
  FIGHT_SELECTION_VALIDATE,
  SKILL_USE,
  ACTION_END_TURN,
  ACTION_DELAY_TURN,
  ACTION_USE,
  ORDER_CHARACTER_ADD
} from './actionTypes'

export const nextRound = () => ({
  type: ROUND_NEXT
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

export const removeCharacter = idCharacter => ({
  type: FIGHT_SELECTION_CHARACTER_REMOVE,
  payload: idCharacter
})

export const validateCharacters = () => ({
  type: FIGHT_SELECTION_VALIDATE
})

export const useSkill = skill => ({
  type: SKILL_USE,
  payload: skill
})

export const useAction = payload => ({
  type: ACTION_USE,
  payload
})
export const endTurn = payload => ({
  type: ACTION_END_TURN,
  payload
})
export const delayTurn = payload => ({
  type: ACTION_DELAY_TURN,
  payload
})
export const addCharacterInOrder = payload => ({
  type: ORDER_CHARACTER_ADD,
  payload
})
