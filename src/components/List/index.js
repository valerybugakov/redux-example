import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToList, removeFromList } from 'actions/list'

class List extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    add: PropTypes.func,
    remove: PropTypes.func
  }

  render() {
    const { items, renderItem, add, remove } = this.props

    return (
      <div>
        <button onClick={add}>Add</button>
        <button onClick={remove}>Delete</button>
        {items.map(renderItem)}
      </div>
    )
  }
}

export default connect(null, {
  add: addToList,
  remove: removeFromList
})(List)
