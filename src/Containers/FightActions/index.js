import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FightActionsComponent from '../../Components/FightActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { STATS, EQUIPEMENT_STATS, HP_MAX } from '../../lib'

import { useSkill, useAction, delayTurn, endTurn } from '../../redux/actions/fight'

class FightActions extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    skills: PropTypes.object,
    items: PropTypes.object,
    idCharacter: PropTypes.string,
    round: PropTypes.number,
    useSkill: PropTypes.func,
    useAction: PropTypes.func,
    endTurn: PropTypes.func.isRequired,
    delayTurn: PropTypes.func.isRequired
  }

  state = {
    isTargetAttackOpen: false,
    isTargetSkillsOpen: false,
    idSkill: '',
    skill: {},
    loading: false
  }

  characterDamage = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const { weapon1, weapon2 } = character.equipment
    let totalDamage = 0
    let physical = 0
    let magical = 0
    const primaryWeapon = weapon1 || weapon2
    const secondaryWeapon = [weapon1, weapon2].filter(Boolean).length > 1 && weapon2
    const stats = STATS(character)
    if (primaryWeapon) {
      const { damage, damageType } = primaryWeapon
      const dmg = stats[damageType]
      totalDamage += damage
      if (damageType === 'pow') magical += dmg
      else physical += dmg
    }
    if (secondaryWeapon) {
      const { damage, damageType } = secondaryWeapon
      const dmg = stats[damageType] / 2
      totalDamage += damage / 2
      if (damageType === 'pow') magical += dmg
      else physical += dmg
    }
    return {
      damage: totalDamage,
      physical,
      magical
    }
  }

  targetDefense = target => {
    const targetArmor = EQUIPEMENT_STATS(target.equipment)
    const stats = STATS(target)
    return {
      armor: targetArmor.armor + stats.con,
      magicArmor: targetArmor.magicArmor + stats.pow
    }
  }

  updateCharacter = (changes, idChar) => {
    const { firebase, idCharacter } = this.props
    const id = idChar || idCharacter
    firebase.update(`characters/${id}`, changes)
  }

  handleUseSkill = async (selectedCharacterId, fields, modifier, targets = []) => {
    const { idSkill, skill } = this.state
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const stats = STATS(character)
    const target = characters[selectedCharacterId]
    const cooldowns = Object.assign({}, character.cooldowns, {
      [idSkill]: skill.cooldown
    })
    const { type, weapon, str, pow, dex, ignoreArmor, multiplicator } = fields
    let totalDamage = modifier
    let physicalDamage = 0
    let magicalDamage = 0
    if (weapon) {
      const { damage, physical, magical } = this.characterDamage()
      totalDamage += damage
      physicalDamage += physical
      magicalDamage += magical
    }
    if (str) physicalDamage += stats.str
    if (dex) physicalDamage += stats.dex
    if (pow) magicalDamage += stats.pow
    totalDamage *= multiplicator
    physicalDamage *= multiplicator
    magicalDamage *= multiplicator
    if (type === 'heal') {
      let hp = target.hp
      const maxHp = HP_MAX(STATS(target), target.equipment)
      const bonusHp = totalDamage + physicalDamage + magicalDamage
      hp += bonusHp
      if (hp > maxHp) hp = maxHp
      const targetChanges = { hp: Math.round(hp) }
      await this.updateCharacter(targetChanges, selectedCharacterId)
    }
    if (type === 'damage') {
      let hp = target.hp
      if (ignoreArmor) {
        hp -= Math.round(totalDamage + physicalDamage + magicalDamage)
      } else {
        const { armor, magicArmor } = this.targetDefense(target)
        if (physicalDamage > 0) {
          totalDamage += physicalDamage
          if (armor >= totalDamage) totalDamage = 0
          else totalDamage -= armor
        }
        if (magicalDamage > 0) {
          totalDamage += magicalDamage
          if (magicArmor >= totalDamage) totalDamage = 0
          else totalDamage -= magicArmor
        }
        hp -= Math.round(totalDamage)
      }
      await this.updateCharacter({ hp }, selectedCharacterId)
    }
    if (targets.length > 0)
      targets.forEach(({ id, multiplicator }) => {
        const targetFields = { ...fields, multiplicator }
        this.handleUseSkill(id, targetFields, modifier)
      })

    const changes = { cooldowns }
    if (skill.isSymbiosis) Object.assign(changes, { sp: character.sp - skill.cost })
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

  handleOpenTargetAttack = () => this.setState({ isTargetAttackOpen: true })
  handleCloseTargetAttack = () => this.setState({ isTargetAttackOpen: false })
  handleOpenTargetSkills = (idSkill, skill) => {
    this.setState({ isTargetSkillsOpen: true, idSkill, skill })
  }
  handleCloseTargetSkills = () => this.setState({ isTargetSkillsOpen: false })

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
        onOpenTargetAttack={this.handleOpenTargetAttack}
        onCloseTargetAttack={this.handleCloseTargetAttack}
        isTargetAttackOpen={this.state.isTargetAttackOpen}
        onOpenTargetSkills={this.handleOpenTargetSkills}
        onCloseTargetSkills={this.handleCloseTargetSkills}
        isTargetSkillsOpen={this.state.isTargetSkillsOpen}
        currentSkill={this.state.idSkill}
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
