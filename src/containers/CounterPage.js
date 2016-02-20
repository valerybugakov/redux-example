import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { removeFromList } from 'actions/list'
import { onIncrement, onDecrement } from 'actions/counter'
import Counter from 'components/Counter'
import List from 'components/List'

class CounterPage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    removeFromList: PropTypes.func.isRequired
  }

  calculateSum() {
    console.log(this.props.items)
    return this.props.items.reduce((sum, counter) => sum + counter.value, 0)
  }

  @autobind
  renderCounter(counter, index) {
    return (
      <div key={index}>
        <Counter
          value={counter.value}
          index={index}
          onIncrement={() => this.props.onIncrement(index)}
          onDecrement={() => this.props.onDecrement(index)}
        />
        <button onClick={() => this.props.removeFromList(index)}>Delete</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <hr />
        <h4>Counters:</h4>
        <p>Sum: {this.calculateSum()}</p>
        <List
          items={this.props.items}
          renderItem={this.renderCounter}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.counterList
})

export default connect(mapStateToProps, {
  onIncrement,
  onDecrement,
  removeFromList
})(CounterPage)
