import React from 'react'
import PropTypes from 'prop-types'
import Character from '../../Containers/Character'
import CharacterSheet from '../CharacterSheet'
import Modal from 'react-modal'
import Button from '../../styleguide/Button'
import './Character.css'

const Characters = ({ data, character, isOpen, onAddCharacter, onOpen, onClose, onChange, onChangeAttributes }) => {
  return (
    <div className="characters">
      <Button onClick={onOpen} variant="accent-1">
        Create Character
      </Button>
      <Modal isOpen={isOpen} className="card modal--content" overlayClassName="modal--overlay" ariaHideApp={false}>
        <CharacterSheet
          onAddCharacter={onAddCharacter}
          onOpen={onOpen}
          onClose={onClose}
          onChange={onChange}
          onChangeAttributes={onChangeAttributes}
          character={character}
        />
      </Modal>
      {Object.keys(data).map(char => {
        return <Character key={char} idCharacter={char} characters={data} />
      })}
    </div>
  )
}

Characters.propTypes = {
  data: PropTypes.object.isRequired,
  character: PropTypes.object,
  isOpen: PropTypes.bool,
  onAddCharacter: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onChangeAttributes: PropTypes.func
}

export default Characters
