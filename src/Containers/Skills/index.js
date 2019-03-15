import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkillsComponent from '../../Components/Skills'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

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
  ignoreArmor: false,
  modifier: '1D10',
  multiplicator: 1,
  multitarget: [],
  status: []
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
    if (['isSymbiosis', 'weapon', 'pow', 'dex', 'str', 'ignoreArmor'].indexOf(id) > -1) value = checked
    Object.assign(fields, { [id]: value })
    this.setState({ fields })
  }

  handleClearFields = () => {
    this.setState({ fields: { ...initialStateFields } })
  }

  handleCreate = () => {
    const { firebase } = this.props
    const skill = { ...this.state.fields }
    firebase.set(`skills/${this.state.fields.name.toLowerCase().replace(' ', '-')}`, skill)
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

  render() {
    const { skills, characters } = this.props
    const {
      fields,
      fields: { name },
      assignedCharacter,
      assignedSkill,
      assignedValue
    } = this.state
    let disabled = false
    skills &&
      Object.keys(skills).map(skill => {
        if (skill === name.toLowerCase().replace(' ', '-')) disabled = true
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
        isModifyOpen={this.state.isModifyOpen}
        onChangeAssignee={this.handleChangeAssignee}
        onAssign={this.handleAssign}
        assignedCharacter={assignedCharacter}
        assignedSkill={assignedSkill}
        assignedValue={assignedValue}
        onToggleSkill={this.handleToggleSkill}
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
