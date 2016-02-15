import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const createStore = (reducer) => {
  let state
  let listeners = []

  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

store.subscribe(render)
render()
