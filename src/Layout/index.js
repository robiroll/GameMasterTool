import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import Menu from '../Containers/Menu'
import Spinner from '../styleguide/Spinner'
import './style.scss'

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
    const { pathname } = this.context.router.route.location
    if (!isLoaded(characters)) return <Spinner />
    if (!isLoaded(skills)) return <Spinner />
    if (!isLoaded(items)) return <Spinner />
    const paths = pathname.split('/')
    return (
      <div className="layout">
        {pathname.indexOf('/players') !== 0 && <Menu active={paths[paths.length - 1]} />}
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

export default compose(
  firebaseConnect(['characters', 'skills', 'items']),
  connect(mapStateToProps)
)(Layout)
