import React, { Component } from 'react'
import DashboardComponent from '../../Components/Dashboard'

export default class Dashboard extends Component {
  state = {
    turn: 0
  }
  onEndTurn = () => this.setState({ turn: this.state.turn + 1 })
  onEndFight = () => this.setState({ turn: 0 })
  render() {
    return <DashboardComponent currentTurn={this.state.turn} onEndTurn={this.onEndTurn} onEndFight={this.onEndFight} />
  }
}
