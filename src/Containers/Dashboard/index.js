import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { nextRound, startFight, endFight, selectCharacter, validateCharacters } from '../../redux/actions/fight'
import { AP } from '../../lib'

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
    orderSelection: PropTypes.object,
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
  removeStatuses = () => {
    const { firebase, characters } = this.props
    Object.keys(characters).map(char => {
      const { statuses } = characters[char]
      if (statuses) firebase.update(`characters/${char}`, { statuses: null })
    })
  }

  handleNextRound = () => {
    const { order, firebase, characters, nextRound } = this.props
    order.map(char => {
      const character = characters[char]
      const { ap, cooldowns, statuses } = character
      const { base, max } = AP
      let newCooldowns = cooldowns || null
      let newStatuses = statuses || null
      if (cooldowns)
        Object.keys(cooldowns).map(cd => {
          if (newCooldowns[cd] > 0) newCooldowns[cd] -= 1
        })
      let newAp = ap + base
      if (newStatuses) {
        Object.entries(newStatuses).map(([key, { turns }]) => {
          const newTurns = turns - 1
          if (newTurns < 1) delete newStatuses[key]
          else {
            newStatuses[key].turns = newTurns
            switch (key) {
              case 'frozen':
                newAp -= base
                break
              case 'slowed':
                if (!newStatuses.frozen) newAp -= Math.round(base / 2)
                break
            }
          }
        })
      }
      if (newAp > max) newAp = max
      firebase.update(`characters/${char}`, {
        ap: newAp,
        cooldowns: newCooldowns,
        statuses: newStatuses
      })
    })
    nextRound()
  }
  handleStartFight = () => {
    this.resetCooldowns()
    this.removeStatuses()
    this.setState({ isOpen: true })
    this.props.startFight()
  }
  handleValidateCharacters = () => {
    const { validateCharacters, orderSelection, firebase } = this.props
    this.handleCloseSelection()
    validateCharacters()
    Object.keys(orderSelection).forEach(char => {
      const ap = AP.start
      firebase.update(`characters/${char}`, { ap, sp: 0 })
    })
  }

  handleEndFight = () => {
    this.props.endFight()
    this.resetCooldowns()
    this.removeStatuses()
  }

  handleCloseSelection = () => this.setState({ isOpen: false })

  render() {
    const { round, status, characterPlaying, orderPlaying, characters, orderSelection } = this.props
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
        isValidateDisabled={Object.keys(orderSelection).length < 2}
      />
    )
  }
}

const mapStateToProps = state => ({
  round: state.fight.round,
  orderSelection: state.fight.orderSelection,
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard)
