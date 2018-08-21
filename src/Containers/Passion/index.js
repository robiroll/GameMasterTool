import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { STATS } from '../../lib'
import PassionCreate from '../../Components/PassionCreate'
import PassionModify from '../../Components/PassionModify'

class Passion extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    idCharacter: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }
  static defaultProps = {
    status: 'all'
  }

  constructor(props) {
    super(props)
    const { number } = props
    const value = number === 1 ? 40 : number === 2 ? 30 : number === 3 ? 20 : 10
    this.state = {
      name: '',
      attr1: 'pow',
      attr2: 'int',
      value
    }
  }
  handleChangeInput = e => this.setState({ name: e.target.value })
  handleChangeAttr = attr => e => this.setState({ [attr]: e.target.value })
  handleValidate = () => {
    const { firebase, idCharacter, number } = this.props
    firebase.update(`characters/${idCharacter}`, { [`passion${number}`]: this.state })
  }
  handleUpdatePassion = operator => () => {
    const { firebase, idCharacter, number, characters } = this.props
    const character = characters[idCharacter]
    const passion = `passion${number}`
    let value = character[passion].value
    if (operator === 'add') value += 1
    if (operator === 'remove') value -= 1
    firebase.update(`characters/${idCharacter}/${passion}`, { value })
  }

  render() {
    const { characters, idCharacter, number } = this.props
    const character = characters[idCharacter]
    const passion = character[`passion${number}`]
    const { name } = this.state
    if (passion) {
      const stats = STATS(character)
      const total = passion.value + stats[passion.attr1] + stats[passion.attr2]
      return (
        <PassionModify name={passion.name} value={passion.value} onUpdate={this.handleUpdatePassion} total={total} />
      )
    }
    return (
      <PassionCreate
        name={name}
        onChangeInput={this.handleChangeInput}
        attr1={this.state.attr1}
        attr2={this.state.attr2}
        onChangeAttr={this.handleChangeAttr}
        onCreate={this.handleValidate}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(Passion)
