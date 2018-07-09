import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Button from '../../styleguide/Button'
import Card from '../../styleguide/Card'
import './Skills.css'

const SkillForm = ({ fields, onChange, onClear, onSubmit, disabled, disabledMessage, buttonLabel, isNameHidden }) => {
  const { name, cooldown, cost, distance, range, description, attr1, attr2, damage } = fields

  return (
    <div className="skills--create">
      {isNameHidden ? (
        <div className="skills--create--title">
          <h3>{name}</h3>
        </div>
      ) : (
        <div className="skills--create--field">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" onChange={onChange} value={name} />
        </div>
      )}

      <div className="skills--create--field">
        <label htmlFor="cooldown">Cooldown</label>
        <input type="number" id="cooldown" onChange={onChange} value={cooldown} />
      </div>

      <div className="skills--create--field">
        <label htmlFor="cost">Coût</label>
        <input type="number" id="cost" onChange={onChange} value={cost} />
      </div>

      <div className="skills--create--field">
        <label htmlFor="distance">Distance</label>
        <input type="number" id="distance" onChange={onChange} value={distance} />
      </div>

      <div className="skills--create--field">
        <label htmlFor="range">Range</label>
        <input type="number" id="range" onChange={onChange} value={range} />
      </div>

      <div className="skills--create--field">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={onChange} value={description} />
      </div>

      <div className="skills--create--field">
        <label htmlFor="success">Réussite</label>
        <select name="" id="attr1" onChange={onChange} value={attr1}>
          <option value="str">str</option>
          <option value="siz">siz</option>
          <option value="con">con</option>
          <option value="dex">dex</option>
          <option value="int">int</option>
          <option value="pow">pow</option>
          <option value="cha">cha</option>
        </select>
        <span className="skills--create--field--additional">+</span>
        <select name="" id="attr2" onChange={onChange} value={attr2}>
          <option value="str">str</option>
          <option value="siz">siz</option>
          <option value="con">con</option>
          <option value="dex">dex</option>
          <option value="int">int</option>
          <option value="pow">pow</option>
          <option value="cha">cha</option>
        </select>
      </div>

      <div className="skills--create--field">
        <label htmlFor="damage">Dégâts</label>
        <input type="text" name="damage" id="damage" onChange={onChange} value={damage} />
      </div>

      <div className="skills--create--actions">
        {onClear && <Button onClick={onClear}>Clear fields</Button>}
        <Button onClick={onSubmit} disabled={disabled || name === ''}>
          {buttonLabel}
        </Button>
        <div className="skills--create--actions--message">{disabled && disabledMessage}</div>
      </div>
    </div>
  )
}
SkillForm.propTypes = {
  fields: PropTypes.object,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  isNameHidden: PropTypes.bool,
  disabledMessage: PropTypes.string,
  buttonLabel: PropTypes.string
}

export default class Skills extends Component {
  static propTypes = {
    skills: PropTypes.object,
    characters: PropTypes.object,
    fields: PropTypes.object,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onCreate: PropTypes.func,
    onUpdate: PropTypes.func,
    disabled: PropTypes.bool,
    isModifyOpen: PropTypes.bool,
    onOpenModify: PropTypes.func,
    onCloseModify: PropTypes.func,
    onChangeAssignedCharacter: PropTypes.func,
    onChangeAssignee: PropTypes.func,
    assignedCharacter: PropTypes.string,
    assignedSkill: PropTypes.string,
    assignedValue: PropTypes.string,
    onAssign: PropTypes.func
  }
  state = {
    isOpen: false
  }
  handleToggleDetails = () => this.setState({ isOpen: !this.state.isOpen })
  render() {
    const {
      skills,
      characters,
      fields,
      onChange,
      onClear,
      onCreate,
      disabled,
      onUpdate,
      onOpenModify,
      onCloseModify,
      isModifyOpen,
      onChangeAssignee,
      assignedCharacter,
      assignedSkill,
      assignedValue,
      onAssign
    } = this.props
    const skillFormProps = {
      fields,
      onChange
    }
    const { isOpen } = this.state
    return (
      <div className="skills">
        <Card title={<h3>Assign Skill</h3>}>
          <span>Assign </span>
          <select name="assignedSkill" id="assignedSkill" onChange={onChangeAssignee} value={assignedSkill}>
            <option value="" disabled>
              SKILL
            </option>
            <option value="---" disabled>
              --------------
            </option>
            {Object.keys(skills).map(skill => {
              return (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              )
            })}
          </select>
          <span> at </span>
          <input type="number" id="assignedValue" value={assignedValue} onChange={onChangeAssignee} />
          <span> to </span>
          <select name="assignedCharacter" id="assignedCharacter" onChange={onChangeAssignee} value={assignedCharacter}>
            <option value="" disabled>
              CHARACTER
            </option>
            <option value="---" disabled>
              --------------
            </option>
            {Object.keys(characters).map(charId => {
              return (
                <option key={charId} value={charId}>
                  {characters[charId].name}
                </option>
              )
            })}
          </select>
          <div className="skills--assign">
            <Button onClick={onAssign} disabled={assignedSkill === '' || assignedCharacter === ''}>
              Assigner
            </Button>
          </div>
        </Card>

        <Card title={<h3>Create Skill</h3>}>
          <SkillForm
            {...skillFormProps}
            onSubmit={onCreate}
            onClear={onClear}
            disabled={disabled}
            buttonLabel="create skill"
            disabledMessage="this skill aready exists"
          />
        </Card>

        <Card title={<h3>Skills List</h3>}>
          {Object.keys(skills).map(skill => {
            return (
              <div key={skill} className="skills--list">
                <div className="skills--list--title">
                  <h4 onClick={this.handleToggleDetails}>
                    {skill}
                    <span>{isOpen ? '⇡' : '⇣'}</span>
                  </h4>
                  <Button onClick={() => onOpenModify(skill)}>modifier</Button>
                </div>
                {isOpen && (
                  <div>
                    {Object.keys(skills[skill]).map(attr => {
                      return (
                        <div key={attr}>
                          {attr} : {skills[skill][attr]}
                        </div>
                      )
                    })}
                  </div>
                )}
                <Modal
                  isOpen={isModifyOpen}
                  className="card modal--content"
                  overlayClassName="modal--overlay"
                  ariaHideApp={false}
                  onRequestClose={onCloseModify}
                >
                  <SkillForm {...skillFormProps} onSubmit={onUpdate} buttonLabel="update skill" isNameHidden />
                </Modal>
              </div>
            )
          })}
        </Card>
      </div>
    )
  }
}
