import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharactersComponent from '../../Components/Characters'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import initialState from './config.js'

// import CHARACTERS from '../../World/Characters'

class Characters extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object
  }

  state = {
    isOpen: false,
    character: initialState
  }

  handleAddCharacter = () => {
    const { character } = this.state
    const { attributes, standardSkills, proSkills } = character
    const { str, siz, con } = attributes
    const hpBase = (str + con * 2 + siz * 3) * 2
    const startPoints = {
      ap: 0,
      sp: 0,
      hp: hpBase + (siz + con) * 2
    }
    const char = Object.assign({}, character, { attributes, standardSkills, proSkills }, startPoints)
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
    const attributes = Object.assign({}, character[attr], {
      [id]: Number(value)
    })
    // const standardSkills = Object.assign({}, character.standardSkills, { [id]: Number(value) })
    character[attr] = attributes
    this.setState({ character })
  }
  handleToggleFavourite = id => {
    const character = this.props.characters[id]

    const changes = {
      isFavourite: !character.isFavourite
    }
    this.props.firebase.update(`characters/${id}`, changes)
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
        onToggleFavourite={this.handleToggleFavourite}
        character={this.state.character}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps)
)(Characters)
