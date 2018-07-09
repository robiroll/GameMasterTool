import React from 'react'
import PropTypes from 'prop-types'
// import Characters from '../../Containers/Characters'
import Character from '../../Containers/Character'
import FightActions from '../../Containers/FightActions'
import Order from '../../Containers/Order'
import Selection from '../../Components/Selection'

import Modal from 'react-modal'
import Button from '../../styleguide/Button'
import Card from '../../styleguide/Card'
import Spinner from '../../styleguide/Spinner'
import './Dashboard.css'

const Dashboard = ({
  isOpen,
  round,
  fightStatus,
  orderPlaying,
  onNextRound,
  onStartFight,
  onEndFight,
  onCloseSelection,
  characterPlaying,
  onUseSkill,
  characters,
  selectCharacter,
  validateCharacters,
  isValidateDisabled,
  order
}) => {
  const isStartDisabled = fightStatus !== null
  const isEndTurnDisabled = orderPlaying.length > 0 || fightStatus !== 'in-progress'
  const isEndFightDisabled = fightStatus !== 'in-progress'
  // return <Spinner />
  return (
    <div className="dashboard">
      <Card title={<h3 className="dashboard--round">{round < 1 ? 'Prepare to fight!' : `Round ${round}`}</h3>}>
        <div className="dashboard--order">
          <div className="dashboard--order--title">Character{"'"}s order (by initiative):</div>
          <Order />
        </div>
        <div className="dashboard--order">
          <div className="dashboard--order--title">Next players to play:</div>
          <Order status="playing" />
        </div>
        <div className="dashboard--order">
          <div className="dashboard--order--title">Turn finished for:</div>
          <Order status="done" />
        </div>
      </Card>
      <Modal isOpen={isOpen} className="card modal--content" overlayClassName="modal--overlay" ariaHideApp={false}>
        <Order status="selection" />
        <Selection
          onCloseSelection={onCloseSelection}
          characters={characters}
          selectCharacter={selectCharacter}
          validateCharacters={validateCharacters}
          isValidateDisabled={isValidateDisabled}
          order={order}
        />
      </Modal>
      {characterPlaying && <FightActions idCharacter={characterPlaying} onUseSkill={onUseSkill} />}
      <Card title={<h3 className="dashboard--fight--title">Fight actions</h3>}>
        <div className="dashboard--fight">
          <div className="dashboard--fight--actions">
            <Button onClick={onStartFight} disabled={isStartDisabled}>
              start fight
            </Button>
            <Button onClick={onNextRound} disabled={isEndTurnDisabled}>
              next round
            </Button>
            <Button onClick={onEndFight} disabled={isEndFightDisabled}>
              end fight
            </Button>
          </div>
        </div>
      </Card>
      {characterPlaying && (
        <div className="dashboard--characters--content">
          <Character idCharacter={characterPlaying} onUseSkill={onUseSkill} />
        </div>
      )}
    </div>
  )
}

Dashboard.propTypes = {
  isOpen: PropTypes.bool,
  round: PropTypes.number,
  fightStatus: PropTypes.any,
  orderPlaying: PropTypes.array,
  onNextRound: PropTypes.func,
  onGetChar: PropTypes.func,
  onStartFight: PropTypes.func,
  onEndFight: PropTypes.func,
  onCloseSelection: PropTypes.func,
  onUseSkill: PropTypes.func,
  characterPlaying: PropTypes.string,
  characters: PropTypes.object,
  selectCharacter: PropTypes.func,
  validateCharacters: PropTypes.func,
  isValidateDisabled: PropTypes.bool,
  order: PropTypes.array
}

export default Dashboard
