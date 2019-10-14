import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.scss'

const LINKS = [
  { slug: '', label: 'Dashboard' },
  { slug: 'characters', label: 'Characters' },
  { slug: 'skills', label: 'Skills' },
  { slug: 'items', label: 'Items' }
]
const Menu = ({ characters, active }) => {
  let heroes = {}
  let foes = {}
  characters &&
    Object.keys(characters).map(idCharacter => {
      const char = characters[idCharacter]
      if (char.kind === 'hero' && char.isFavourite) Object.assign(heroes, { [idCharacter]: char })
      if (char.kind === 'foe' && char.isFavourite) Object.assign(foes, { [idCharacter]: char })
    })
  return (
    <div className="menu">
      <header className="menu--header">
        <h1 className="menu--header--title">Welcome to RPG</h1>
      </header>
      <ul className="menu--links">
        {LINKS.map(({ slug, label }) => (
          <li key={slug}>
            <Link to={`/${slug}`}>
              <div className={`menu--link${active === slug ? ' menu--link--active' : ''}`}>{label}</div>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="menu--links">
        <li className="menu--category">Heroes</li>
        {heroes &&
          Object.keys(heroes).map(char => {
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
        {foes &&
          Object.keys(foes).map(char => {
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
  characters: PropTypes.object,
  active: PropTypes.string
}

export default Menu
