import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
const FIELDS = [
  {
    id: 'name',
    type: 'text',
    label: 'Nom du Personnage'
  },
  {
    id: 'kind',
    type: 'select',
    label: 'Type de charactère',
    options: [{ label: 'Héros', value: 'hero' }, { label: 'Ennemi', value: 'foe' }]
  },
  {
    type: 'children',
    id: 'attributes',
    extendedType: 'attributes',
    children: [
      {
        id: 'str',
        label: 'Force'
      },
      {
        id: 'con',
        label: 'Constitution'
      },
      {
        id: 'siz',
        label: 'Taille'
      },
      {
        id: 'dex',
        label: 'Dexterité'
      },
      {
        id: 'int',
        label: 'Intelligence'
      },
      {
        id: 'pow',
        label: 'Puissance'
      },
      {
        id: 'cha',
        label: 'Charisme'
      }
    ]
  },
  {
    type: 'children',
    id: 'standardSkills',
    extendedType: 'standardSkills',
    children: [
      {
        id: 'athletics',
        label: 'Athletics'
      }
    ]
  },
  {
    id: 'race',
    type: 'select',
    label: 'Race',
    options: [{ label: 'Hobbit', value: 'hobbit' }, { label: 'Elfe', value: 'elf' }]
  },
  {
    id: 'class',
    type: 'select',
    label: 'Classe',
    options: [
      { label: 'Voleur', value: 'thief' },
      { label: 'Guerrier', value: 'warrior' },
      { label: 'Démoniste', value: 'warlock' }
    ]
  }
]
const CharacterSheet = ({ character, onAddCharacter, onClose, onChange, onChangeAttributes }) => {
  return (
    <div className="character-sheet">
      <form className="character-sheet--form">
        <div className="character-sheet--form--title">Création de Personnage</div>
        {FIELDS.map(field => {
          const { type, id, label, options, children, extendedType } = field
          switch (type) {
            case 'children':
              return (
                <Fragment key={id}>
                  {children.map(attr => {
                    const { id, label } = attr
                    return (
                      <div key={id} className="character-sheet--form--field">
                        <label htmlFor={id}>{label}</label>
                        <input
                          type="number"
                          id={id}
                          onChange={e => onChangeAttributes(e, extendedType)}
                          value={character[extendedType][id]}
                        />
                      </div>
                    )
                  })}
                </Fragment>
              )

            case 'select':
              return (
                <select id={id} key={id} className="character-sheet--form--field" onChange={onChange}>
                  {options.map(option => (
                    <option
                      key={option.value}
                      value={option.value}
                      selected={`${option.value === character[id] ? 'selected' : ''}`}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              )
            default:
              return (
                <div key={id} className="character-sheet--form--field">
                  <label htmlFor={id}>{label}</label>
                  <input type={type} id={id} onChange={onChange} />
                </div>
              )
          }
        })}
        <Button onClick={onAddCharacter}>Valider la création de Personnage</Button>
      </form>
      <Button onClick={onClose}>Close modal</Button>
    </div>
  )
}
CharacterSheet.propTypes = {
  onAddCharacter: PropTypes.func,
  character: PropTypes.object,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onChangeAttributes: PropTypes.func
}
export default CharacterSheet
