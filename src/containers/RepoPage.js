import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { counterSumSelector } from 'selectors'

class RepoPage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    sum: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
      <input
        type="text"
        size="45"
        ref="input"
        defaultValue={this.props.value}
      />

      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  items: state.counterList,
  sum: counterSumSelector(state)
})

export default connect(mapStateToProps)(RepoPage)
