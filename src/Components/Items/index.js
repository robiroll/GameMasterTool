import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Item from '../../Components/Item'
import { Button, Card, Icon } from '../../styleguide'
import icons from '../../config/icons'
import * as S from './styles'
import './Items.scss'

const Items = ({
  assignedCharacter,
  onChangeAssignee,
  onAssign,
  characters,
  items,
  onCreate,
  onChangeField,
  onChangeBonus,
  fields,
  bonuses,
  filter,
  onChangeFilter,
  onSelect,
  selectedItems
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
    hp,
    weaponHands,
    damage,
    damageType,
    description,
    icon
  } = fields
  const { str, siz, con, dex, int, pow, cha } = bonuses
  const filterdIcons = type === 'equipment' ? icons[type][slot] : icons[type]
  return (
    <div className="items">
      <Card title={<h3>Create item</h3>}>
        <div className="items--form">
          <div className="items--form--main">
            <div className="items--fieldset">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={onChangeField} value={name} />
            </div>

            <div className="items--fieldset">
              <label htmlFor="type">Type</label>
              <select name="type" id="type" onChange={onChangeField} value={type}>
                <option value="equipment">equipment</option>
                <option value="usable">usable</option>
              </select>
            </div>

            {type === 'usable' && (
              <div className="items--fieldset">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" onChange={onChangeField} value={quantity} />
              </div>
            )}

            <div className="items--fieldset">
              <label htmlFor="weight">Weight</label>
              <input type="number" id="weight" onChange={onChangeField} value={weight} />
            </div>

            {type !== 'equipment' && (
              <div className="items--fieldset">
                <label htmlFor="apCost">AP cost</label>
                <input type="number" id="apCost" onChange={onChangeField} value={apCost} />
              </div>
            )}

            <div className="items--fieldset">
              <label htmlFor="creditsValue">Value (credits)</label>
              <input type="number" id="creditsValue" onChange={onChangeField} value={creditsValue} />
            </div>
            <div className="items--fieldset">
              <label htmlFor="description">Description</label>
              <textarea id="description" onChange={onChangeField} value={description} />
            </div>
            <div className="items--fieldset">
              <label htmlFor="icon">Icon</label>
              <S.IconSelection>
                <S.Icon>
                  <Icon name={icon} />
                </S.Icon>
                <select name="icon" id="icon" onChange={onChangeField} value={icon}>
                  {filterdIcons.map(icon => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </S.IconSelection>
            </div>
          </div>
          {type === 'equipment' && (
            <div className="items--form--equipment">
              <div className="items--fieldset">
                <label htmlFor="slot">Slot</label>
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
              </div>
              {slot === 'weapon' && (
                <Fragment>
                  <div className="items--fieldset">
                    <label htmlFor="weaponHands">Weapon type</label>
                    <select name="weaponHands" id="weaponHands" onChange={onChangeField} value={weaponHands}>
                      <option value="1handed">1H weapon</option>
                      <option value="2handed">2H weapon</option>
                    </select>
                  </div>

                  <div className="items--fieldset">
                    <label htmlFor="damageType">Damage Type</label>
                    <select name="damageType" id="damageType" onChange={onChangeField} value={damageType}>
                      <option value="str">Strength</option>
                      <option value="dex">Dexterity</option>
                      <option value="pow">Power</option>
                    </select>
                  </div>

                  <div className="items--fieldset">
                    <label htmlFor="damage">Damage</label>
                    <input type="number" id="damage" onChange={onChangeField} value={damage} />
                  </div>

                  <div className="items--fieldset">
                    <label htmlFor="size">Size</label>
                    <input type="number" id="size" onChange={onChangeField} value={size} />
                  </div>
                </Fragment>
              )}

              <div className="items--fieldset">
                <label htmlFor="armor">Armor</label>
                <input type="number" id="armor" onChange={onChangeField} value={armor} />
              </div>

              <div className="items--fieldset">
                <label htmlFor="magicArmor">Magic armor</label>
                <input type="number" id="magicArmor" onChange={onChangeField} value={magicArmor} />
              </div>

              <div className="items--fieldset">
                <label htmlFor="hp">HP</label>
                <input type="number" id="hp" onChange={onChangeField} value={hp} />
              </div>
            </div>
          )}
          {type === 'equipment' && (
            <div>
              <div className="items--fieldset">
                <label htmlFor="str">Strength</label>
                <input type="number" id="str" onChange={onChangeBonus} value={str} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="siz">Size</label>
                <input type="number" id="siz" onChange={onChangeBonus} value={siz} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="con">Constitution</label>
                <input type="number" id="con" onChange={onChangeBonus} value={con} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="dex">Dexterity</label>
                <input type="number" id="dex" onChange={onChangeBonus} value={dex} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="int">Intelligence</label>
                <input type="number" id="int" onChange={onChangeBonus} value={int} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="pow">Power</label>
                <input type="number" id="pow" onChange={onChangeBonus} value={pow} />
              </div>
              <div className="items--fieldset">
                <label htmlFor="cha">Charisma</label>
                <input type="number" id="cha" onChange={onChangeBonus} value={cha} />
              </div>
            </div>
          )}
        </div>
        <Button onClick={onCreate} variant="accent-1">
          Create item
        </Button>
      </Card>
      <Card>
        <h4>Assign items</h4>
        <S.SelectedList>
          {Object.entries(selectedItems).map(
            ([key, isActive]) =>
              isActive && (
                <S.SelectedItem key={key}>
                  <Button size="small" onClick={onSelect(key)}>
                    <S.SelectedButtonContent>{items[key].name}</S.SelectedButtonContent>
                  </Button>
                </S.SelectedItem>
              )
          )}
        </S.SelectedList>
        <S.Assign>
          <Button
            onClick={onAssign}
            variant="accent-1"
            disabled={Object.values(selectedItems).filter(Boolean).length === 0}
          >
            Assign
          </Button>
          <div>to</div>
          <select name="assignedCharacter" id="assignedCharacter" onChange={onChangeAssignee} value={assignedCharacter}>
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
        </S.Assign>
      </Card>
      <Card
        title={
          <S.Filters>
            <h3>Items list</h3>
            <S.Inputs>
              {[
                'all',
                'weapon',
                'back',
                'belt',
                'chest',
                'feet',
                'hands',
                'head',
                'legs',
                'neck',
                'ring',
                'offhand',
                'shoulders'
              ].map(f => (
                <Fragment key={f}>
                  <S.Input type="radio" id={f} onChange={onChangeFilter} checked={f === filter} />
                  <label htmlFor={f}>{f}</label>
                </Fragment>
              ))}
            </S.Inputs>
          </S.Filters>
        }
      >
        <S.ItemsList>
          {items ? (
            Object.keys(items)
              .filter(id => filter === 'all' || filter === items[id].slot)
              .map(id => <Item key={id} item={items[id]} onSelect={onSelect(id)} isSelected={selectedItems[id]} />)
          ) : (
            <h3>No item yet</h3>
          )}
        </S.ItemsList>
      </Card>
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
  onSelect: PropTypes.func,
  assignedCharacter: PropTypes.string,
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired
}

export default Items
