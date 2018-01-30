import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharactersComponent from '../../Components/Characters'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

// import CHARACTERS from '../../World/Characters'

class Characters extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object
  }

  state = {
    isOpen: true,
    character: {
      kind: 'hero',
      level: 1,
      race: 'hobbit',
      class: 'thief',
      attributes: {
        str: 3,
        con: 3,
        siz: 3,
        dex: 3,
        int: 3,
        pow: 8,
        cha: 8
      },
      standardSkills: {
        athletics: 0,
        boating: 0,
        brawn: 0
      },
      talents: [],
      skills: [],
      equipment: {
        weapon: { type: 'str', name: 'Mains nues', size: 1, damage: 0 },
        torso: { armor: 1 }
      },
      inventory: {
        lifePotion: {
          name: 'Potion de vie',
          quantity: 1,
          cost: 2,
          recovery: 20
        }
      }
    }
  }

  handleAddCharacter = () => {
    const { character } = this.state
    const { attributes, standardSkills } = character
    const { str, dex, int, pow, cha, siz, con } = attributes
    const { athletics } = standardSkills
    // const standardSkills = {}
    const changes = {
      apBase: Math.round((str + dex + int) / 6),
      apStart: Math.round((pow + siz) / 4 + 2),
      apMax: Math.round((con + siz) / 4 + 5)
    }
    const char = Object.assign({}, character, { attributes, standardSkills }, changes)
    this.props.firebase.push('characters', char)
    this.handleClose()
  }
  handleOpen = () => this.setState({ isOpen: true })
  handleClose = () => this.setState({ isOpen: false })
  handleChange = e => {
    const { id, value } = e.target
    const character = Object.assign({}, this.state.character)
    character[id] = value
    this.setState({ character })
  }
  handleChangeAttribute = (e, attr) => {
    const { id, value } = e.target
    const character = Object.assign({}, this.state.character)
    const attributes = Object.assign({}, character[attr], { [id]: Number(value) })
    // const standardSkills = Object.assign({}, character.standardSkills, { [id]: Number(value) })
    character[attr] = attributes
    this.setState({ character })
  }

  render() {
    return (
      <CharactersComponent
        data={this.props.characters}
        onAddCharacter={this.handleAddCharacter}
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        onChange={this.handleChange}
        onChangeAttributes={this.handleChangeAttribute}
        character={this.state.character}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(Characters)
