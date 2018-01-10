import React from 'react'
import PropTypes from 'prop-types'
import Characters from '../../Containers/Characters'
import Button from '../../styleguide/Button'
// import './Dashboard.css'

const Dashboard = ({ currentTurn, onEndTurn }) => {
  return (
    <div className="dashboard">
      <div className="turn">Tour {currentTurn}</div>
      <Button onClick={onEndTurn}>end turn</Button>
      <Characters />
    </div>
  )
}

Dashboard.propTypes = {
  currentTurn: PropTypes.number,
  onEndTurn: PropTypes.func
}

export default Dashboard
