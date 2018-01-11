import React, { Component } from 'react'
import CharactersComponent from '../../Components/Characters'

import CHARACTERS from '../../World/Characters'

export default class Characters extends Component {
  render() {
    return <CharactersComponent data={CHARACTERS} />
  }
}
