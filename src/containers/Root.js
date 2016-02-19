import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
// import DevTools from './DevTools'
import { Router, browserHistory } from 'react-router'

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
