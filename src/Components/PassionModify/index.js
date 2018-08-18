import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import Difficulty from '../Difficulty'
import './PassionModify.css'

const PassionModify = ({ name, value, onUpdate, total }) => (
  <div className="passion-modify">
    <span>
      {name}: {value}
    </span>
    <div>
      <Button onClick={onUpdate('add')} size="small">
        +
      </Button>
      <Button onClick={onUpdate('remove')} size="small">
        -
      </Button>
    </div>
    <div className="passion-modify--difficulty">
      <Difficulty title={name} total={total} />
    </div>
  </div>
)

PassionModify.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  onUpdate: PropTypes.func,
  total: PropTypes.number
}

export default PassionModify