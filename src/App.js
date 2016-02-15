import React, { Component } from 'react';
import Counter from './counter'
import Button from './button'

export class App extends Component {
  render() {
    const { store } = this.props

    return (
      <div>
        <Counter value={store.getState()} />
        <Button
          onIncrement={() =>
            store.dispatch({ type: 'INC' })
          }
          onDecrement={() =>
            store.dispatch({ type: 'DEC' })
          }
        />
      </div>
    );
  }
}
