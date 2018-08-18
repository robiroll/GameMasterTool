import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { STATS } from '../../lib'
import Button from '../../styleguide/Button'
import './Selection.css'

class Character extends Component {
  static propTypes = {
    id: PropTypes.string,
    kind: PropTypes.string,
    character: PropTypes.object,
    selectCharacter: PropTypes.func
  }
  state = {
    roll: 0,
    selected: {}
  }

  initiative = () => {
    const { int, dex } = STATS(this.props.character)
    return Math.ceil((int + dex) / 2)
  }

  handleChange = e => this.setState({ roll: Number(e.target.value) })

  handleSelectCharacter = () => {
    const { id, character } = this.props
    const { kind } = character
    const { roll } = this.state
    const initiative = this.initiative() + roll
    this.setState(prevState => ({ selected: { ...prevState.selected, [id]: roll } }))
    this.props.selectCharacter({ id, initiative, kind })
  }

  render() {
    const { id, character } = this.props
    const { roll, selected } = this.state
    const disabled = selected[id] === roll
    return (
      <div className="selection--characters">
        <div className="selection--characters--char--name">
          <Button onClick={this.handleSelectCharacter} disabled={disabled}>
            {character.name} ({this.initiative()})
          </Button>
          <input type="number" value={roll} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

const Selection = ({ characters, selectCharacter, validateCharacters, isValidateDisabled }) => (
  <div className="selection">
    <h3 className="selection--title">Heroes</h3>
    <div className="selection--content">
      {Object.keys(characters)
        .filter(id => characters[id].kind === 'hero')
        .map(key => {
          const character = characters[key]
          return <Character key={key} id={key} character={character} selectCharacter={selectCharacter} />
        })}
    </div>
    <h3 className="selection--title">Foes</h3>
    <div className="selection--content">
      {Object.keys(characters)
        .filter(id => characters[id].kind === 'foe')
        .map(key => {
          const character = characters[key]
          return <Character key={key} id={key} character={character} selectCharacter={selectCharacter} />
        })}
    </div>
    <div className="selection--button">
      <Button onClick={validateCharacters} disabled={isValidateDisabled} variant="accent-1">
        validate chars
      </Button>
    </div>
  </div>
)

Selection.propTypes = {
  characters: PropTypes.object,
  selectCharacter: PropTypes.func,
  validateCharacters: PropTypes.func,
  isValidateDisabled: PropTypes.bool
}

export default Selection
