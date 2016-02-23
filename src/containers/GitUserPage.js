import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from 'actions/github'

class GitUserPage extends Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  }

  loadUser() {
    this.props.loadUser()
  }

  render() {
    return (
      <div>
        List of repos:
        <ul>
          <li>Some repo</li>
        </ul>
      </div>
    )
  }
}

export default connect(null, {
  loadUser
})(GitUserPage)
