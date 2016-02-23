import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from 'components/Explore'

class GithubPage extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
    children: PropTypes.node
  }

  handleChange(user) {
    browserHistory.push(`/github/${user}`)
  }

  render() {
    const { inputValue, children } = this.props

    return (
      <div>
        <Explore
          value={inputValue}
          handleChange={this.handleChange}
        />
        {children}
      </div>

    )
  }
}

export default connect(null, {

})(GithubPage)
