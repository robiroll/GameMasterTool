import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FightActionsComponent from '../../Components/FightActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { STATS, EQUIPEMENT_STATS, HP_MAX, STATUSES_STATS } from '../../lib'

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
    let damageType = 'physical'
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
    if (magical > physical) damageType = 'magical'
    return {
      damage: totalDamage + physical + magical,
      damageType
    }
  }

  targetDefense = target => {
    const targetArmor = EQUIPEMENT_STATS(target.equipment)
    const statusArmor = STATUSES_STATS(target.statuses)
    const stats = STATS(target)
    return {
      armor: targetArmor.armor + statusArmor.armor + stats.con,
      magicArmor: targetArmor.magicArmor + statusArmor.magicArmor + stats.pow
    }
  }

  updateCharacter = (changes, idChar) => {
    const { firebase, idCharacter } = this.props
    const id = idChar || idCharacter
    console.log('CHANGES', changes)
    firebase.update(`characters/${id}`, changes)
  }

  handleUseSkill = async (selectedCharacterId, fields, modifier, targets = []) => {
    const { idSkill, skill } = this.state
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const stats = STATS(character)
    const target = characters[selectedCharacterId]
    const maxHp = HP_MAX(STATS(target), target.equipment)
    const cooldowns = Object.assign({}, character.cooldowns, {
      [idSkill]: skill.cooldown
    })
    const { type, weapon, str, pow, dex, siz, ignoreArmor, multiplicator, statuses } = fields
    let totalDamage = modifier
    if (weapon) {
      const { damage } = this.characterDamage()
      totalDamage += damage
    }
    if (str) totalDamage += stats.str
    if (dex) totalDamage += stats.dex
    if (pow) totalDamage += stats.pow
    if (siz) totalDamage += stats.siz
    totalDamage *= multiplicator
    if (type === 'heal') {
      let hp = target.hp
      hp += totalDamage
      if (hp > maxHp) hp = maxHp
      const targetChanges = { hp: Math.round(hp) }
      await this.updateCharacter(targetChanges, selectedCharacterId)
    }
    if (type === 'damage') {
      let hp = target.hp
      if (ignoreArmor) {
        hp -= Math.round(totalDamage)
      } else {
        const { armor, magicArmor } = this.targetDefense(target)
        const absorbed = skill.damageType === 'magical' ? magicArmor : armor
        if (absorbed >= totalDamage) totalDamage = 0
        else totalDamage -= absorbed
        hp -= Math.round(totalDamage)
      }
      const { lifeSteal } = STATUSES_STATS(character.statuses)
      if (lifeSteal) {
        const stolen = (totalDamage * lifeSteal) / 100
        const newHp = character.hp + stolen > maxHp ? maxHp : character.hp + stolen
        this.updateCharacter({ hp: Math.round(newHp) })
      }
      await this.updateCharacter({ hp }, selectedCharacterId)
    }
    if (targets.length > 0)
      targets.forEach(({ id, multiplicator }) => {
        const targetFields = { ...fields, multiplicator }
        this.handleUseSkill(id, targetFields, modifier)
      })

    if (statuses) {
      const newStatuses = {}
      statuses.forEach(({ id, turns, bonuses = {} }) => {
        Object.assign(newStatuses, { [id]: { turns, bonuses } })
      })
      this.updateCharacter({ statuses: newStatuses }, selectedCharacterId)
    }

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
    let totalDamage = modifier
    const { damage, damageType } = this.characterDamage()
    totalDamage += damage
    let hp = target.hp
    const { armor, magicArmor } = this.targetDefense(target)
    const absorbed = damageType === 'magical' ? magicArmor : armor
    if (absorbed >= totalDamage) totalDamage = 0
    else totalDamage -= absorbed
    hp -= Math.round(totalDamage)
    const changes = { ap: character.ap - 2 }
    const { lifeSteal } = STATUSES_STATS(character.statuses)
    if (lifeSteal) {
      const maxHp = HP_MAX(STATS(character), character.equipment)
      const stolen = (totalDamage * lifeSteal) / 100
      const newHp = character.hp + stolen > maxHp ? maxHp : character.hp + stolen
      Object.assign(changes, { hp: Math.round(newHp) })
    }
    this.updateCharacter(changes)
    this.updateCharacter({ hp }, selectedCharacterId)
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
