import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../styleguide'
import './Target.scss'

const Target = ({
  character,
  characters,
  onChangeTarget,
  targetedCharacter,
  modifier,
  onChangeModifier,
  onValidate
}) => {
  return (
    <div className="target">
      <h2>{character.name}</h2>
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
      </div>
      <div className="target--section">
        <h3>Modifier</h3>
        <div>
          <input type="number" value={modifier} onChange={onChangeModifier} />
        </div>
      </div>
      <Button onClick={onValidate} disabled={targetedCharacter === ''}>
        Valider
      </Button>
    </div>
  )
}

Target.propTypes = {
  character: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  onChangeTarget: PropTypes.func.isRequired,
  targetedCharacter: PropTypes.string.isRequired,
  modifier: PropTypes.number.isRequired,
  onChangeModifier: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired
  // total: PropTypes.number.isRequired
}

export default Target
