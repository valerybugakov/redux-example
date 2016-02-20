import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const App = ({ children }) => (
  <div>
    <img src="./octocat.jpg" width="50" alt="octocat" />
    App component OMG
    <ul>
      <li><Link to="/">Home Page</Link></li>
      <li><Link to="/counter">Counter Page</Link></li>
    </ul>
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
