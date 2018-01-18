import React from 'react'
import PropTypes from 'prop-types'

const Equipment = ({ item }) => {
  let infos = []
  for (let prop in item) {
    if (item.hasOwnProperty(prop) && prop !== 'name' && prop !== 'bonus') {
      infos.push(
        <div>
          {prop} {item[prop]}
        </div>
      )
    }
  }
  return (
    <div>
      <div className="equipment--title">{item.name}</div>
      <div className="equipment--infos">{infos}</div>
    </div>
  )
}

Equipment.propTypes = {
  item: PropTypes.object
}

export default Equipment
