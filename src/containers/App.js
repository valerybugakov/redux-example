import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

@connect()
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  render() {
    return (
      <div>
        App component OMG
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/counter">Counter Page</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App
