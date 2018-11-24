import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { removeCharacter } from '../../redux/actions/fight'
import OrderComponent from '../../Components/Order'

class Order extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    status: PropTypes.string,
    order: PropTypes.array,
    orderPlaying: PropTypes.array,
    orderDone: PropTypes.array,
    removeCharacter: PropTypes.func,
    characters: PropTypes.object
  }
  static defaultProps = {
    status: 'all'
  }

  constructor(props) {
    super(props)
    this.state = {
      hp: 0
    }
  }

  handleUpdateHp = idCharacter => e => {
    const { firebase } = this.props
    firebase.update(`characters/${idCharacter}`, { hp: Number(e.target.value) })
  }

  handleApplyStatus = idCharacter => e => {
    const { firebase } = this.props
    firebase.update(`characters/${idCharacter}`, { status: e.target.value })
  }

  render() {
    const { status, order, orderPlaying, orderDone, characters } = this.props
    const orderDisplay = status === 'playing' ? orderPlaying : status === 'done' ? orderDone : order
    const playing = orderPlaying[0]
    return (
      <OrderComponent
        status={status}
        removeCharacter={this.props.removeCharacter}
        order={orderDisplay}
        playing={playing}
        characters={characters}
        onChangeHp={this.handleUpdateHp}
        onApplyStatus={this.handleApplyStatus}
      />
    )
  }
}

const mapStateToProps = state => ({
  order: state.fight.order,
  orderPlaying: state.fight.orderPlaying,
  orderDone: state.fight.orderDone,
  characters: state.firebase.data.characters
})

const mapDispatchToProps = dispatch => ({
  removeCharacter: idCharacter => {
    dispatch(removeCharacter(idCharacter))
  }
})

export default compose(
  firebaseConnect(['characters']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Order)
