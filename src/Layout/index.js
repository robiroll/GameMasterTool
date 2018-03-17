import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Menu from '../Containers/Menu'
import './style.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // firebase
    characters: PropTypes.object,
    skills: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { children, characters, skills } = this.props
    if (!isLoaded(characters)) return 'loading characters...'
    if (isEmpty(characters)) return 'characters list is empty'
    if (!isLoaded(skills)) return 'loading skills...'
    if (isEmpty(skills)) return 'skills list is empty'
    return (
      <div className="layout">
        <Menu active={this.context.router.route.location.pathname.substr(1)} />
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.skills,
  skills: state.firebase.data.skills
})

export default compose(firebaseConnect(['characters', 'skills']), connect(mapStateToProps))(Layout)
