import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardComponent from '../../Components/Dashboard'
import { connect } from 'react-redux'
import { nextTurn, endTurn } from '../../redux/actions/fight'

class Dashboard extends Component {
  static propTypes = {
    nextTurn: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    turn: PropTypes.number.isRequired
  }

  onEndTurn = () => this.props.nextTurn()
  onEndFight = () => this.props.endTurn()

  render() {
    return <DashboardComponent currentTurn={this.props.turn} onEndTurn={this.onEndTurn} onEndFight={this.onEndFight} />
  }
}

const mapStateToProps = state => {
  return {
    turn: state.turn
  }
}

const mapDispatchToProps = dispatch => ({
  nextTurn: () => {
    dispatch(nextTurn())
  },
  endTurn: () => {
    dispatch(endTurn())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
