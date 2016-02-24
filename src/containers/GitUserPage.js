import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadRepos } from 'actions/github'

class GitUserPage extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    loadRepos: PropTypes.func,
    username: PropTypes.string,
    userRepos: PropTypes.array,
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
    this.props.loadRepos(username)
  }

  renderRepos(repos) {
    return (
      <ul>
        {repos.map(function(repo) {
          return <li key={repo.id}>{repo.fullName}</li>
        })}
      </ul>
    )
  }

  render() {
    const { username, user, userRepos } = this.props
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
          {this.renderRepos(userRepos)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps.params
  const {
    entities: { users, repos },
    pagination: { reposByUser }
  } = state

  const reposPagination = reposByUser[username] || { ids: [] }
  const userRepos = reposPagination.ids.map(id => repos[id])

  return {
    username,
    userRepos,
    user: users[username],
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadRepos
})(GitUserPage)
