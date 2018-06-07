import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkillsComponent from '../../Components/Skills'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

const initialStateFields = {
  name: '',
  cooldown: 0,
  cost: 0,
  distance: 0,
  range: 0,
  description: '',
  attr1: 'str',
  attr2: 'str',
  damage: ''
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
      assignedValue: '0'
    }
  }

  createSkill = skill => {
    const { firebase } = this.props
    firebase.push('skills', skill)
  }

  handleChangeField = e => {
    let { id, value } = e.target
    const { fields } = this.state
    if (['cooldown', 'cost', 'distance', 'range'].indexOf(id) > -1) value = Number(value)
    Object.assign(fields, { [id]: value })
    this.setState({ fields })
  }

  handleClearFields = () => {
    this.setState({ fields: { ...initialStateFields } })
  }

  handleCreate = () => {
    const { firebase } = this.props
    const skill = { ...this.state.fields }
    delete skill.name
    firebase.set(`skills/${this.state.fields.name}`, skill)
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
    const { fields, fields: { name }, assignedCharacter, assignedSkill, assignedValue } = this.state
    let disabled = false
    Object.keys(skills).map(skill => {
      if (skill === name) disabled = true
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
      />
    )
  }
}

const mapStateToProps = state => ({
  skills: state.firebase.data.skills,
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['skills', 'characters']), connect(mapStateToProps))(Skills)