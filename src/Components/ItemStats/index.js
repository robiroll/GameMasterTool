import React from 'react'
import PropTypes from 'prop-types'
import './ItemStats.css'

const LABELS = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  pow: 'Power',
  cha: 'Charisma',
  int: 'Int',
  siz: 'Size'
}
const ItemStats = ({ item, hideTitle }) => {
  const { name, slot, weaponType, damage, size, damageType, armor, magicArmor, hp, bonus, creditsValue } = item
  return (
    <div className="item-stats">
      <div className="item-stats--block">{!hideTitle && <h5>{name}</h5>}</div>
      <div className="item-stats--divider" />
      <div className="item-stats--block">
        <div className="item-stats--item">Slot: {slot}</div>
        {!!weaponType && <div className="item-stats--item">Weapon type: {weaponType}</div>}
        {!!damage && <div className="item-stats--item">Damage: {damage}</div>}
        {!!size && <div className="item-stats--item">Weapon size: {size}</div>}
        {!!damageType && <div className="item-stats--item">Damage type: {LABELS[damageType]}</div>}
        {!!armor && <div className="item-stats--item">Armor: {armor}</div>}
        {!!magicArmor && <div className="item-stats--item">Magic armor: {magicArmor}</div>}
      </div>
      <div className="item-stats--divider" />

      {bonus && (
        <React.Fragment>
          <div className="item-stats--block">
            <h6 className="item-stats--item--bonus--title">Bonus</h6>
            {hp && <div className="item-stats--item">Health points: {hp}</div>}
            {Object.entries(bonus).map(([key, value]) => {
              return (
                <div key={key} className="item-stats--item">
                  {LABELS[key]}: {value}
                </div>
              )
            })}
          </div>
          <div className="item-stats--divider" />
        </React.Fragment>
      )}
      <div className="item-stats--block">Value: {creditsValue}</div>
    </div>
  )
}

ItemStats.propTypes = {
  item: PropTypes.object.isRequired,
  hideTitle: PropTypes.bool
}

export default ItemStats
