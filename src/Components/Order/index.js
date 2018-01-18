import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Order.css'

const Order = ({ characters, status, removeCharacter }) => (
  <div className="order">
    {characters.map(char => {
      return (
        <div key={char.idCharacter} className="order--char">
          {char.name}
          {(status === 'playing' || status === 'selection') && (
            <Button onClick={() => removeCharacter(char.idCharacter)}>X</Button>
          )}
        </div>
      )
    })}
  </div>
)

Order.propTypes = {
  characters: PropTypes.array,
  status: PropTypes.string,
  removeCharacter: PropTypes.func
}

export default Order
