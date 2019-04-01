import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CharacterSheet from '../CharacterSheet'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import * as S from './styles'
import Players from '../../Containers/Players'

const filterCharacterByType = (characters, type) =>
  Object.entries(characters)
    .filter(([, char]) => char.kind === type)
    .map(([key, char]) => ({ ...char, id: key }))

const CharactersList = ({ title, characters, onToggleFavourite }) => (
  <S.Characters>
    <S.Title>{title}</S.Title>
    <S.Items>
      {characters.map(({ id, name, isFavourite }) => {
        const handleToggleFavourite = e => {
          e.preventDefault()
          onToggleFavourite(id)
        }
        return (
          <S.LinkContainer key={id}>
            <Link to={`/characters/${id}`}>
              <S.Item isFavourite={isFavourite}>
                <S.Link>{name}</S.Link>
                <S.Icon onClick={handleToggleFavourite}>
                  <Icon name="star" />
                </S.Icon>
              </S.Item>
            </Link>
          </S.LinkContainer>
        )
      })}
    </S.Items>
  </S.Characters>
)
CharactersList.propTypes = {
  title: PropTypes.string.isRequired,
  characters: PropTypes.array.isRequired,
  onToggleFavourite: PropTypes.func.isRequired
}

const Characters = ({
  data,
  character,
  isOpen,
  onAddCharacter,
  onOpen,
  onClose,
  onChange,
  onChangeAttributes,
  onToggleFavourite
}) => {
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
          <CharactersList title="heroes" characters={heroes} onToggleFavourite={onToggleFavourite} />
          <CharactersList title="foes" characters={foes} onToggleFavourite={onToggleFavourite} />
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
  onChangeAttributes: PropTypes.func,
  onToggleFavourite: PropTypes.func
}

export default Characters
