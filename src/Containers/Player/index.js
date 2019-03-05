import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import Players from '../Players'
import PlayerComponent from '../../Components/Player'
import Spinner from '../../styleguide/Spinner'

class Player extends Component {
  static propTypes = {
    characters: PropTypes.object,
    skills: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  idCharacter = () => this.context.router.route.match.params.idCharacter

  render() {
    const { characters, skills } = this.props
    if (!isLoaded(characters)) return <Spinner />
    if (!isLoaded(skills)) return <Spinner />
    const character = {
      idCharacter: this.idCharacter(),
      ...characters[this.idCharacter()]
    }
    return (
      <div>
        <Players />
        <PlayerComponent character={character} skills={skills} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.firebase.data.characters,
    skills: state.firebase.data.skills,
    items: state.firebase.data.items
  }
}

export default compose(
  firebaseConnect(['characters', 'skills']),
  connect(mapStateToProps)
)(Player)
