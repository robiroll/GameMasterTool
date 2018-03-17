import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from '../Character'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class CharacterPage extends Component {
  static propTypes = {
    characters: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const { match, characters } = this.props
    const idCharacter = match.params.idCharacter
    return <Character idCharacter={idCharacter} characters={characters} />
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(CharacterPage)
