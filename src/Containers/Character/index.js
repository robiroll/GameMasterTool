import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { useSkill, useAction, delayTurn, endTurn } from '../../redux/actions/fight'

class Character extends Component {
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

  constructor(props) {
    super(props)
    const { idCharacter, characters } = props
    const hp = characters ? characters[idCharacter].hp : 0
    this.state = {
      usedAP: 0,
      hp,
      isAttributesOpen: true,
      isStandardSkillsOpen: true,
      isProSkillsOpen: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.characters) {
      const { idCharacter } = nextProps
      this.setState({ hp: nextProps.characters[idCharacter].hp })
    }
  }

  handleToggleAttributes = () => this.setState({ isAttributesOpen: !this.state.isAttributesOpen })
  handleToggleStandardSkills = () => this.setState({ isStandardSkillsOpen: !this.state.isStandardSkillsOpen })
  handleToggleProSkills = () => this.setState({ isProSkillsOpen: !this.state.isProSkillsOpen })

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
  handleUseAction = action => this.props.useAction(action)
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
  handleUpSp = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - (character.sp + 2), sp: character.sp + 1 })
  }
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()
  handleChangeHp = e => {
    this.setState({ hp: Number(e.target.value) })
  }
  handleUpdateHp = () => {
    this.updateCharacter({ hp: this.state.hp })
  }
  handleChangeAttr = (operation, attr) => () => {
    const { characters, idCharacter, firebase } = this.props
    const attrValue = characters[idCharacter].attributes[attr]
    const newValue = operation === 'add' ? attrValue + 1 : operation === 'remove' && attrValue - 1
    const changes = { [attr]: newValue }
    firebase.update(`characters/${idCharacter}/attributes`, changes)
  }
  handleChangeSkill = (operation, skill, type) => () => {
    // type  must be 'combat' or 'standard'
    const { characters, idCharacter, firebase } = this.props
    const skillValue = characters[idCharacter][`${type}Skills`][skill] || 0
    const newValue = operation === 'add' ? skillValue + 1 : operation === 'remove' && skillValue - 1
    const changes = { [skill]: newValue }
    firebase.update(`characters/${idCharacter}/${type}Skills`, changes)
  }
  handleEquip = (key, item) => {
    const { firebase, characters, idCharacter } = this.props
    const char = characters[idCharacter]
    const path = `characters/${idCharacter}`
    if (char.equipment) {
      const unequippedItem = char.equipment[item.slot]
      firebase.push(`${path}/inventory`, unequippedItem)
    }
    if (item.slot === 'weapon') {
      if (!char.equipment) {
        firebase.set(`${path}/equipment/weapon1`, item)
        firebase.remove(`${path}/inventory/${key}`)
      } else {
        const { weapon1, weapon2 } = char.equipment
        if (!weapon1 && !weapon2) {
          firebase.set(`${path}/equipment/weapon1`, item)
          firebase.remove(`${path}/inventory/${key}`)
        }
        if (weapon1) {
          if (weapon1.weaponHands === '1handed' && item.weaponHands !== '2handed') {
            firebase.set(`${path}/equipment/weapon2`, item)
            firebase.remove(`${path}/inventory/${key}`)
          }
        }
        if (weapon2) {
          if (weapon2.weaponHands === '1handed' && item.weaponHands !== '2handed') {
            firebase.set(`${path}/equipment/weapon1`, item)
            firebase.remove(`${path}/inventory/${key}`)
          }
        }
      }
    } else if (item.slot === 'ring') {
      if (!char.equipment) {
        firebase.set(`${path}/equipment/ring1`, item)
        firebase.remove(`${path}/inventory/${key}`)
      } else {
        const { ring1, ring2 } = char.equipment
        if (!ring1) {
          firebase.set(`${path}/equipment/ring1`, item)
          firebase.remove(`${path}/inventory/${key}`)
        } else if (!ring2) {
          firebase.set(`${path}/equipment/ring2`, item)
          firebase.remove(`${path}/inventory/${key}`)
        }
      }
    } else {
      firebase.set(`${path}/equipment/${item.slot}`, item)
      firebase.remove(`${path}/inventory/${key}`)
    }
  }
  handleUnequip = (key, item) => {
    const { firebase, idCharacter } = this.props
    firebase.remove(`characters/${idCharacter}/equipment/${key}`)
    firebase.push(`characters/${idCharacter}/inventory`, item)
  }
  handleUseItem = (key, item) => {
    const { firebase, idCharacter } = this.props
    firebase.update(`characters/${idCharacter}/inventory/${key}`, { quantity: item.quantity - 1 })
  }
  handleDropItem = key => {
    const { firebase, idCharacter } = this.props
    firebase.remove(`characters/${idCharacter}/inventory/${key}`)
  }

  render() {
    const { characters, idCharacter, skills } = this.props
    const character = characters[idCharacter]
    return (
      <CharacterComponent
        round={this.props.round}
        data={character}
        skills={skills}
        state={this.state}
        onUseSkill={this.handleUseSkill}
        onUseAction={this.handleUseAction}
        onAttack={this.handleAttack}
        onMove={this.handleMove}
        onUpSp={this.handleUpSp}
        onEndTurn={this.handleEndTurn}
        onDelayTurn={this.handleDelayTurn}
        onChangeHp={this.handleChangeHp}
        onChangeAttr={this.handleChangeAttr}
        onChangeSkill={this.handleChangeSkill}
        onUpdateHp={this.handleUpdateHp}
        hpToUpdate={this.state.hp}
        onEquip={this.handleEquip}
        onUnequip={this.handleUnequip}
        onUseItem={this.handleUseItem}
        onDropItem={this.handleDropItem}
        onToggleAttributes={this.handleToggleAttributes}
        onToggleStandardSkills={this.handleToggleStandardSkills}
        onToggleProSkills={this.handleToggleProSkills}
        isAttributesOpen={this.state.isAttributesOpen}
        isStandardSkillsOpen={this.state.isStandardSkillsOpen}
        isProSkillsOpen={this.state.isProSkillsOpen}
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
)(Character)
