import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { removeCharacter } from '../../redux/actions/fight'
import OrderComponent from '../../Components/Order'
import { statuses } from '../../config/statuses'

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
      hp: 0,
      duration: 0,
      status: ''
    }
  }

  handleUpdateHp = idCharacter => e => {
    const { firebase } = this.props
    firebase.update(`characters/${idCharacter}`, { hp: Number(e.target.value) })
  }

  handleApplyStatus = idCharacter => () => {
    const { firebase } = this.props
    const { status, duration } = this.state
    const { bonuses } = statuses.find(({ slug }) => slug === status)
    firebase.update(`characters/${idCharacter}/statuses/${status}`, { turns: Number(duration), bonuses })
    this.setState({ duration: 0, status: '' })
  }

  handleChangeStatus = e => {
    this.setState({ status: e.target.value })
  }

  handleChangeDuration = e => {
    this.setState({ duration: e.target.value })
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
        onChangeDuration={this.handleChangeDuration}
        onChangeStatus={this.handleChangeStatus}
        statusEffect={this.state.status}
        duration={this.state.duration}
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
