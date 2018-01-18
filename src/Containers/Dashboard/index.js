import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { nextTurn, startFight, endFight } from '../../redux/actions/fight'
import { getCharacter } from '../../redux/actions/characters'

class Dashboard extends Component {
  static propTypes = {
    nextTurn: PropTypes.func.isRequired,
    getCharacter: PropTypes.func.isRequired,
    startFight: PropTypes.func.isRequired,
    endFight: PropTypes.func.isRequired,
    endCharaterTurn: PropTypes.func.isRequired,
    turn: PropTypes.number.isRequired,
    characterPlaying: PropTypes.object,
    orderPlaying: PropTypes.array,
    status: PropTypes.any
  }

  state = { isOpen: false }

  onEndTurn = () => this.props.nextTurn()
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
        currentTurn={this.props.turn}
        fightStatus={this.props.status}
        onEndTurn={this.onEndTurn}
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
  turn: state.fight.turn,
  orderPlaying: state.fight.orderPlaying,
  characterPlaying: state.fight.characterPlaying,
  status: state.fight.status
})

const mapDispatchToProps = dispatch => ({
  nextTurn: () => {
    dispatch(nextTurn())
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
