import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Explore extends Component {
  static propTypes = {
  }

  onKeyUp() {
  }

  render() {
    return (
      <div>
      <input
        type="text"
        size="45"
        ref="input"
        defaultValue={this.props.value}
        onKeyUp={this.onKeyUp}
      />
      </div>
    )
  }

}

export default connect()(Explore)
