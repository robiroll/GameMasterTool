import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { nextRound, startFight, endFight } from '../../redux/actions/fight'
import { getCharacter } from '../../redux/actions/characters'

class Dashboard extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    items: PropTypes.object,
    nextRound: PropTypes.func.isRequired,
    getCharacter: PropTypes.func.isRequired,
    startFight: PropTypes.func.isRequired,
    endFight: PropTypes.func.isRequired,
    round: PropTypes.number.isRequired,
    characterPlaying: PropTypes.object,
    orderPlaying: PropTypes.array,
    status: PropTypes.any
  }

  state = { isOpen: false }

  handleNextRound = () => this.props.nextRound()
  onGetChar = idCharacter => this.props.getCharacter(idCharacter)
  handleStartFight = () => {
    this.setState({ isOpen: true })
    this.props.startFight()
  }
  handleEndFight = () => {
    this.props.endFight()
  }
  handleCloseSelection = () => this.setState({ isOpen: false })
  pushSample = () => {
    console.log('push')
    this.props.firebase.push('characters', { name: 'test' })
  }

  render() {
    const { round, status, characterPlaying, orderPlaying, characters } = this.props
    if (!isLoaded(characters)) return 'loading characters...'
    if (isEmpty(characters)) return 'characters list is empty'
    return (
      <DashboardComponent
        round={round}
        fightStatus={status}
        onNextRound={this.handleNextRound}
        onGetChar={this.onGetChar}
        onStartFight={this.handleStartFight}
        onEndFight={this.handleEndFight}
        onCloseSelection={this.handleCloseSelection}
        isOpen={this.state.isOpen}
        characterPlaying={characterPlaying}
        orderPlaying={orderPlaying}
        addChar={this.pushSample}
        characters={characters}
      />
    )
  }
}

const mapStateToProps = state => ({
  round: state.fight.round,
  orderPlaying: state.fight.orderPlaying,
  characterPlaying: state.fight.characterPlaying,
  status: state.fight.status,
  characters: state.firebase.data.characters,
  items: state.firebase.data.items
})

const mapDispatchToProps = dispatch => ({
  nextRound: () => {
    dispatch(nextRound())
  },
  getCharacter: idCharacter => {
    dispatch(getCharacter(idCharacter))
  },
  startFight: () => {
    dispatch(startFight())
  },
  endFight: () => {
    dispatch(endFight())
  }
})

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default compose(
  firebaseConnect([
    'characters', // { path: '/todos' } // object notation
    'items'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)
