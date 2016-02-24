import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from 'actions/github'

class GitUserPage extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    username: PropTypes.string,
    user: PropTypes.object
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.loadData(nextProps)
    }
  }

  loadData(props) {
    const { username } = props
    this.props.loadUser(username)
  }

  render() {
    const { username, user } = this.props
    if (!user) {
      return <h2><i>Loading {username}’s profile...</i></h2>
    }

    return (
      <div>
        <h2>{username}</h2>
        <img src={user.avatarUrl} width="100" alt="" />

        <div>
          Following: {user.following}
          <br />
          Followers: {user.followers}
        </div>

        <br />
        <div>
          List of repos:
          <ul>
            <li>Some repo</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps.params
  const {
    entities: { users, repos }
  } = state

  return {
    repos,
    username,
    user: users[username]
  }
}

export default connect(mapStateToProps, {
  loadUser
})(GitUserPage)
