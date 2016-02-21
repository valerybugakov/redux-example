import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
// import DevTools from './DevTools'
import routes from '../routes'
import 'styles/main.css'

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={browserHistory} routes={routes} />
          {/* <DevTools /> */}
        </div>
      </Provider>
    )
  }
}

export default Root
