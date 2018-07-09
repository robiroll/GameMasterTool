import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Menu from '../Containers/Menu'
import Spinner from '../styleguide/Spinner'
import './style.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // firebase
    characters: PropTypes.object,
    skills: PropTypes.object,
    items: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { children, characters, skills, items } = this.props
    if (!isLoaded(characters)) return <Spinner />
    if (isEmpty(characters)) return 'characters list is empty'
    if (!isLoaded(skills)) return <Spinner />
    if (isEmpty(skills)) return 'skills list is empty'
    if (!isLoaded(items)) return <Spinner />
    if (isEmpty(items)) return 'skills list is empty'
    return (
      <div className="layout">
        <Menu active={this.context.router.route.location.pathname.substr(1)} />
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters,
  skills: state.firebase.data.skills,
  items: state.firebase.data.items
})

export default compose(firebaseConnect(['characters', 'skills', 'items']), connect(mapStateToProps))(Layout)
