import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import './Players.scss'

class Players extends Component {
  static propTypes = {
    characters: PropTypes.object,
    path: PropTypes.string
  }

  static defaultProps = {
    path: 'players'
  }

  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    idCaracter: ''
  }

  componentDidMount() {
    this.setState({
      idCharacter: this.context.router.route.match.params.idCharacter
    })
  }

  handleItemClick = idCharacter => () => this.setState({ idCharacter })

  render() {
    const { path, characters } = this.props
    let links = Object.entries(characters)
    if (path === 'players') links = links.filter(([, { kind }]) => kind === 'hero')
    return (
      <div className="players-menu">
        {links
          .filter(([, { kind, isFavourite }]) => isFavourite && kind === 'hero')
          .map(([key, { name }]) => {
            return (
              <Link
                key={key}
                onClick={this.handleItemClick(key)}
                to={`/players/${key}`}
                className={`players-menu__link${this.state.idCharacter === key ? ' players-menu__link--active' : ''}`}
              >
                {name}
              </Link>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps)
)(Players)
