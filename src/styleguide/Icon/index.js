import React from 'react'
import PropTypes from 'prop-types'
import {
  armor,
  damage,
  dice,
  magic,
  life,
  target,
  back,
  belt,
  chest,
  feet,
  hands,
  head,
  legs,
  neck,
  ring1 as ring,
  ring1,
  ring2,
  offhand,
  shoulders,
  weapon1 as weapon,
  weapon1,
  weapon2
} from './src'
import './Icon.scss'

const ICONS = {
  armor,
  damage,
  dice,
  target,
  magic,
  life,
  back,
  belt,
  chest,
  feet,
  hands,
  head,
  legs,
  neck,
  ring,
  ring1,
  ring2,
  offhand,
  shoulders,
  weapon,
  weapon1,
  weapon2
}

const Icon = ({ name, size }) => (
  <div className={`icon icon__${size}`}>
    <img src={ICONS[name]} alt={name} />
  </div>
)

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)),
  size: PropTypes.string
}

Icon.defaultProps = {
  size: 'medium'
}

export default Icon
