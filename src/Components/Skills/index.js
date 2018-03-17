import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Button from '../../styleguide/Button'

const SkillForm = ({ fields, onChange, onClear, onSubmit, disabled, disabledMessage, buttonLabel, isNameHidden }) => {
  const { name, cooldown, cost, distance, range, description, attr1, attr2, damage } = fields

  return (
    <div className="form">
      {isNameHidden ? (
        <div>{name}</div>
      ) : (
        <div>
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" onChange={onChange} value={name} />
        </div>
      )}

      <div>
        <label htmlFor="cooldown">cooldown</label>
        <input type="number" id="cooldown" onChange={onChange} value={cooldown} />
      </div>

      <div>
        <label htmlFor="cost">coût</label>
        <input type="number" id="cost" onChange={onChange} value={cost} />
      </div>

      <div>
        <label htmlFor="distance">Distance</label>
        <input type="number" id="distance" onChange={onChange} value={distance} />
      </div>

      <div>
        <label htmlFor="range">Range</label>
        <input type="number" id="range" onChange={onChange} value={range} />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={onChange} value={description} />
      </div>

      <div>
        <label htmlFor="success">réussite (pick 2 attr)</label>
        <select name="" id="attr1" onChange={onChange} value={attr1}>
          <option value="str">str</option>
          <option value="siz">siz</option>
          <option value="con">con</option>
          <option value="dex">dex</option>
          <option value="int">int</option>
          <option value="pow">pow</option>
          <option value="cha">cha</option>
        </select>
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

      <div>
        <label htmlFor="damage">Dégâts</label>
        <input type="text" name="damage" id="damage" onChange={onChange} value={damage} />
      </div>

      {onClear && <Button onClick={onClear}>Clear fields</Button>}
      <Button onClick={onSubmit} disabled={disabled || name === ''}>
        {buttonLabel}
      </Button>
      {disabled && disabledMessage}
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

const Skills = ({
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
}) => {
  const skillFormProps = {
    fields,
    onChange
  }
  return (
    <div className="skills">
      <div>
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
        <Button onClick={onAssign} disabled={assignedSkill === '' || assignedCharacter === ''}>
          Assigner
        </Button>
      </div>

      <hr />

      <SkillForm
        {...skillFormProps}
        onSubmit={onCreate}
        onClear={onClear}
        disabled={disabled}
        buttonLabel="create skill"
        disabledMessage="this skill aready exists"
      />

      <hr />

      {Object.keys(skills).map(skill => {
        return (
          <div key={skill}>
            <div>{skill}</div>
            {Object.keys(skills[skill]).map(attr => {
              return (
                <div key={attr}>
                  {attr} : {skills[skill][attr]}
                </div>
              )
            })}
            <Button onClick={() => onOpenModify(skill)}>modifier</Button>
            <Modal isOpen={isModifyOpen} ariaHideApp={false}>
              <SkillForm {...skillFormProps} onSubmit={onUpdate} buttonLabel="update skill" isNameHidden />
              <Button onClick={onCloseModify}>close</Button>
            </Modal>
          </div>
        )
      })}
    </div>
  )
}
Skills.propTypes = {
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

export default Skills
