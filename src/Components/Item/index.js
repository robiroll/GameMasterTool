import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './Item.css'

export default class Item extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    characters: PropTypes.object,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
    assignedCharacter: PropTypes.string,
    onChangeAssignee: PropTypes.func,
    onAssign: PropTypes.func
  }
  render() {
    const { item, characters, onToggle, isOpen, assignedCharacter, onAssign, onChangeAssignee } = this.props
    return (
      <div className="item">
        <div className="item--header">
          <h4 className="item--header--name" onClick={onToggle}>
            {item.name} <span>{isOpen ? '⇡' : '⇣'}</span>
          </h4>
          {characters ? (
            <React.Fragment>
              <select
                className="item--header--select"
                name="assignedCharacter"
                id="assignedCharacter"
                onChange={onChangeAssignee}
                value={assignedCharacter}
              >
                <option value="" disabled>
                  CHARACTER
                </option>
                <option value="---" disabled>
                  --------------
                </option>
                {characters &&
                  Object.keys(characters).map(charId => {
                    return (
                      <option key={charId} value={charId}>
                        {characters[charId].name}
                      </option>
                    )
                  })}
              </select>
              <Button onClick={onAssign}>Assign</Button>
            </React.Fragment>
          ) : (
            <h4>can{"'"}t assign: characters list empty</h4>
          )}
        </div>
        {isOpen && (
          <ul className="item--stats">
            {item &&
              Object.keys(item).map(key => {
                const value = item[key]
                return (
                  <li key={key}>
                    {key} :{' '}
                    {typeof value !== 'object'
                      ? value
                      : Object.keys(value).map(val => {
                          return (
                            <div key={val}>
                              {val}: {value[val]}
                            </div>
                          )
                        })}
                  </li>
                )
              })}
          </ul>
        )}
      </div>
    )
  }
}
