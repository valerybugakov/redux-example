import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadRepo } from 'actions/github'

class RepoPage extends Component {
  static propTypes = {
    fullName: PropTypes.string,
    repo: PropTypes.object,
    owner: PropTypes.object,
    loadRepo: PropTypes.func,
    loadContributors: PropTypes.func,
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  loadData() {
    const { fullName } = this.props
    this.props.loadRepo(fullName, ['description'])
    // this.props.loadContributors(fullName)
  }

  render() {
    const { fullName, owner, repo } = this.props
    if (!repo) {
      return <h2><i>Loading {fullName} repo...</i></h2>
    }

    const createdAt = new Date(repo.createdAt)
    return (
      <div>
        <h2><Link to={`/github/${owner.login}`}>{owner.login}</Link></h2>
        <img src={owner.avatarUrl} width="100" alt="" />

        <h3>{repo.name} {repo.fork && '(forked)'}</h3>
        <small>Created at: {createdAt.toDateString()}</small>
        <br />
        <small>Language: {repo.language}</small>
        <p>{repo.description}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username, reponame } = ownProps.params
  const { entities: { users, repos } } = state
  const fullName = `${username}/${reponame}`

  return {
    fullName,
    repo: repos[fullName.toLowerCase()],
    owner: users[username.toLowerCase()],
  }
}

export default connect(mapStateToProps, {
  loadRepo,
})(RepoPage)
