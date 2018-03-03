import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharactersComponent from '../../Components/Characters'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
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
    const { str, dex, int, pow, siz, con } = attributes
    // const { athletics } = standardSkills
    // const standardSkills = {}
    const hpBase = (str + con * 2 + siz * 3) * 2
    const changes = {
      apBase: Math.ceil((str + dex + int) / 6),
      apStart: Math.ceil((pow + siz) / 4 + 2),
      apMax: Math.ceil((con + siz) / 4 + 5),
      hpBase,
      hp: hpBase + (siz + con) * 2
    }
    const char = Object.assign(
      {},
      character,
      { attributes, standardSkills, proSkills },
      changes
    )
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

  render() {
    // data={this.props.characters}
    const { characters } = this.props
    if (!isLoaded(characters)) return 'loading characters...'
    if (isEmpty(characters)) return 'characters list is empty'
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

export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps)
)(Characters)
