import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'

const Items = ({
  items,
  onCreate,
  onChangeField,
  onChangeBonus,
  fields,
  bonuses,
  onAssign,
  characters,
  onChangeAssignee,
  assignedCharacter
}) => {
  const {
    name,
    type,
    quantity,
    slot,
    weight,
    apCost,
    creditsValue,
    size,
    armor,
    magicArmor,
    weaponHands,
    damage
  } = fields
  const { str, siz, con, dex, int, pow, cha } = bonuses
  return (
    <div>
      <div className="form">
        <div>fields</div>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" onChange={onChangeField} value={name} />
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={onChangeField} value={type}>
            <option value="equipment">equipment</option>
            <option value="usable">usable</option>
            <option value="permanent">permanent</option>
          </select>
        </div>

        {type === 'usable' && (
          <div>
            <label htmlFor="quantity">quantity</label>
            <input type="number" id="quantity" onChange={onChangeField} value={quantity} />
          </div>
        )}

        {type === 'equipment' && (
          <Fragment>
            <div>
              <label htmlFor="slot">slot</label>
              <select name="slot" id="slot" onChange={onChangeField} value={slot}>
                <option value="weapon">weapon</option>
                <option value="offhand">offhand</option>
                <option value="head">head</option>
                <option value="shoulders">shoulders</option>
                <option value="back">back</option>
                <option value="chest">chest</option>
                <option value="hands">hands</option>
                <option value="belt">belt</option>
                <option value="legs">legs</option>
                <option value="feet">feet</option>
                <option value="neck">neck</option>
                <option value="ring">ring</option>
              </select>
              {slot === 'weapon' && (
                <select name="weaponHands" id="weaponHands" onChange={onChangeField} value={weaponHands}>
                  <option value="1handed">1H weapon</option>
                  <option value="2handed">2H weapon</option>
                </select>
              )}
            </div>

            {slot === 'weapon' && (
              <Fragment>
                <div>
                  <label htmlFor="damage">damage</label>
                  <input type="number" id="damage" onChange={onChangeField} value={damage} />
                </div>
                <div>
                  <label htmlFor="size">size</label>
                  <input type="number" id="size" onChange={onChangeField} value={size} />
                </div>
              </Fragment>
            )}

            <div>
              <label htmlFor="armor">armor</label>
              <input type="number" id="armor" onChange={onChangeField} value={armor} />
            </div>

            <div>
              <label htmlFor="magicArmor">magicArmor</label>
              <input type="number" id="magicArmor" onChange={onChangeField} value={magicArmor} />
            </div>

            <div>
              <label htmlFor="bonuses">bonuses</label>
              <div>
                str: <input type="number" id="str" onChange={onChangeBonus} value={str} />
              </div>
              <div>
                siz: <input type="number" id="siz" onChange={onChangeBonus} value={siz} />
              </div>
              <div>
                con: <input type="number" id="con" onChange={onChangeBonus} value={con} />
              </div>
              <div>
                dex: <input type="number" id="dex" onChange={onChangeBonus} value={dex} />
              </div>
              <div>
                int: <input type="number" id="int" onChange={onChangeBonus} value={int} />
              </div>
              <div>
                pow: <input type="number" id="pow" onChange={onChangeBonus} value={pow} />
              </div>
              <div>
                cha: <input type="number" id="cha" onChange={onChangeBonus} value={cha} />
              </div>
              --
            </div>
          </Fragment>
        )}

        <div>
          <label htmlFor="weight">weight</label>
          <input type="number" id="weight" onChange={onChangeField} value={weight} />
        </div>

        {type !== 'equipment' && (
          <div>
            <label htmlFor="apCost">apCost</label>
            <input type="number" id="apCost" onChange={onChangeField} value={apCost} />
          </div>
        )}

        <div>
          <label htmlFor="creditsValue">creditsValue</label>
          <input type="number" id="creditsValue" onChange={onChangeField} value={creditsValue} />
        </div>
      </div>
      <Button onClick={onCreate}>Create new item</Button>
      <div>list</div>
      <div className="equipment--title">
        {Object.keys(items).map(id => {
          return (
            <div key={id}>
              <div>{items[id].name}</div>
              <select
                name="assignedCharacter"
                id="assignedCharacter"
                onChange={onChangeAssignee}
                value={assignedCharacter}
              >
                <option value="" disabled>
                  CHARACTER
                </option>
                <option value="---" disabled>
                  --------------
                </option>
                {Object.keys(characters).map(charId => {
                  return (
                    <option key={charId} value={charId}>
                      {characters[charId].name}
                    </option>
                  )
                })}
              </select>
              <Button onClick={() => onAssign(id)}>Assign</Button>
              <ul>
                {Object.keys(items[id]).map(key => {
                  const value = items[id][key]
                  return (
                    <li key={key}>
                      {key} :{' '}
                      {typeof value !== 'object'
                        ? value
                        : Object.keys(value).map(val => {
                            return (
                              <div key={val}>
                                {val}: {value[val]}
                              </div>
                            )
                          })}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Items.propTypes = {
  items: PropTypes.object,
  characters: PropTypes.object,
  fields: PropTypes.object,
  bonuses: PropTypes.object,
  onCreate: PropTypes.func,
  onChangeField: PropTypes.func,
  onChangeBonus: PropTypes.func,
  onChangeAssignee: PropTypes.func,
  onAssign: PropTypes.func,
  assignedCharacter: PropTypes.string
}

export default Items
