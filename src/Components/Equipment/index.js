import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import ItemStats from '../ItemStats'
import './Equipment.scss'

const ITEMS = [
  'back',
  'belt',
  'chest',
  'feet',
  'hands',
  'head',
  'legs',
  'neck',
  'ring1',
  'ring2',
  'offhand',
  'shoulders',
  'weapon1',
  'weapon2'
]
const Equipment = ({ equipment, onSelect, onUnequip, selectedItem }) => {
  if (!equipment) return 'You have equipped nothing yet'
  let ttlarmor = 0
  let ttlmagicArmor = 0
  let ttlhp = 0
  let ttlstr = 0
  let ttldex = 0
  let ttlcon = 0
  let ttlpow = 0
  let ttlcha = 0
  let ttlint = 0
  let ttlsiz = 0
  let ttlcreditsValue = 0
  Object.values(equipment).map(item => {
    const { armor, magicArmor, hp, bonus, creditsValue } = item
    if (armor) ttlarmor += armor
    if (magicArmor) ttlmagicArmor += magicArmor
    if (hp) ttlhp += hp
    if (bonus) {
      const { str, dex, con, pow, cha, int, siz } = bonus
      if (str) ttlstr += str
      if (dex) ttldex += dex
      if (con) ttlcon += con
      if (pow) ttlpow += pow
      if (cha) ttlcha += cha
      if (int) ttlint += int
      if (siz) ttlsiz += siz
    }
    ttlcreditsValue += creditsValue
  })

  const selected = equipment[selectedItem]

  return (
    <div className="equipment">
      <div className="equipment--schema">
        {ITEMS.map(item => {
          const isEquippedClass = equipment[item] ? ' equipment--schema--item__equipped' : ''
          const isSelectedClass = item === selectedItem ? ' equipment--schema--item__selected' : ''
          return (
            <div
              key={item}
              className={`equipment--schema--item equipment--schema--item__${item}${isEquippedClass}${isSelectedClass}`}
              onClick={equipment[item] && onSelect(item)}
            >
              <Icon name={item} size="full" />
            </div>
          )
        })}
      </div>
      {selected &&
        selectedItem && (
          <div className="equipment--single">
            <ItemStats item={selected} />
            <div className="equipment--single--button">
              <Button onClick={onUnequip} format="full">
                Unequip
              </Button>
            </div>
          </div>
        )}
      <div className="equipment--stats">
        <h4>Overall equipment stats</h4>
        <div className="equipment--stats--item">Armor: {ttlarmor}</div>
        <div className="equipment--stats--item">Magic armor: {ttlmagicArmor}</div>
        <div className="equipment--stats--item">Bonus HP: {ttlhp}</div>
        <div className="equipment--stats--item">Strength: {ttlstr}</div>
        <div className="equipment--stats--item">Dexterity: {ttldex}</div>
        <div className="equipment--stats--item">Constitution: {ttlcon}</div>
        <div className="equipment--stats--item">Power: {ttlpow}</div>
        <div className="equipment--stats--item">Charisma: {ttlcha}</div>
        <div className="equipment--stats--item">Int: {ttlint}</div>
        <div className="equipment--stats--item">Size: {ttlsiz}</div>
        <div className="equipment--stats--item">Total value: {ttlcreditsValue}</div>
      </div>
    </div>
  )
}

Equipment.propTypes = {
  equipment: PropTypes.object,
  onSelect: PropTypes.func,
  onUnequip: PropTypes.func,
  selectedItem: PropTypes.string
}

export default Equipment
