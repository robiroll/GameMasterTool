import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkillsComponent from '../../Components/Skills'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { statuses } from '../../config/statuses'

const initialStateFields = {
  isSymbiosis: false,
  name: '',
  cooldown: 0,
  cost: 0,
  distance: 0,
  range: 0,
  description: '',
  attr1: 'str',
  attr2: 'str',
  damage: '',
  type: 'damage', // one of ['damage', 'heal', 'status']
  weapon: true,
  pow: false,
  str: false,
  dex: false,
  siz: false,
  ignoreArmor: false,
  modifier: '1D10',
  multiplicator: 1,
  statuses: [],
  damageType: 'physical' // one of ['physical', 'magical']
}
class Skills extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    skills: PropTypes.object,
    characters: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      fields: { ...initialStateFields },
      isModifyOpen: false,
      assignedCharacter: '',
      assignedSkill: '',
      assignedValue: '50'
    }
  }

  handleChangeField = e => {
    let { id, value, checked } = e.target
    const { fields } = this.state
    if (['cooldown', 'cost', 'distance', 'range', 'multiplicator'].indexOf(id) > -1) value = Number(value)
    if (['isSymbiosis', 'weapon', 'pow', 'dex', 'str', 'siz', 'ignoreArmor'].indexOf(id) > -1) value = checked
    Object.assign(fields, { [id]: value })
    this.setState({ fields })
  }

  handleClearFields = () => {
    this.setState({ fields: { ...initialStateFields } })
  }

  handleCreate = () => {
    const { firebase } = this.props
    const skill = { ...this.state.fields }
    firebase.set(
      `skills/${this.state.fields.name
        .toLowerCase()
        .split(' ')
        .join('-')}`,
      skill
    )
  }

  handleUpdate = () => {
    const { firebase } = this.props
    const skill = { ...this.state.fields }
    delete skill.name
    firebase.update(`skills/${this.state.fields.name}`, skill)
    this.handleCloseModify()
  }

  handleOpenModify = skillName => {
    const fields = { ...this.props.skills[skillName], name: skillName }
    this.setState({ fields, isModifyOpen: true })
  }
  handleCloseModify = () => this.setState({ isModifyOpen: false })

  handleChangeAssignee = e => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  handleAssign = () => {
    const { firebase } = this.props
    const { assignedSkill, assignedCharacter, assignedValue } = this.state
    firebase.update(`characters/${assignedCharacter}/combatSkills`, { [assignedSkill]: Number(assignedValue) })
    firebase.update(`characters/${assignedCharacter}/cooldowns`, { [assignedSkill]: 0 })
  }

  handleStatusesUp = () =>
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        statuses: [...prevState.fields.statuses, { id: statuses[0].slug, turns: 1, bonuses: statuses[0].bonuses || {} }]
      }
    }))
  handleStatusesDown = () =>
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        statuses: prevState.fields.statuses.slice(0, prevState.fields.statuses.length - 1)
      }
    }))
  handleChangeAdditionalStatus = (index, key = 'id') => e => {
    let { value, id } = e.target
    if (['turns'].indexOf(id) > -1) value = Number(value)
    const fieldStatuses = [...this.state.fields.statuses]
    fieldStatuses[index][key] = value
    if (key === 'id') {
      const { bonuses } = statuses.find(status => status.slug === value)
      if (bonuses) fieldStatuses[index].bonuses = bonuses
    }
    this.setState(prevState => ({ fields: { ...prevState.fields, statuses: fieldStatuses } }))
  }
  handleChangeBonus = index => e => {
    const { id } = e.target
    const value = Number(e.target.value)
    const fieldStatuses = [...this.state.fields.statuses]
    fieldStatuses[index].bonuses[id] = value
    this.setState(prevState => ({ fields: { ...prevState.fields, statuses: fieldStatuses } }))
  }

  render() {
    const { skills, characters } = this.props
    const {
      fields,
      fields: { name },
      assignedCharacter,
      assignedSkill,
      assignedValue,
      isModifyOpen
    } = this.state
    let disabled = false
    skills &&
      Object.keys(skills).map(skill => {
        if (
          skill ===
          name
            .toLowerCase()
            .split(' ')
            .join('-')
        )
          disabled = true
      })
    return (
      <SkillsComponent
        skills={skills}
        characters={characters}
        fields={fields}
        onChange={this.handleChangeField}
        onClear={this.handleClearFields}
        onCreate={this.handleCreate}
        onUpdate={this.handleUpdate}
        disabled={disabled}
        onOpenModify={this.handleOpenModify}
        onCloseModify={this.handleCloseModify}
        isModifyOpen={isModifyOpen}
        onChangeAssignee={this.handleChangeAssignee}
        onAssign={this.handleAssign}
        assignedCharacter={assignedCharacter}
        assignedSkill={assignedSkill}
        assignedValue={assignedValue}
        onToggleSkill={this.handleToggleSkill}
        onAddStatus={this.handleStatusesUp}
        onRemoveStatus={this.handleStatusesDown}
        onChangeStatus={this.handleChangeAdditionalStatus}
        onChangeBonus={this.handleChangeBonus}
      />
    )
  }
}

const mapStateToProps = state => ({
  skills: state.firebase.data.skills,
  characters: state.firebase.data.characters
})

export default compose(
  firebaseConnect(['skills', 'characters']),
  connect(mapStateToProps)
)(Skills)
