import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'

const CHARACTERS = [
  {
    idCharacter: 'pa',
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
  },
  {
    idCharacter: 'raoul',
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
    talents: [{ name: 'Maîtrise épée lvl 1' }, { name: 'Furtivité lvl 1' }],
    skills: [{ name: 'Calouflage' }, { name: 'Fuite' }],
    equipment: [{ name: 'Gourdin' }],
    inventory: [{ name: 'Couteau suisse' }]
  }
]

export default class Character extends Component {
  static propTypes = {
    match: PropTypes.object,
    currentTurn: PropTypes.number
  }
  constructor(props) {
    super(props)
    this.character = CHARACTERS.find(char => char.idCharacter === props.match.params.idCharacter)
  }
  render() {
    return <CharacterComponent currentTurn={this.props.currentTurn} data={this.character} />
  }
}
