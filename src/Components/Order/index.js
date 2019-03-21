import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import { STATS, HP_MAX, STATUSES_STATS } from '../../lib'
import { statuses as statusesOptions } from '../../config/statuses'
import './Order.scss'

const Order = ({
  playing,
  order,
  characters,
  status,
  removeCharacter,
  onChangeHp,
  onApplyStatus,
  onChangeDuration,
  onChangeStatus,
  statusEffect,
  duration
}) => (
  <div className={`order order__${status}`}>
    {order.map(idCharacter => {
      const character = characters[idCharacter]
      const { equipment, statuses } = character
      const stats = STATS(character)
      const bonuses = STATUSES_STATS(statuses)
      const { con, pow } = stats
      const isPlaying = playing === idCharacter
      let armor = con + bonuses.armor
      let magicArmor = pow + bonuses.magicArmor
      Object.values(equipment).forEach(eq => {
        armor += eq.armor || 0
        magicArmor += eq.magicArmor || 0
      })
      return (
        <div key={idCharacter} className={`order--char${isPlaying ? ' order--char__playing' : ''}`}>
          <h4 className="order--char--name">{character.name}</h4>
          {status === 'all' && (
            <div className="order--char--input">
              <div className="order--char--def">
                <div className="order--char--def--item">
                  <div className="order--char--def--item--icon">
                    <Icon name="armor" />
                  </div>
                  <span>{armor}</span>
                </div>
                <div className="order--char--def--item">
                  <div className="order--char--def--item--icon">
                    <Icon name="magic" />
                  </div>
                  <span>{magicArmor}</span>
                </div>
              </div>
              <div className="order--char--life">
                <div className="order--char--life--current">
                  <input
                    className="order--char--life--current--input"
                    type="number"
                    value={character.hp}
                    onChange={onChangeHp(idCharacter)}
                  />
                  <div className="order--char--life--current--icon">
                    <Icon name="life" />
                  </div>
                </div>
                <div className="order--char--life--max">/ {HP_MAX(stats, equipment)}</div>
              </div>
              <div className="order--char--statuses">
                {character.statuses
                  ? Object.entries(character.statuses).map(([key, { turns, bonuses }]) => {
                      return (
                        <div key={key}>
                          <div>
                            {key} : {turns}
                          </div>
                          {bonuses && (
                            <div>
                              {Object.entries(bonuses).map(([key, val]) => (
                                <div key={key}>
                                  {' - '}
                                  {key}: {val}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })
                  : 'No status'}
              </div>
              <div className="order--char--status">
                <div className="order--char--status--options select">
                  <select name="status" id="status" onChange={onChangeStatus}>
                    <option value="none">None</option>
                    {statusesOptions.map(({ slug, name }) => (
                      <option key={slug} value={slug}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <input className="order--char--status--value" type="number" onChange={onChangeDuration} />
                <div className="order--char--status--button">
                  <Button size="small" onClick={onApplyStatus(idCharacter)} disabled={!statusEffect || !duration}>
                    OK
                  </Button>
                </div>
              </div>
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
  playing: PropTypes.string,
  order: PropTypes.array,
  characters: PropTypes.object,
  status: PropTypes.string,
  removeCharacter: PropTypes.func,
  onChangeHp: PropTypes.func,
  onApplyStatus: PropTypes.func,
  onChangeDuration: PropTypes.func,
  onChangeStatus: PropTypes.func,
  statusEffect: PropTypes.string,
  duration: PropTypes.any
}

export default Order
