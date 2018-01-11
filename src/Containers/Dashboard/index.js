import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { nextTurn, endTurn } from '../../redux/actions/fight'
import { getCharacter } from '../../redux/actions/characters'

class Dashboard extends Component {
  static propTypes = {
    nextTurn: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    getCharacter: PropTypes.func.isRequired,
    turn: PropTypes.number.isRequired
  }

  onEndTurn = () => this.props.nextTurn()
  onEndFight = () => this.props.endTurn()
  onGetChar = idCharacter => this.props.getCharacter(idCharacter)

  render() {
    return (
      <DashboardComponent
        currentTurn={this.props.turn}
        onEndTurn={this.onEndTurn}
        onEndFight={this.onEndFight}
        onGetChar={this.onGetChar}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    turn: state.fight.turn
  }
}

const mapDispatchToProps = dispatch => ({
  nextTurn: () => {
    dispatch(nextTurn())
  },
  endTurn: () => {
    dispatch(endTurn())
  },
  getCharacter: idCharacter => {
    dispatch(getCharacter(idCharacter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
