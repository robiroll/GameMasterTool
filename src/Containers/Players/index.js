import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import './Players.scss'

class Players extends Component {
  static propTypes = {
    characters: PropTypes.object
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
    return (
      <div className="players-menu">
        {Object.entries(this.props.characters)
          .filter(([, { kind }]) => kind === 'hero')
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
