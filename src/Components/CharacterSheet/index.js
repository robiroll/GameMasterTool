import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import fields from './config'

const CharacterSheet = ({
  character,
  onAddCharacter,
  onClose,
  onChange,
  onChangeAttributes
}) => {
  return (
    <div className="character-sheet">
      <form className="character-sheet--form">
        <h1 className="character-sheet--form--title">Création de Personnage</h1>
        {fields.map(field => {
          const { type, id, label, options, children, extendedType } = field
          let total = 0
          switch (type) {
            case 'children':
              Object.values(character[id]).map(val => (total += val))
              return (
                <Fragment key={id}>
                  <h2>
                    {field.label} ({total})
                  </h2>
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
                <Fragment key={id}>
                  <select
                    id={id}
                    key={id}
                    className="character-sheet--form--field"
                    onChange={onChange}
                  >
                    {options.map(option => (
                      <option
                        key={option.value}
                        value={option.value}
                        selected={`${
                          option.value === character[id] ? 'selected' : ''
                        }`}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Fragment>
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
        <Button onClick={onAddCharacter}>
          Valider la création de Personnage
        </Button>
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
