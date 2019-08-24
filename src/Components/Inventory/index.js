import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import { MATCH_ICON } from '../../lib'
import ItemStats from '../ItemStats'
import './Inventory.scss'

const Inventory = ({ items, onSelect, onEquip, onUse, onDropItem, selectedItem, useAp }) => {
  if (!items) return 'You have no items'
  const selected = items[selectedItem]

  const equipmentProps = {
    onClick: onEquip(selectedItem, selected),
    children: `Equip${selected && useAp ? ` (${selected.apCost})` : ''}`
  }
  const usableProps = {
    onClick: onUse(selectedItem, selected),
    children: `Use${selected && useAp ? ` (${selected.apCost})` : ''}`
  }
  const buttonProps =
    selected && (selected.type === 'equipment' ? equipmentProps : selected.type === 'usable' && usableProps)

  return (
    <div className="inventory">
      <div className="inventory--single">
        {selected ? (
          <React.Fragment>
            <ItemStats item={selected} />
            <div className="inventory--single--button">
              <Button {...buttonProps} format="full" />
              <Button onClick={onDropItem} format="full" variant="accent-1">
                Drop
              </Button>
            </div>
          </React.Fragment>
        ) : (
          'Select any item'
        )}
      </div>
      <div className="inventory--items">
        {Object.entries(items).map(([key, item]) => {
          let { slot } = item
          if (slot === 'weapon' || slot === 'ring') slot += '1'
          if (!slot) slot = 'dice'
          const isSelectedClass = key === selectedItem ? ' inventory--items--item__selected' : ''
          return (
            <div
              key={key}
              className={`inventory--items--item inventory--items--item__${slot}${isSelectedClass}`}
              onClick={onSelect(key)}
            >
              <Icon name={MATCH_ICON[slot] || slot} size="l" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Inventory.propTypes = {
  items: PropTypes.object,
  onSelect: PropTypes.func,
  onEquip: PropTypes.func,
  onUse: PropTypes.func,
  onDropItem: PropTypes.string,
  selectedItem: PropTypes.string,
  useAp: PropTypes.bool
}

export default Inventory
