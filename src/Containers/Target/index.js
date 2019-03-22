import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findIndex } from 'lodash'
import TargetComponent from '../../Components/Target'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Target extends Component {
  static propTypes = {
    character: PropTypes.object,
    characters: PropTypes.object,
    order: PropTypes.array,
    onAttack: PropTypes.func,
    onUseSkill: PropTypes.func,
    idSkill: PropTypes.string,
    skill: PropTypes.object,
    onCloseTarget: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { type, weapon, pow, str, dex, siz, ignoreArmor, multiplicator, multitarget, statuses } = props.skill || {}
    this.state = {
      targetedCharacter: '',
      modifier: 1,
      targets: [],
      fields: {
        type,
        weapon,
        pow,
        str,
        dex,
        siz,
        ignoreArmor,
        multiplicator,
        multitarget,
        statuses
      }
    }
  }

  characters = this.props.order.map(id => ({ id, ...this.props.characters[id] }))

  handleTargetsUp = () =>
    this.setState(prevState => ({
      targets: [...prevState.targets, { id: '', multiplicator: prevState.fields.multiplicator }]
    }))
  handleTargetsDown = () =>
    this.setState(prevState => ({ targets: prevState.targets.slice(0, prevState.targets.length - 1) }))
  handleChangeAdditionalTarget = index => e => {
    let { value, id } = e.target
    if (['multiplicator'].indexOf(id) > -1) value = Number(value)
    const targets = [...this.state.targets]
    targets[index][id] = value
    this.setState({ targets })
  }

  handleChangeTarget = e => this.setState({ targetedCharacter: e.target.value })

  handleChangeModifier = e => this.setState({ modifier: Number(e.target.value) })

  handleChangeField = e => {
    let { id, value, checked } = e.target
    const { fields } = this.state
    if (['multiplicator', 'turns'].indexOf(id) > -1) value = Number(value)
    if (['weapon', 'pow', 'dex', 'str', 'siz', 'ignoreArmor'].indexOf(id) > -1) value = checked
    this.setState({ fields: { ...fields, [id]: value } })
  }
  handleChangeTurn = e => {
    let { id, value } = e.target
    const { fields } = this.state
    const { statuses: st } = fields
    const statuses = [...st]
    const index = findIndex(statuses, { id })
    statuses[index].turns = Number(value)
    this.setState({ fields: { ...fields, statuses } })
  }
  handleChangeBonus = e => {
    const bonus = e.target.getAttribute('bonus')
    const status = e.target.getAttribute('status')
    const { fields } = this.state
    const { statuses: st } = fields
    const statuses = [...st]
    const index = findIndex(statuses, { id: status })
    statuses[index].bonuses[bonus] = Number(e.target.value)
    this.setState({ fields: { ...fields, statuses } })
  }

  handleValidate = async () => {
    const { onAttack, onUseSkill, onCloseTarget } = this.props
    const { targetedCharacter, modifier, fields, targets } = this.state
    if (onAttack) await onAttack(targetedCharacter, modifier)
    if (onUseSkill) await onUseSkill(targetedCharacter, fields, modifier, targets)
    onCloseTarget()
  }

  render() {
    return (
      <TargetComponent
        {...this.props}
        type={this.props.onAttack ? 'attack' : 'skill'}
        characters={this.characters}
        onChangeTarget={this.handleChangeTarget}
        targetedCharacter={this.state.targetedCharacter}
        modifier={this.state.modifier}
        onChangeModifier={this.handleChangeModifier}
        onChangeField={this.handleChangeField}
        fields={this.state.fields}
        onTargetsUp={this.handleTargetsUp}
        onTargetsDown={this.handleTargetsDown}
        onChangeAdditionalTarget={this.handleChangeAdditionalTarget}
        onChangeTurn={this.handleChangeTurn}
        onChangeBonus={this.handleChangeBonus}
        targets={this.state.targets}
        onValidate={this.handleValidate}
      />
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
