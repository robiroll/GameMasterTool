import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import { STATS, HP_MAX } from '../../lib'
import './Order.css'

const Order = ({ order, characters, status, removeCharacter, onChangeHp }) => (
  <div className="order">
    {order.map(idCharacter => {
      const character = characters[idCharacter]
      return (
        <div key={idCharacter} className="order--char">
          {status === 'all' && (
            <span>
              <input type="number" defaultValue={character.hp} onChange={onChangeHp(idCharacter)} /> /{' '}
              {HP_MAX(STATS(character))}
            </span>
          )}
          <div>{character.name}</div>
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
  removeCharacter: PropTypes.func,
  onChangeHp: PropTypes.func
}

export default Order
