import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

class Explore extends Component {
  static propTypes = {
  }

  getInputValue() {
    return this.refs.input.value
  }

  @autobind
  handleGoClick() {
    this.props.handleChange(this.getInputValue())
  }

  @autobind
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
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
      <button onClick={this.handleGoClick}>Go</button>
      </div>
    )
  }

}

export default connect()(Explore)
