import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeCharacter, endCharaterTurn, delayCharacterTurn } from '../../redux/actions/fight'
import OrderComponent from '../../Components/Order'

class Order extends Component {
  static propTypes = {
    status: PropTypes.string,
    order: PropTypes.array,
    orderPlaying: PropTypes.array,
    orderDone: PropTypes.array,
    removeCharacter: PropTypes.func,
    endCharaterTurn: PropTypes.func,
    delayCharacterTurn: PropTypes.func
  }
  static defaultProps = {
    status: 'all'
  }
  render() {
    const { status, order, orderPlaying, orderDone } = this.props
    const characters = status === 'playing' ? orderPlaying : status === 'done' ? orderDone : order
    return (
      <OrderComponent
        status={status}
        removeCharacter={this.props.removeCharacter}
        endCharaterTurn={this.props.endCharaterTurn}
        delayCharacterTurn={this.props.delayCharacterTurn}
        characters={characters}
      />
    )
  }
}

const mapStateToProps = state => ({
  order: state.fight.order,
  orderPlaying: state.fight.orderPlaying,
  orderDone: state.fight.orderDone
})

const mapDispatchToProps = dispatch => ({
  removeCharacter: idCharacter => {
    dispatch(removeCharacter(idCharacter))
  },
  endCharaterTurn: idCharacter => {
    dispatch(endCharaterTurn(idCharacter))
  },
  delayCharacterTurn: idCharacter => {
    dispatch(delayCharacterTurn(idCharacter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
