import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { nextTurn, startFight, endFight, endCharaterTurn } from '../../redux/actions/fight'
import { getCharacter } from '../../redux/actions/characters'

class Dashboard extends Component {
  static propTypes = {
    nextTurn: PropTypes.func.isRequired,
    getCharacter: PropTypes.func.isRequired,
    startFight: PropTypes.func.isRequired,
    endFight: PropTypes.func.isRequired,
    endCharaterTurn: PropTypes.func.isRequired,
    turn: PropTypes.number.isRequired,
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

  handleEndCharaterTurn = idCharacter => this.props.endCharaterTurn(idCharacter)

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
        onEndCharaterTurn={this.handleEndCharaterTurn}
        isOpen={this.state.isOpen}
      />
    )
  }
}

const mapStateToProps = state => ({
  turn: state.fight.turn,
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
  },

  endCharaterTurn: idCharacter => {
    dispatch(endCharaterTurn(idCharacter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
