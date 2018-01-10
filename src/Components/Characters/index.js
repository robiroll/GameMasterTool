import React from 'react'
import PropTypes from 'prop-types'
import Character from '../Character'
import './Character.css'

const Characters = ({ data }) => {
  return data.map(char => {
    return <Character key={char.idCharacter} data={char} />
  })
}

Characters.propTypes = {
  data: PropTypes.array.isRequired
}

export default Characters
