import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Selection.css'

const Selection = ({ characters, selectCharacter, validateCharacters, isValidateDisabled, order }) => (
  <div className="selection">
    Heroes
    {Object.keys(characters)
      .filter(id => characters[id].kind === 'hero')
      .map(key => {
        const char = characters[key]
        const disabled = !!order.find(item => item === key)
        return (
          <div key={key} className="selection--characters">
            <div className="selection--characters--char--name">
              <Button onClick={() => selectCharacter(key)} disabled={disabled}>
                {char.name}
              </Button>
            </div>
          </div>
        )
      })}
    Foes
    {Object.keys(characters)
      .filter(id => characters[id].kind === 'foe')
      .map(key => {
        const char = characters[key]
        const disabled = !!order.find(item => item === key)
        return (
          <div key={key} className="selection--characters">
            <div className="selection--characters--char--name">
              <Button onClick={() => selectCharacter(key)} disabled={disabled}>
                {char.name}
              </Button>
            </div>
          </div>
        )
      })}
    <Button onClick={validateCharacters} disabled={isValidateDisabled}>
      validate chars
    </Button>
  </div>
)

Selection.propTypes = {
  characters: PropTypes.object,
  selectCharacter: PropTypes.func,
  validateCharacters: PropTypes.func,
  isValidateDisabled: PropTypes.bool,
  order: PropTypes.array
}

export default Selection
