import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FightActionsComponent from '../../Components/FightActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { STATS, EQUIPEMENT_STATS } from '../../lib'

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

  state = {
    isTargetOpen: false
  }

  updateCharacter = (changes, idChar) => {
    const { firebase, idCharacter } = this.props
    const id = idChar || idCharacter
    firebase.update(`characters/${id}`, changes)
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
  handleAttack = (selectedCharacterId, modifier = 0) => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const target = characters[selectedCharacterId]
    const { weapon1, weapon2 } = character.equipment
    let totalDamage = modifier
    const primaryWeapon = weapon1 || weapon2
    const secondaryWeapon = [weapon1, weapon2].filter(Boolean).length > 1 && weapon2
    const stats = STATS(character)
    const targetStats = EQUIPEMENT_STATS(target.equipment)
    if (primaryWeapon) {
      const { damage, damageType } = primaryWeapon
      totalDamage += damage
      totalDamage += stats[damageType]
      if (damageType === 'pow') totalDamage -= target.attributes.pow + targetStats.magicArmor + targetStats.pow
      else totalDamage -= target.attributes.con + targetStats.con + targetStats.armor
    }
    if (secondaryWeapon) {
      const { damage, damageType } = secondaryWeapon
      let secondaryDamage = damage / 2 + stats[damageType] / 2
      if (damageType === 'pow') secondaryDamage -= (target.attributes.pow + targetStats.pow) / 2
      else secondaryDamage -= (target.attributes.con + targetStats.con) / 2
      if (secondaryDamage > 0) totalDamage += secondaryDamage
    }
    this.updateCharacter({ ap: character.ap - 2 })
    if (totalDamage > 0) this.updateCharacter({ hp: target.hp - totalDamage }, selectedCharacterId)
  }
  handleMove = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - 1 })
  }
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()

  handleOpenTarget = () => this.setState({ isTargetOpen: true })
  handleCloseTarget = () => this.setState({ isTargetOpen: false })

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
        onOpenTarget={this.handleOpenTarget}
        onCloseTarget={this.handleCloseTarget}
        isTargetOpen={this.state.isTargetOpen}
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FightActions)
