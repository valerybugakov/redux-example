import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToList, removeFromList } from 'actions/list'

class List extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func
  }

  render() {
    const { items, renderItem, dispatch } = this.props

    return (
      <div>
        <button onClick={() => dispatch(addToList())}>Add</button>
        <button onClick={() => dispatch(removeFromList())}>Delete</button>
        {items.map(renderItem)}
      </div>
    )
  }
}

export default connect()(List)
