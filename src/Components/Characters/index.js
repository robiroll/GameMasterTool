import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CharacterSheet from '../CharacterSheet'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import * as S from './styles'

const filterCharacterByType = (characters, type) =>
  Object.entries(characters)
    .filter(([, char]) => char.kind === type)
    .map(([key, char]) => ({ ...char, id: key }))

const CharactersList = ({ title, characters }) => (
  <S.Characters>
    <S.Title>{title}</S.Title>
    {characters.map(({ id, name }) => (
      <Link to={`/characters/${id}`} key={id}>
        <S.Link>{name}</S.Link>
      </Link>
    ))}
  </S.Characters>
)
CharactersList.propTypes = {
  title: PropTypes.string.isRequired,
  characters: PropTypes.array.isRequired
}

const Characters = ({ data, character, isOpen, onAddCharacter, onOpen, onClose, onChange, onChangeAttributes }) => {
  const heroes = data && filterCharacterByType(data, 'hero')
  const foes = data && filterCharacterByType(data, 'foe')
  return (
    <S.Content>
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
      {data && (
        <Fragment>
          <CharactersList title="heroes" characters={heroes} />
          <CharactersList title="foes" characters={foes} />
        </Fragment>
      )}
    </S.Content>
  )
}

Characters.propTypes = {
  data: PropTypes.object,
  character: PropTypes.object,
  isOpen: PropTypes.bool,
  onAddCharacter: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onChangeAttributes: PropTypes.func
}

export default Characters
