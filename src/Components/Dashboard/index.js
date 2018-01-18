import React from 'react'
import PropTypes from 'prop-types'
import Characters from '../../Containers/Characters'
import Character from '../../Containers/Character'
import Selection from '../../Containers/Selection'
import Order from '../../Containers/Order'

import Modal from 'react-modal'
import Button from '../../styleguide/Button'
import './Dashboard.css'

const Dashboard = ({
  isOpen,
  currentTurn,
  fightStatus,
  orderPlaying,
  onEndTurn,
  onGetChar,
  onStartFight,
  onEndFight,
  onCloseSelection,
  characterPlaying,
  onUseSkill
}) => {
  const isStartDisabled = fightStatus !== null
  const isEndTurnDisabled = orderPlaying.length > 0 || fightStatus !== 'in-progress'
  const isEndFightDisabled = fightStatus !== 'in-progress'
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
          <Button onClick={onEndTurn} disabled={isEndTurnDisabled}>
            next tour
          </Button>
          <Button onClick={onEndFight} disabled={isEndFightDisabled}>
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
      {characterPlaying && (
        <div className="dashboard--characters--content">
          <Character data={characterPlaying} onUseSkill={onUseSkill} />
        </div>
      )}
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
  orderPlaying: PropTypes.array,
  onEndTurn: PropTypes.func,
  onGetChar: PropTypes.func,
  onStartFight: PropTypes.func,
  onEndFight: PropTypes.func,
  onCloseSelection: PropTypes.func,
  onUseSkill: PropTypes.func,
  characterPlaying: PropTypes.object
}

export default Dashboard
