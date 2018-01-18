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
    equipment: [
      {
        slot: 'weapon',
        item: {
          name: 'Dague de la mort qui tue',
          size: 2,
          damage: 100,
          bonus: { dexterity: 2, strength: 1 }
        }
      },
      {
        slot: 'head',
        item: {
          name: 'Chapeau de paille',
          bonus: { dexterity: 1 }
        }
      },
      { slot: 'neck', item: null },
      { slot: 'back', item: null },
      { slot: 'waist', item: null },
      { slot: 'hands', item: null },
      { slot: 'ring1', item: null },
      { slot: 'ring2', item: null },
      { slot: 'legs', item: null },
      { slot: 'shoulders', item: null },
      { slot: 'torso', item: null },
      { slot: 'wrists', item: null },
      { slot: 'feet', item: null }
    ],
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
    equipment: [
      {
        slot: 'weapon',
        item: {
          name: 'Gourdin',
          size: 3,
          damage: 150,
          bonus: { dexterity: 1, strength: 3 }
        }
      },
      { slot: 'head', item: null },
      { slot: 'neck', item: null },
      { slot: 'back', item: null },
      { slot: 'waist', item: null },
      { slot: 'hands', item: null },
      { slot: 'ring1', item: null },
      { slot: 'ring2', item: null },
      { slot: 'legs', item: null },
      { slot: 'shoulders', item: null },
      { slot: 'torso', item: null },
      { slot: 'wrists', item: null },
      { slot: 'feet', item: null }
    ],
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
    equipment: [
      {
        slot: 'weapon',
        item: {
          name: 'Dague de la mort qui tue',
          size: 2,
          damage: 10,
          bonus: { dexterity: 2, strength: 1 }
        }
      },
      { slot: 'head', item: null },
      { slot: 'neck', item: null },
      { slot: 'back', item: null },
      { slot: 'waist', item: null },
      { slot: 'hands', item: null },
      { slot: 'ring1', item: null },
      { slot: 'ring2', item: null },
      { slot: 'legs', item: null },
      { slot: 'shoulders', item: null },
      { slot: 'torso', item: null },
      { slot: 'wrists', item: null },
      { slot: 'feet', item: null }
    ],
    inventory: [{ name: 'Couteau suisse' }]
  }
]
