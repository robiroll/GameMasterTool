import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import characters, { foes as enemies } from '../../World/Characters'
import './Selection.css'

const Selection = ({ selectCharacter, selectFoe, validateCharacters, isValidateDisabled, order, foes }) => (
  <div className="selection">
    <div className="selection--characters">
      {characters.map(char => {
        const disabled = !!order.find(item => item.idCharacter === char.idCharacter)
        return (
          <div key={char.idCharacter} className="selection--characters--char">
            <div className="selection--characters--char--name">
              <Button onClick={() => selectCharacter(char)} disabled={disabled}>
                {char.name}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
    <div className="selection--characters">
      {enemies.map(char => {
        return (
          <div key={char.idCharacter} className="selection--characters--char">
            <div className="selection--characters--char--name">
              <Button
                onClick={() =>
                  selectFoe(Object.assign({}, char, { idCharacter: `${char.idCharacter}-${foes.length}` }))
                }
              >
                {char.name}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
    <Button onClick={validateCharacters} disabled={isValidateDisabled}>
      validate chars
    </Button>
  </div>
)

Selection.propTypes = {
  selectCharacter: PropTypes.func,
  selectFoe: PropTypes.func,
  validateCharacters: PropTypes.func,
  isValidateDisabled: PropTypes.bool,
  order: PropTypes.array,
  foes: PropTypes.array
}

export default Selection
