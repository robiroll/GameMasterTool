import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import MenuComponent from '../../Components/Menu'

class Menu extends Component {
  static propTypes = {
    characters: PropTypes.object,
    active: PropTypes.string
  }

  render() {
    const { characters, active } = this.props
    if (!isLoaded(characters)) return 'loading characters...'
    if (isEmpty(characters)) return 'characters list is empty'
    return <MenuComponent characters={characters} active={active} />
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(Menu)
