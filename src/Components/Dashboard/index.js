import React from 'react'
import PropTypes from 'prop-types'
import Characters from '../../Containers/Characters'
import Selection from '../../Containers/Selection'
import Order from '../../Containers/Order'

import Modal from 'react-modal'
import Button from '../../styleguide/Button'
// import './Dashboard.css'

const Dashboard = ({
  isOpen,
  currentTurn,
  fightStatus,
  onEndTurn,
  // onEndFight,
  onGetChar,
  onStartFight,
  onEndFight,
  onCloseSelection
}) => {
  const isStartDisabled = fightStatus !== null
  const isEndDisabled = fightStatus !== 'in-progress'
  return (
    <div className="dashboard">
      <div className="turn">Tour {currentTurn}</div>
      order
      <Order />
      order playing
      <Order status="playing" />
      order done
      <Order status="done" />
      <Modal isOpen={isOpen}>
        <Order status="selection" />
        <Selection onCloseSelection={onCloseSelection} />
      </Modal>
      <div className="dashboard--fight">
        <div className="dashboard--fight--title">Fight actions</div>
        <div className="dashboard--fight--actions">
          <Button onClick={onStartFight} disabled={isStartDisabled}>
            start fight
          </Button>
          <Button onClick={onEndTurn} disabled={isEndDisabled}>
            end turn
          </Button>
          <Button onClick={onEndFight} disabled={isEndDisabled}>
            end fight
          </Button>
        </div>
      </div>
      <div className="dashboard--characters">
        <div className="dashboard--characters--title">characters</div>
        <div className="dashboard--characters--actions">
          <Button onClick={() => onGetChar('pa')}>get Char (pa)</Button>
        </div>
      </div>
      <div className="dashboard--characters--content">
        <Characters />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  isOpen: PropTypes.bool,
  currentTurn: PropTypes.number,
  fightStatus: PropTypes.any,
  onEndTurn: PropTypes.func,
  // onEndFight: PropTypes.func,
  onGetChar: PropTypes.func,
  onStartFight: PropTypes.func,
  onEndFight: PropTypes.func,
  onCloseSelection: PropTypes.func
}

export default Dashboard
