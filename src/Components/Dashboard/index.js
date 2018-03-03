import React from 'react'
import PropTypes from 'prop-types'
// import Characters from '../../Containers/Characters'
import Character from '../../Containers/Character'
import Order from '../../Containers/Order'
import Selection from '../../Components/Selection'

import Modal from 'react-modal'
import Button from '../../styleguide/Button'
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
  const isEndTurnDisabled =
    orderPlaying.length > 0 || fightStatus !== 'in-progress'
  const isEndFightDisabled = fightStatus !== 'in-progress'
  return (
    <div className="dashboard">
      <div className="turn">Round {round}</div>
      order
      <Order />
      order playing
      <Order status="playing" />
      order done
      <Order status="done" />
      <Modal isOpen={isOpen} ariaHideApp={false}>
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
      <div className="dashboard--fight">
        <div className="dashboard--fight--title">Fight actions</div>
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
      {characterPlaying && (
        <div className="dashboard--characters--content">
          <Character data={characterPlaying} onUseSkill={onUseSkill} />
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
