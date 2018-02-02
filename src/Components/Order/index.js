import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Order.css'

const Order = ({ order, characters, status, removeCharacter }) => (
  <div className="order">
    {order.map(idCharacter => {
      return (
        <div key={idCharacter} className="order--char">
          {characters[idCharacter].name}
          {(status === 'playing' || status === 'selection') && (
            <Button onClick={() => removeCharacter(idCharacter)}>X</Button>
          )}
        </div>
      )
    })}
  </div>
)

Order.propTypes = {
  order: PropTypes.array,
  characters: PropTypes.object,
  status: PropTypes.string,
  removeCharacter: PropTypes.func
}

export default Order
