import React, { Component } from 'react'
import CharacterComponent from '../../Components/Character'

const CHARACTER = {
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
  talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
  skills: [{ name: 'Calouflage' }, { name: 'Fuite' }],
  equipment: [{ name: 'Gourdin' }],
  inventory: [{ name: 'Couteau suisse' }]
}

export default class Character extends Component {
  render() {
    return <CharacterComponent data={CHARACTER} />
  }
}
