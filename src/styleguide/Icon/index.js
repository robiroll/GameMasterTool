import React from 'react'
import PropTypes from 'prop-types'
import { armor, damage, dice, magic, life, target } from './src'
import './Icon.css'

const ICONS = { armor, damage, dice, target, magic, life }

const Icon = ({ name }) => (
  <div className={`icon icon-chest-armor icon-${name}`}>
    <img src={ICONS[name]} alt={name} />
  </div>
)

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon
