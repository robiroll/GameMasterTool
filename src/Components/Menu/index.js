import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.css'

const Menu = ({ characters, active }) => {
  let heroes = {}
  let foes = {}
  Object.keys(characters).map(idCharacter => {
    const char = characters[idCharacter]
    if (char.kind === 'hero') Object.assign(heroes, { [idCharacter]: char })
    if (char.kind === 'foe') Object.assign(foes, { [idCharacter]: char })
  })
  return (
    <div className="menu">
      <header className="menu--header">
        <h1 className="menu--header--title">Welcome to RPG</h1>
      </header>
      <ul className="menu--links">
        <li>
          <Link to="/">
            <div className="menu--link">Dashboard</div>
          </Link>
        </li>
        <li>
          <Link to="/characters">
            <div className="menu--link">Characters</div>
          </Link>
        </li>
        <li>
          <Link to="/skills">
            <div className="menu--link">Skills</div>
          </Link>
        </li>
      </ul>
      <ul className="menu--links">
        <li className="menu--category">Heroes</li>
        <div className="divider" />
        {Object.keys(heroes).map(char => {
          return (
            <li key={char}>
              <Link to={`/characters/${char}`}>
                <div className={`menu--link${active === char ? ' menu--link--active' : ''}`}>
                  {characters[char].name}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <ul className="menu--links">
        <li className="menu--category">Foes</li>
        <div className="divider" />
        {Object.keys(foes).map(char => {
          return (
            <li key={char}>
              <Link to={`/characters/${char}`}>
                <div className={`menu--link${active === char ? ' menu--link--active' : ''}`}>
                  {characters[char].name}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Menu.propTypes = {
  characters: PropTypes.object.isRequired,
  active: PropTypes.string
}

export default Menu
