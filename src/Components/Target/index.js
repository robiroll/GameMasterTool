import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../styleguide'
import { statuses as statusesOptions } from '../../config/statuses'
import './Target.scss'

const Target = ({
  type,
  character,
  characters,
  onChangeTarget,
  targetedCharacter,
  modifier,
  onChangeModifier,
  onChangeField,
  onValidate,
  skill,
  fields,
  targets,
  onTargetsUp,
  onTargetsDown,
  onChangeAdditionalTarget,
  onChangeTurn,
  onChangeBonus
}) => {
  const { weapon, str, dex, pow, siz, ignoreArmor, multiplicator, statuses } = fields
  const selected = characters.find(({ id }) => id === targetedCharacter)
  return (
    <div className="target">
      <h2>
        {character.name} - {skill.name || 'Attack'}
      </h2>
      <div className="target--section">
        <h3>Target</h3>
        <select
          className="target--selection"
          name="assignedCharacter"
          id="assignedCharacter"
          onChange={onChangeTarget}
          value={targetedCharacter}
        >
          <option value="" disabled>
            CHARACTER
          </option>
          <option value="---" disabled>
            --------------
          </option>
          {characters &&
            characters.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              )
            })}
        </select>
        {type === 'skill' && targets.length > 0 && (
          <Fragment>
            {targets.map((target, i) => (
              <span key={i}>
                <select id="id" className="target--selection" onChange={onChangeAdditionalTarget(i)} value={target.id}>
                  <option value="" disabled>
                    CHARACTER
                  </option>
                  <option value="---" disabled>
                    --------------
                  </option>
                  {characters &&
                    characters.map(({ id, name }) => {
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      )
                    })}
                </select>
              </span>
            ))}

            <Button size="small" onClick={onTargetsDown}>
              -
            </Button>
          </Fragment>
        )}
        {type === 'skill' && (
          <Button size="small" onClick={onTargetsUp}>
            +
          </Button>
        )}
      </div>
      <div className="target--section">
        <h3>{selected ? selected.name : 'No target'}</h3>
        <div className="skills--create--field">
          <label htmlFor="modifier">Modifier</label>
          <input type="number" id="modifier" value={modifier} onChange={onChangeModifier} autoComplete="off" /> (
          {skill.modifier || '1D10'})
        </div>
        {type === 'skill' && (
          <div>
            <div className="skills--create--field">
              <label htmlFor="type">Skill type</label>
              <select name="" id="type" onChange={onChangeField} value={fields.type}>
                <option value="damage">damage</option>
                <option value="heal">heal</option>
                <option value="status">status</option>
              </select>
            </div>
            <div className="skills--create--field">
              <label htmlFor="weapon">Use weapon</label>
              <input type="checkbox" id="weapon" onChange={onChangeField} checked={weapon} />
            </div>

            <div className="skills--create--field">
              <label htmlFor="str">Use Strength</label>
              <input type="checkbox" id="str" onChange={onChangeField} checked={str} />
            </div>
            <div className="skills--create--field">
              <label htmlFor="dex">Use Dexterity</label>
              <input type="checkbox" id="dex" onChange={onChangeField} checked={dex} />
            </div>
            <div className="skills--create--field">
              <label htmlFor="pow">Use Power</label>
              <input type="checkbox" id="pow" onChange={onChangeField} checked={pow} />
            </div>
            <div className="skills--create--field">
              <label htmlFor="siz">Use Size</label>
              <input type="checkbox" id="siz" onChange={onChangeField} checked={siz} />
            </div>
            <div className="skills--create--field">
              <label htmlFor="ignoreArmor">Ignore armor</label>
              <input type="checkbox" id="ignoreArmor" onChange={onChangeField} checked={ignoreArmor} />
            </div>

            <div className="skills--create--field">
              <label htmlFor="multiplicator">Multiplicator</label>
              <input type="number" id="multiplicator" onChange={onChangeField} value={multiplicator} step="0.1" />
            </div>
            {statuses &&
              statuses.map(({ id, turns, bonuses = {} }, i) => (
                <div key={i} className="skills--create--field">
                  <label htmlFor="statuses">{statusesOptions.find(status => status.slug === id).name}</label>
                  <input type="number" id={id} onChange={onChangeTurn} value={turns} />
                  {Object.keys(bonuses).length > 0 &&
                    Object.entries(bonuses).map(([key, value]) => (
                      <div key={key} className="skills--create--field">
                        {key}: <input type="number" bonus={key} onChange={onChangeBonus} value={value} status={id} />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
      {type === 'skill' &&
        targets.length > 0 &&
        targets.map(({ id, multiplicator }, i) => {
          const selectedTarget = characters.find(char => char.id === id)
          return (
            <div key={i} className="target--section">
              <h3>{selectedTarget ? selectedTarget.name : 'No target'}</h3>
              <div>
                <div className="skills--create--field">
                  <label htmlFor="multiplicator">Multiplicator</label>
                  <input
                    type="number"
                    id="multiplicator"
                    onChange={onChangeAdditionalTarget(i, 'multiplicator')}
                    value={multiplicator}
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          )
        })}
      <Button onClick={onValidate} disabled={targetedCharacter === ''}>
        Valider
      </Button>
    </div>
  )
}

Target.propTypes = {
  type: PropTypes.oneOf(['attack', 'skill']),
  skill: PropTypes.object,
  character: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  onChangeTarget: PropTypes.func.isRequired,
  targetedCharacter: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  onChangeModifier: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onChangeAdditionalTarget: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  targets: PropTypes.array.isRequired,
  onTargetsUp: PropTypes.func.isRequired,
  onTargetsDown: PropTypes.func.isRequired,
  onChangeTurn: PropTypes.func.isRequired,
  onChangeBonus: PropTypes.func.isRequired
}

Target.defaultProps = {
  skill: {},
  fields: {}
}

export default Target
