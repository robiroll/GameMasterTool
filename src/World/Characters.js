// TODO: Get characters from firebase
export default [
  {
    idCharacter: 'pa',
    type: 'hero',
    name: 'Pa le Hobbit',
    lvl: 1,
    ap: 3,
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
    skills: [{ name: 'Calouflage' }, { name: 'Fuite' }],
    equipment: [{ name: 'Dague de la mort qui tue' }],
    inventory: [{ name: 'Couteau suisse' }]
  },
  {
    idCharacter: 'raoul',
    type: 'hero',
    name: 'Raoul la menace',
    lvl: -20,
    ap: 3,
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
    skills: [{ name: 'Faire du bruit' }, { name: "Fuite vers l'avant" }],
    equipment: [{ name: 'Gourdin' }],
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
    skills: [{ name: 'Calouflage' }, { name: 'Fuite' }],
    equipment: [{ name: 'Dague de la mort qui tue' }],
    inventory: [{ name: 'Couteau suisse' }]
  }
]
