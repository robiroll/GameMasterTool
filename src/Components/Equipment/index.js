import React from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'

const Equipment = ({ items }) => {
  return (
    <div>
      <div className="character--title">Équipement</div>
      <div className="character--equipment">
        {items.map(item => {
          return item.item && <Item key={item.slot} item={item.item} />
        })}
      </div>
    </div>
  )
}

Equipment.propTypes = {
  items: PropTypes.array
}

export default Equipment
