import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import fields from './config'
import './CharacterSheet.css'

const CharacterSheet = ({ character, onAddCharacter, onClose, onChange, onChangeAttributes }) => {
  return (
    <div className="character-sheet">
      <form className="character-sheet--form">
        <h2 className="character-sheet--form--title">Création de Personnage</h2>
        {fields.map(field => {
          const { type, id, label, options, children, extendedType } = field
          let total = 0
          switch (type) {
            case 'children':
              Object.values(character[id]).map(val => (total += val))
              return (
                <Fragment key={id}>
                  <h3>
                    {field.label} ({total})
                  </h3>
                  {children.map(attr => {
                    const { id, label, score } = attr
                    return (
                      <div key={id} className="character-sheet--form--field">
                        <label htmlFor={id}>{label}</label>
                        <input
                          type="number"
                          id={id}
                          onChange={e => onChangeAttributes(e, extendedType)}
                          value={character[extendedType][id]}
                        />
                        {score && <span>{score}</span>}
                      </div>
                    )
                  })}
                </Fragment>
              )

            case 'select':
              return (
                <Fragment key={id}>
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
      </form>
      <Button onClick={onAddCharacter}>Valider la création de Personnage</Button>
      <Button onClick={onClose} variant="accent-1">
        Close modal
      </Button>
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
