import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Order.css'

const Order = ({ characters, status, removeCharacter, endCharaterTurn, delayCharacterTurn }) => (
  <div className="order">
    {characters.map(char => {
      return (
        <div key={char.idCharacter} className="order--char">
          {char.name}
          {status === 'playing' && (
            <Fragment>
              <Button onClick={() => delayCharacterTurn(char.idCharacter)}>...</Button>
              <Button onClick={() => endCharaterTurn(char.idCharacter)}>{'->'}</Button>
              <Button onClick={() => removeCharacter(char.idCharacter)}>X</Button>
            </Fragment>
          )}
          {status === 'selection' && (
            <Fragment>
              <Button onClick={() => removeCharacter(char.idCharacter)}>X</Button>
            </Fragment>
          )}
        </div>
      )
    })}
  </div>
)

Order.propTypes = {
  characters: PropTypes.array,
  status: PropTypes.string,
  endCharaterTurn: PropTypes.func,
  delayCharacterTurn: PropTypes.func,
  removeCharacter: PropTypes.func
}

export default Order
