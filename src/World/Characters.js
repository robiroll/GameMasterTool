import { ACTION_ATTACK, ACTION_MOVE, ACTION_END_TURN, ACTION_DELAY_TURN } from '../redux/actions/actionTypes'
// TODO: Get characters from firebase
export default [
  {
    idCharacter: 'pa',
    type: 'hero',
    name: 'Pa le Hobbit',
    lvl: 1,
    ap: 3,
    apBase: 3,
    apMax: 5,
    attributes: {
      strength: 5,
      dexterity: 5,
      constitution: 5,
      intelligence: 5,
      perception: 5,
      speed: 5
    },
    race: 'Hobbit',
    class: 'Thief',
    talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
    skills: [{ name: 'Calouflage', cost: 3 }, { name: 'Fuite', cost: 1 }],
    actions: [
      { name: 'attack', action: ACTION_ATTACK },
      { name: 'move', action: ACTION_MOVE },
      { name: 'end turn', action: ACTION_END_TURN },
      { name: 'Delay', action: ACTION_DELAY_TURN }
    ],
    equipment: {
      weapon: {
        name: 'Dague de la mort qui tue',
        size: 2,
        damage: 100
      }
    },
    inventory: [{ name: 'Couteau suisse' }]
  },
  {
    idCharacter: 'raoul',
    type: 'hero',
    name: 'Raoul la menace',
    lvl: -20,
    ap: 3,
    apBase: 3,
    apMax: 5,
    attributes: {
      strength: 5,
      dexterity: 5,
      constitution: 5,
      intelligence: 5,
      perception: 5,
      speed: 5
    },
    race: 'Hobbit',
    class: 'Cleric',
    talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl -8000' }],
    skills: [{ name: 'Faire du bruit', cost: 1 }, { name: "Fuite vers l'avant", cost: 1 }],
    actions: [
      { name: 'attack', action: ACTION_ATTACK },
      { name: 'move', ACTION_MOVE },
      { name: 'end turn', action: ACTION_END_TURN },
      { name: 'Delay', action: ACTION_DELAY_TURN }
    ],
    equipment: {
      weapon: {
        name: 'Gourdin',
        size: 3,
        damage: 150
      }
    },
    inventory: [{ name: 'Couteau suisse' }]
  }
]

export const foes = [
  {
    idCharacter: 'skeleton',
    type: 'enemy',
    name: 'Skeleton',
    lvl: 5,
    ap: 2,
    apBase: 3,
    apMax: 6,
    attributes: {
      strength: 4,
      dexterity: 4,
      constitution: 4,
      intelligence: 4,
      perception: 4,
      speed: 7
    },
    race: 'Undead',
    class: 'Archer',
    talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
    skills: [{ name: 'Calouflage', cost: 1 }, { name: 'Fuite', cost: 1 }],
    actions: [
      { name: 'attack', action: ACTION_ATTACK },
      { name: 'move', ACTION_MOVE },
      { name: 'end turn', action: ACTION_END_TURN },
      { name: 'Delay', action: ACTION_DELAY_TURN }
    ],
    equipment: {
      weapon: {
        name: 'Dague de la mort qui tue',
        size: 2,
        damage: 10
      }
    },
    inventory: [{ name: 'Couteau suisse' }]
  }
]
