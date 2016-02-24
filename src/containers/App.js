import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

const handleHomeClick = () => {
  browserHistory.push('/')
}

const App = ({ children }) => (
  <div>
    <img src="/octocat.jpg" width="50" alt="octocat" />
    App component OMG
    <ul>
      <li>
        <Link activeClassName="active" to="/">Home Page</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/counter">Counter Page</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/github">Repo Page</Link>
      </li>
    </ul>
    <button onClick={handleHomeClick}>
      Go home with react-router browserHistory
    </button>
    <hr />
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
