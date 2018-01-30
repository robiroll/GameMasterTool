import React from 'react'
import PropTypes from 'prop-types'
import Character from '../../Containers/Character'
import CharacterSheet from '../CharacterSheet'
import Modal from 'react-modal'
import Button from '../../styleguide/Button'
import './Character.css'

const Characters = ({ data, character, isOpen, onAddCharacter, onOpen, onClose, onChange, onChangeAttributes }) => {
  let characters = []
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      characters.push(key)
    }
  }
  // TODO: Use Object.entries instead of creating new objects
  // return (
  //   <div className="characters">
  //     <Button onClick={onOpen}>Create Character</Button>
  //     <Modal isOpen={isOpen}>
  //       <CharacterSheet onAddCharacter={onAddCharacter} onOpen={onOpen} onClose={onClose} onChange={onChange} />
  //     </Modal>
  //     {characters.map(char => {
  //       return <Character key={char.idCharacter} data={char} />
  //     })}
  //   </div>
  // )
  // console.log('characters ids', characters)
  return (
    <div className="characters">
      <Button onClick={onOpen}>Create Character</Button>
      <Modal isOpen={isOpen} ariaHideApp={false}>
        <CharacterSheet
          onAddCharacter={onAddCharacter}
          onOpen={onOpen}
          onClose={onClose}
          onChange={onChange}
          onChangeAttributes={onChangeAttributes}
          character={character}
        />
      </Modal>
      {characters.map(char => {
        return <Character key={char} data={char} />
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
