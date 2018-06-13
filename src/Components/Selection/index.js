import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Selection.css'

const Selection = ({ characters, selectCharacter, validateCharacters, isValidateDisabled, order }) => (
  <div className="selection">
    <h3 className="selection--title">Heroes</h3>
    <div className="selection--content">
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
    </div>
    <h3 className="selection--title">Foes</h3>
    <div className="selection--content">
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
    </div>
    <div className="selection--button">
      <Button onClick={validateCharacters} disabled={isValidateDisabled} variant="accent-1">
        validate chars
      </Button>
    </div>
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
