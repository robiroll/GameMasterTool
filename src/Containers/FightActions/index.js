import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FightActionsComponent from '../../Components/FightActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { useSkill, useAction, delayTurn, endTurn } from '../../redux/actions/fight'

class FightActions extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    skills: PropTypes.object,
    items: PropTypes.object,
    idCharacter: PropTypes.string,
    round: PropTypes.number,
    useSkill: PropTypes.func.isRequired,
    useAction: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    delayTurn: PropTypes.func.isRequired
  }

  updateCharacter = changes => {
    const { firebase, idCharacter } = this.props
    firebase.update(`characters/${idCharacter}`, changes)
  }

  handleUseSkill = (name, skill) => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const cooldowns = Object.assign({}, character.cooldowns, {
      [name]: skill.cooldown
    })
    const changes = { cooldowns }
    if (skill.type === 'symbiosis') Object.assign(changes, { sp: character.sp - skill.cost })
    else Object.assign(changes, { ap: character.ap - skill.cost })
    this.updateCharacter(changes)
  }
  handleUpSp = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - (character.sp + 2), sp: character.sp + 1 })
  }
  handleAttack = weapon => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - weapon.size })
  }
  handleMove = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - 1 })
  }
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()

  render() {
    const { characters, idCharacter, skills } = this.props
    const character = characters[idCharacter]
    return (
      <FightActionsComponent
        character={character}
        skills={skills}
        onUseSkill={this.handleUseSkill}
        onAttack={this.handleAttack}
        onMove={this.handleMove}
        onUpSp={this.handleUpSp}
        onEndTurn={this.handleEndTurn}
        onDelayTurn={this.handleDelayTurn}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.firebase.data.characters,
    skills: state.firebase.data.skills,
    items: state.firebase.data.items,
    round: state.fight.round
  }
}

const mapDispatchToProps = dispatch => ({
  useSkill: skill => {
    dispatch(useSkill(skill.cost))
  },
  useAction: action => {
    dispatch(useAction(action))
  },
  endTurn: () => {
    dispatch(endTurn())
  },
  delayTurn: () => {
    dispatch(delayTurn())
  }
})
export default compose(
  firebaseConnect(['characters', 'skills', 'items']),
  connect(mapStateToProps, mapDispatchToProps)
)(FightActions)
