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
        <div key={idCharacter} className={`order--char order--char--${status}`}>
          <h4 className="order--char--name">{character.name}</h4>
          {status === 'all' && (
            <div className="order--char--all">
              <input
                className="order--char--input"
                type="number"
                defaultValue={character.hp}
                onChange={onChangeHp(idCharacter)}
              />{' '}
              / {HP_MAX(STATS(character))}
              <div className="order--char--button">
                <Button onClick={() => removeCharacter(idCharacter)} size="small" variant="accent-1">
                  X
                </Button>
              </div>
            </div>
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
