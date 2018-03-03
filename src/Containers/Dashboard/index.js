import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
  nextRound,
  startFight,
  endFight,
  selectCharacter,
  validateCharacters
} from '../../redux/actions/fight'

class Dashboard extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    items: PropTypes.object,
    nextRound: PropTypes.func.isRequired,
    startFight: PropTypes.func.isRequired,
    endFight: PropTypes.func.isRequired,
    selectCharacter: PropTypes.func.isRequired,
    validateCharacters: PropTypes.func.isRequired,
    round: PropTypes.number.isRequired,
    characterPlaying: PropTypes.string,
    order: PropTypes.array,
    orderPlaying: PropTypes.array,
    status: PropTypes.any
  }

  state = { isOpen: false }

  resetCooldowns = () => {
    const { firebase, characters } = this.props
    Object.keys(characters).map(char => {
      const cooldowns = {}
      const skills = characters[char].combatSkills
      if (skills)
        Object.keys(skills).map(skill => {
          cooldowns[skill] = 0
        })
      firebase.update(`characters/${char}`, { cooldowns })
    })
  }

  handleNextRound = () => {
    const { order, firebase, characters, nextRound } = this.props
    order.map(char => {
      const character = characters[char]
      const { ap, apBase, apMax, cooldowns } = character
      let newCooldowns = cooldowns || null
      if (cooldowns)
        Object.keys(cooldowns).map(cd => {
          if (newCooldowns[cd] > 0) newCooldowns[cd] -= 1
        })
      let newAp = ap + apBase
      if (newAp > apMax) newAp = apMax
      firebase.update(`characters/${char}`, {
        ap: newAp,
        cooldowns: newCooldowns
      })
    })
    nextRound()
  }
  handleStartFight = () => {
    this.resetCooldowns()
    this.setState({ isOpen: true })
    this.props.startFight()
  }
  handleValidateCharacters = () => {
    const { validateCharacters, order, characters, firebase } = this.props
    this.handleCloseSelection()
    validateCharacters()
    order.map(char => {
      const character = characters[char]
      firebase.update(`characters/${char}`, { ap: character.apStart })
    })
  }

  handleEndFight = () => {
    this.props.endFight()
    this.resetCooldowns()
  }

  handleCloseSelection = () => this.setState({ isOpen: false })

  render() {
    const {
      round,
      status,
      characterPlaying,
      orderPlaying,
      characters
    } = this.props
    // const { round, status, characterPlaying, orderPlaying } = this.props
    // const {characters} = CHARACTERS
    if (!isLoaded(characters)) return 'loading characters...'
    if (isEmpty(characters)) return 'characters list is empty'
    return (
      <DashboardComponent
        round={round}
        fightStatus={status}
        onNextRound={this.handleNextRound}
        onStartFight={this.handleStartFight}
        onEndFight={this.handleEndFight}
        onCloseSelection={this.handleCloseSelection}
        isOpen={this.state.isOpen}
        characterPlaying={characterPlaying}
        orderPlaying={orderPlaying}
        addChar={this.pushSample}
        characters={characters}
        selectCharacter={this.props.selectCharacter}
        validateCharacters={this.handleValidateCharacters}
        isValidateDisabled={this.props.order.length < 1}
        order={this.props.order}
      />
    )
  }
}

const mapStateToProps = state => ({
  round: state.fight.round,
  orderPlaying: state.fight.orderPlaying,
  order: state.fight.order,
  characterPlaying: state.fight.characterPlaying,
  status: state.fight.status,
  characters: state.firebase.data.characters,
  items: state.firebase.data.items
})

const mapDispatchToProps = dispatch => ({
  nextRound: () => {
    dispatch(nextRound())
  },
  startFight: () => {
    dispatch(startFight())
  },
  endFight: () => {
    dispatch(endFight())
  },
  selectCharacter: idCharacter => {
    dispatch(selectCharacter(idCharacter))
  },
  validateCharacters: () => {
    dispatch(validateCharacters())
  }
})

export default compose(
  firebaseConnect([
    'characters', // { path: '/todos' } // object notation
    'items'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)
