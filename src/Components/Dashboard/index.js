import React from 'react'
import PropTypes from 'prop-types'
import Characters from '../../Containers/Characters'
import Button from '../../styleguide/Button'
// import './Dashboard.css'

const Dashboard = ({ currentTurn, onEndTurn, onEndFight, onGetChar }) => {
  return (
    <div className="dashboard">
      <div className="turn">Tour {currentTurn}</div>
      <Button onClick={onEndTurn}>end turn</Button>
      <Button onClick={onEndFight}>end fight</Button>
      <Button onClick={() => onGetChar('pa')}>get Char (pa)</Button>
      <Characters />
    </div>
  )
}

Dashboard.propTypes = {
  currentTurn: PropTypes.number,
  onEndTurn: PropTypes.func,
  onEndFight: PropTypes.func,
  onGetChar: PropTypes.func
}

export default Dashboard
