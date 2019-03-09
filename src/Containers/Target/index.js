import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TargetComponent from '../../Components/Target'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Target extends Component {
  static propTypes = {
    character: PropTypes.object,
    characters: PropTypes.object,
    order: PropTypes.array,
    onAttack: PropTypes.func.isRequired,
    onCloseTarget: PropTypes.func.isRequired
  }

  state = {
    targetedCharacter: '',
    modifier: 0
  }

  characters = this.props.order.map(id => ({ id, ...this.props.characters[id] }))

  handleChangeTarget = e => this.setState({ targetedCharacter: e.target.value })

  handleChangeModifier = e => this.setState({ modifier: Number(e.target.value) })

  handleValidate = () => {
    const { targetedCharacter, modifier } = this.state
    this.props.onAttack(targetedCharacter, modifier)
    this.props.onCloseTarget()
  }

  render() {
    return (
      <div>
        <TargetComponent
          {...this.props}
          characters={this.characters}
          onChangeTarget={this.handleChangeTarget}
          targetedCharacter={this.state.targetedCharacter}
          modifier={this.state.modifier}
          onChangeModifier={this.handleChangeModifier}
          onValidate={this.handleValidate}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.firebase.data.characters,
    skills: state.firebase.data.skills,
    order: state.fight.order
  }
}

export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps)
)(Target)
