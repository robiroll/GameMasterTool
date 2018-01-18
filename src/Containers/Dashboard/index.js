import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { nextRound, startFight, endFight } from '../../redux/actions/fight'
import { getCharacter } from '../../redux/actions/characters'

class Dashboard extends Component {
  static propTypes = {
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

  render() {
    return (
      <DashboardComponent
        round={this.props.round}
        fightStatus={this.props.status}
        onNextRound={this.handleNextRound}
        onGetChar={this.onGetChar}
        onStartFight={this.handleStartFight}
        onEndFight={this.handleEndFight}
        onCloseSelection={this.handleCloseSelection}
        isOpen={this.state.isOpen}
        characterPlaying={this.props.characterPlaying}
        orderPlaying={this.props.orderPlaying}
      />
    )
  }
}

const mapStateToProps = state => ({
  round: state.fight.round,
  orderPlaying: state.fight.orderPlaying,
  characterPlaying: state.fight.characterPlaying,
  status: state.fight.status
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
